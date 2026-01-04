// analytics manager - batches view/like fetches and increments
// singleton pattern with debounced batch requests

interface BatchItemResponse {
	views: number;
	likes: number;
}

interface BatchResponse {
	[slug: string]: BatchItemResponse;
}

type ContentType = "post" | "tweet" | "project" | "wiki";
type StatsCallback = (data: BatchItemResponse) => void;

interface PendingFetch {
	slug: string;
	type: ContentType;
	callback: StatsCallback;
}

interface CacheEntry {
	data: BatchItemResponse;
	expires_at: number;
}

export const WORKER_URL = import.meta.env.PUBLIC_ANALYTICS_URL || "http://localhost:8787";

const BATCH_DELAY = 50; // ms to wait before sending batch request
const VIEW_INCREMENT_DELAY = 3000; // ms to wait before sending view increments
const VIEW_COOLDOWN_MS = 60 * 60 * 1000; // 1 hour cooldown per slug
const CACHE_TTL = 60_000; // 60 seconds cache TTL

export type UpdateListener = (type: ContentType, slug: string, data: BatchItemResponse) => void;
export type { ContentType, BatchItemResponse };

class AnalyticsManager {
	private static instance: AnalyticsManager;

	// stats fetching
	private pending_fetches: Map<ContentType, PendingFetch[]> = new Map();
	private fetch_timer: number | null = null;

	// view increments
	private pending_views: Map<ContentType, Set<string>> = new Map();
	private view_timer: number | null = null;

	// cache with TTL
	private cache: Map<string, CacheEntry> = new Map();

	// listeners for cache updates (so UI can refresh)
	private update_listeners: Set<UpdateListener> = new Set();

	private constructor() {
		this.setup_unload_handler();
	}

	static get_instance(): AnalyticsManager {
		if (!AnalyticsManager.instance) {
			AnalyticsManager.instance = new AnalyticsManager();
		}
		return AnalyticsManager.instance;
	}

	private cache_key(type: ContentType, slug: string): string {
		return `${type}:${slug}`;
	}

	private view_storage_key(type: ContentType, slug: string): string {
		return `view_recorded:${type}:${slug}`;
	}

	private is_view_on_cooldown(type: ContentType, slug: string): boolean {
		const key = this.view_storage_key(type, slug);
		try {
			const timestamp = localStorage.getItem(key);
			if (!timestamp) return false;
			const recorded_at = Number.parseInt(timestamp, 10);
			return Date.now() - recorded_at < VIEW_COOLDOWN_MS;
		} catch {
			return false;
		}
	}

	private mark_view_recorded(type: ContentType, slug: string): void {
		const key = this.view_storage_key(type, slug);
		try {
			localStorage.setItem(key, String(Date.now()));
		} catch {
			// localStorage might be full or disabled
		}
	}

	// subscribe to cache updates (for UI refresh after view increment)
	on_update(listener: UpdateListener): () => void {
		this.update_listeners.add(listener);
		return () => this.update_listeners.delete(listener);
	}

	private notify_update(type: ContentType, slug: string, data: BatchItemResponse): void {
		for (const listener of this.update_listeners) {
			listener(type, slug, data);
		}
	}

	request_stats(type: ContentType, slug: string, callback: StatsCallback): void {
		const key = this.cache_key(type, slug);
		const cached = this.cache.get(key);

		if (cached && cached.expires_at > Date.now()) {
			callback(cached.data);
			return;
		}

		const pending = this.pending_fetches.get(type) || [];
		pending.push({ slug, type, callback });
		this.pending_fetches.set(type, pending);

		this.schedule_fetch();
	}

	record_view(type: ContentType, slug: string): void {
		if (this.is_view_on_cooldown(type, slug)) {
			return;
		}

		this.mark_view_recorded(type, slug);

		const pending = this.pending_views.get(type) || new Set();
		pending.add(slug);
		this.pending_views.set(type, pending);

		this.schedule_view_increment();
	}

	// update cache and notify listeners (used by LikeButton for optimistic updates)
	update_cache(type: ContentType, slug: string, data: Partial<BatchItemResponse>): void {
		const key = this.cache_key(type, slug);
		const cached = this.cache.get(key);
		const current = cached?.data || { views: 0, likes: 0 };
		const updated = { ...current, ...data };

		this.cache.set(key, {
			data: updated,
			expires_at: Date.now() + CACHE_TTL,
		});

		this.notify_update(type, slug, updated);
	}

	private schedule_fetch(): void {
		if (this.fetch_timer !== null) return;

		this.fetch_timer = window.setTimeout(() => {
			this.fetch_timer = null;
			this.flush_fetches();
		}, BATCH_DELAY);
	}

	private schedule_view_increment(): void {
		if (this.view_timer !== null) return;

		this.view_timer = window.setTimeout(() => {
			this.view_timer = null;
			this.flush_view_increments();
		}, VIEW_INCREMENT_DELAY);
	}

	private async flush_fetches(): Promise<void> {
		const batches = new Map(this.pending_fetches);
		this.pending_fetches.clear();

		for (const [type, requests] of batches) {
			if (requests.length === 0) continue;

			const slugs = [...new Set(requests.map((r) => r.slug))];
			const url = `${WORKER_URL}/api/analytics/batch?type=${type}&slugs=${slugs.join(",")}`;

			try {
				const res = await fetch(url);
				if (!res.ok) {
					this.notify_error(requests);
					continue;
				}

				const data: BatchResponse = await res.json();
				const now = Date.now();

				for (const slug of slugs) {
					const key = this.cache_key(type, slug);
					const item = data[slug] || { views: 0, likes: 0 };
					this.cache.set(key, {
						data: item,
						expires_at: now + CACHE_TTL,
					});
				}

				for (const req of requests) {
					const item = data[req.slug] || { views: 0, likes: 0 };
					req.callback(item);
				}
			} catch (error) {
				console.error("Failed to fetch batch:", error);
				this.notify_error(requests);
			}
		}
	}

	private notify_error(requests: PendingFetch[]): void {
		for (const req of requests) {
			req.callback({ views: 0, likes: 0 });
		}
	}

	private async flush_view_increments(): Promise<void> {
		const batches = new Map(this.pending_views);
		this.pending_views.clear();

		for (const [type, slugs] of batches) {
			if (slugs.size === 0) continue;

			try {
				await fetch(`${WORKER_URL}/api/analytics/batch`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ type, slugs: [...slugs] }),
				});

				// update cache and notify listeners
				for (const slug of slugs) {
					const key = this.cache_key(type, slug);
					const cached = this.cache.get(key);
					if (cached) {
						cached.data.views += 1;
						this.notify_update(type, slug, cached.data);
					}
				}
			} catch (error) {
				console.error("Failed to increment views:", error);
			}
		}
	}

	private setup_unload_handler(): void {
		const flush_on_unload = () => {
			for (const [type, slugs] of this.pending_views) {
				if (slugs.size === 0) continue;

				const url = `${WORKER_URL}/api/analytics/batch`;
				const body = JSON.stringify({ type, slugs: [...slugs] });

				if (navigator.sendBeacon) {
					navigator.sendBeacon(url, body);
				}
			}
			this.pending_views.clear();
		};

		document.addEventListener("astro:before-swap", flush_on_unload);

		window.addEventListener("visibilitychange", () => {
			if (document.visibilityState === "hidden") {
				flush_on_unload();
			}
		});
	}
}

// global instance
export const analytics = AnalyticsManager.get_instance();
