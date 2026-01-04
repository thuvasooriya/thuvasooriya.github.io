// shared like button controller logic
// used by LikeButton.astro

import { analytics, type ContentType, WORKER_URL } from "./analytics";

interface LikeResponse {
	user_likes: number;
	total_likes: number;
	unique_users: number;
}

export interface LikeControllerConfig {
	button: HTMLButtonElement;
	slug: string;
	type: ContentType;
	on_animate?: () => void;
	on_shake?: () => void;
	on_max?: () => void;
	on_void?: () => void;
	on_poof?: () => void;
}

const MAX_LIKES = 13;
const VOID_THRESHOLD = 19;
const SHATTER_THRESHOLD = 28;
const COOKIE_NAME = "user_likes";
const LIKE_DEBOUNCE_MS = 500;

export class LikeController {
	private button: HTMLButtonElement;
	private slug: string;
	private type: ContentType;
	private wave_path: SVGPathElement | null;
	private glisten_group: SVGGElement | null;
	private heart_icon: SVGSVGElement | null;
	private count_el: HTMLSpanElement | null;

	private user_likes = 0;
	private pending_likes = 0;
	private overflow_clicks = 0;
	private user_likes_fetched = false;
	private debounce_timer: number | null = null;
	private is_syncing = false;
	private wave_animation_id: number | null = null;
	private current_fill_y = 24;
	private wave_phase = 0;

	private on_animate: (() => void) | undefined;
	private on_shake: (() => void) | undefined;
	private on_max: (() => void) | undefined;
	private on_void: (() => void) | undefined;
	private on_poof: (() => void) | undefined;

	constructor(config: LikeControllerConfig) {
		this.button = config.button;
		this.slug = config.slug;
		this.type = config.type;
		this.on_animate = config.on_animate;
		this.on_shake = config.on_shake;
		this.on_max = config.on_max;
		this.on_void = config.on_void;
		this.on_poof = config.on_poof;

		this.wave_path = this.button.querySelector(".heart-wave-path");
		this.glisten_group = this.button.querySelector(".heart-glisten-group");
		this.heart_icon = this.button.querySelector(".heart-icon");
		this.count_el = this.button.querySelector(".like-count");

		this.init();
	}

	private init() {
		const saved_likes = this.get_cookie_likes();
		if (saved_likes !== null) {
			this.user_likes = saved_likes;
			this.pending_likes = saved_likes;
			this.button.dataset.userLikes = String(saved_likes);
			this.set_fill_level(saved_likes, false);
		}

		analytics.request_stats(this.type, this.slug, (data) => {
			if (this.count_el) {
				this.count_el.textContent = String(data.likes);
			}
		});

		this.button.addEventListener("click", (e) => this.handle_click(e));
	}

	private async fetch_user_likes(): Promise<void> {
		if (this.user_likes_fetched) return;
		this.user_likes_fetched = true;

		try {
			const res = await fetch(`${WORKER_URL}/api/analytics/like/${this.type}/${this.slug}`);
			if (!res.ok) return;

			const data: LikeResponse = await res.json();
			this.user_likes = data.user_likes;
			this.pending_likes = data.user_likes;
			this.set_fill_level(data.user_likes, false);
			this.button.dataset.userLikes = String(data.user_likes);
			this.save_cookie_likes(data.user_likes);

			if (this.count_el) {
				this.count_el.textContent = String(data.total_likes);
			}
		} catch (error) {
			console.error("Failed to fetch user likes:", error);
		}
	}

	private async handle_click(e: MouseEvent) {
		e.preventDefault();
		e.stopPropagation();

		if (!this.user_likes_fetched) {
			await this.fetch_user_likes();
		}

		if (this.user_likes >= MAX_LIKES) {
			this.overflow_clicks += 1;
			this.handle_overflow_click();
			return;
		}

		this.user_likes += 1;
		this.pending_likes = this.user_likes;

		const current_total = this.count_el ? Number.parseInt(this.count_el.textContent || "0", 10) : 0;
		this.update_ui_optimistic(this.user_likes, current_total + 1);
		this.on_animate?.();

		this.schedule_sync();
	}

	private handle_overflow_click() {
		if (!this.heart_icon) return;

		const total_clicks = MAX_LIKES + this.overflow_clicks;

		if (total_clicks >= SHATTER_THRESHOLD) {
			// trigger shatter animation
			this.heart_icon.classList.remove("heart-void", "heartbeat");
			this.heart_icon.classList.add("heart-shattered");
			if (this.glisten_group) {
				this.glisten_group.classList.remove("glisten-active");
			}
			this.on_poof?.();
			// hide button after shatter animation completes (0.8s + buffer)
			setTimeout(() => {
				this.button.style.display = "none";
			}, 900);
		} else if (total_clicks >= VOID_THRESHOLD) {
			// void heart state
			this.heart_icon.classList.add("heart-void");
			this.heart_icon.classList.remove("heartbeat");
			if (this.glisten_group) {
				this.glisten_group.classList.remove("glisten-active");
			}
			this.on_shake?.();
			this.on_void?.();
		} else {
			// 14-18: still maxed, just shake
			this.on_shake?.();
			this.on_max?.();
		}
	}

	private schedule_sync() {
		if (this.debounce_timer !== null) {
			window.clearTimeout(this.debounce_timer);
		}

		this.debounce_timer = window.setTimeout(() => {
			this.debounce_timer = null;
			this.sync_to_server();
		}, LIKE_DEBOUNCE_MS);
	}

	private async sync_to_server() {
		if (this.is_syncing) return;
		this.is_syncing = true;

		const count_to_send = this.pending_likes;

		try {
			const res = await fetch(`${WORKER_URL}/api/analytics/like/${this.type}/${this.slug}`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ count: count_to_send }),
			});

			if (!res.ok) throw new Error("Failed to update like");

			const data: LikeResponse = await res.json();
			this.user_likes = data.user_likes;
			this.pending_likes = data.user_likes;
			this.button.dataset.userLikes = String(data.user_likes);
			this.set_fill_level(data.user_likes, false);
			this.save_cookie_likes(data.user_likes);

			if (this.count_el) {
				this.count_el.textContent = String(data.total_likes);
			}

			analytics.update_cache(this.type, this.slug, { likes: data.total_likes });
		} catch (error) {
			console.error("Failed to sync likes:", error);
			this.user_likes_fetched = false;
		} finally {
			this.is_syncing = false;
		}
	}

	private update_ui_optimistic(user_likes: number, total_likes: number) {
		this.button.dataset.userLikes = String(user_likes);
		if (this.count_el) {
			this.count_el.textContent = String(total_likes);
		}
		this.set_fill_level(user_likes, true);
		this.save_cookie_likes(user_likes);
	}

	private set_fill_level(likes: number, animate: boolean) {
		if (!this.wave_path) return;

		// non-linear fill curve: fast initial fill (bottom of heart is narrow)
		// sqrt curve: ~50% height at 3 likes, ~70% at 6, ~85% at 9, 100% at 13
		const fill_percent = Math.sqrt(likes / MAX_LIKES);
		const target_y = 24 - fill_percent * 22;

		if (animate) {
			this.animate_wave_to(target_y);
		} else {
			this.current_fill_y = target_y;
			this.update_wave_path(target_y, 0, 0);
		}

		this.update_glisten(likes);
	}

	private animate_wave_to(target_y: number) {
		if (this.wave_animation_id !== null) {
			cancelAnimationFrame(this.wave_animation_id);
		}

		const start_y = this.current_fill_y;
		const start_time = performance.now();
		const duration = 600;
		const wave_duration = 1200;

		const ease_out_back = (t: number): number => {
			const c1 = 1.70158;
			const c3 = c1 + 1;
			return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2;
		};

		const animate = (now: number) => {
			const elapsed = now - start_time;
			const t = Math.min(elapsed / duration, 1);
			const wave_t = Math.min(elapsed / wave_duration, 1);

			const eased_t = ease_out_back(t);
			this.current_fill_y = start_y + (target_y - start_y) * eased_t;

			const wave_amplitude = 2 * (1 - wave_t);
			this.wave_phase += 0.15;

			this.update_wave_path(this.current_fill_y, wave_amplitude, this.wave_phase);

			if (wave_t < 1) {
				this.wave_animation_id = requestAnimationFrame(animate);
			} else {
				this.wave_animation_id = null;
				this.update_wave_path(this.current_fill_y, 0, 0);
			}
		};

		this.wave_animation_id = requestAnimationFrame(animate);
	}

	private update_wave_path(y: number, amplitude: number, phase: number) {
		if (!this.wave_path) return;

		const points: string[] = [];
		const segments = 8;
		const width = 28;
		const start_x = -2;

		for (let i = 0; i <= segments; i++) {
			const x = start_x + (i / segments) * width;
			const wave_y = y + Math.sin(phase + (i / segments) * Math.PI * 2) * amplitude;
			if (i === 0) {
				points.push(`M${x} ${wave_y}`);
			} else {
				const prev_x = start_x + ((i - 1) / segments) * width;
				const prev_wave_y = y + Math.sin(phase + ((i - 1) / segments) * Math.PI * 2) * amplitude;
				const cp_x = (prev_x + x) / 2;
				points.push(`Q${cp_x} ${(prev_wave_y + wave_y) / 2 + amplitude * 0.3} ${x} ${wave_y}`);
			}
		}

		points.push(`V30 H-2 Z`);
		this.wave_path.setAttribute("d", points.join(" "));
	}

	private update_glisten(likes: number) {
		const is_maxed = likes >= MAX_LIKES;

		if (this.glisten_group) {
			if (is_maxed) {
				this.glisten_group.classList.add("glisten-active");
			} else {
				this.glisten_group.classList.remove("glisten-active");
			}
		}

		if (this.heart_icon) {
			if (is_maxed) {
				this.heart_icon.classList.add("heartbeat");
			} else {
				this.heart_icon.classList.remove("heartbeat");
			}
		}
	}

	private get_cookie_likes(): number | null {
		const cookie_name = `${COOKIE_NAME}_${this.type}_${this.slug}`;
		const cookies = document.cookie.split(";");
		for (const cookie of cookies) {
			const [name, value] = cookie.trim().split("=");
			if (name === cookie_name) {
				return Number.parseInt(value || "0", 10) || 0;
			}
		}
		return null;
	}

	private async save_cookie_likes(count: number) {
		const cookie_name = `${COOKIE_NAME}_${this.type}_${this.slug}`;
		const expires = new Date();
		expires.setFullYear(expires.getFullYear() + 1);

		// use Cookie Store API if available (Chrome, Edge, Opera)
		if ("cookieStore" in window && typeof window.cookieStore?.set === "function") {
			try {
				await window.cookieStore.set({
					name: cookie_name,
					value: String(count),
					expires: expires.getTime(),
					path: "/",
					sameSite: "lax",
				});
				return;
			} catch {
				// fall through to legacy method
			}
		}

		// biome-ignore lint/suspicious/noDocumentCookie: fallback for Safari which doesn't support Cookie Store API
		document.cookie = `${cookie_name}=${count}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
	}
}
