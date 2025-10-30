export interface SiteConfig {
	author: string;
	date: {
		locale: string | string[] | undefined;
		options: Intl.DateTimeFormatOptions;
	};
	description: string;
	lang: string;
	ogLocale: string;
	title: string;
	url: string;
}

export interface MenuLink {
	title: string;
	path: string;
	external?: boolean;
	description?: string;
}

export interface PostMeta {
	title: string;
	description: string;
	publishDate: Date;
	updatedDate?: Date;
	tags: string[];
	draft: boolean;
	coverImage?: {
		src: string;
		alt: string;
	};
	ogImage?: string;
}

export interface NoteMeta {
	title: string;
	description?: string;
	publishDate: Date;
}

export interface PaginationLink {
	srLabel?: string;
	text?: string;
	url: string;
}

export interface SiteMeta {
	articleDate?: string | undefined;
	description?: string;
	ogImage?: string | undefined;
	title: string;
}

/** Webmentions */
export interface WebmentionsFeed {
	children: WebmentionsChildren[];
	name: string;
	type: string;
}

export interface WebmentionsCache {
	children: WebmentionsChildren[];
	lastFetched: null | string;
}

export interface WebmentionsChildren {
	author: Author | null;
	content?: Content | null;
	"mention-of": string;
	name?: null | string;
	photo?: null | string[];
	published?: null | string;
	rels?: Rels | null;
	summary?: Summary | null;
	syndication?: null | string[];
	type: string;
	url: string;
	"wm-id": number;
	"wm-private": boolean;
	"wm-property": string;
	"wm-protocol": string;
	"wm-received": string;
	"wm-source": string;
	"wm-target": string;
}

export interface Author {
	name: string;
	photo: string;
	type: string;
	url: string;
}

export interface Content {
	"content-type": string;
	html: string;
	text: string;
	value: string;
}

export interface Rels {
	canonical: string;
}

export interface Summary {
	"content-type": string;
	value: string;
}

export type AdmonitionType = "tip" | "note" | "important" | "caution" | "warning";

export type ThemeMode = "light" | "dark" | "system";

export type SortOrder = "asc" | "desc";

export type CollectionType = "post" | "note";

// Utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type RequiredKeys<T> = {
	// biome-ignore lint/complexity/noBannedTypes: empty object type used for conditional type checking
	[K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];

export type OptionalKeys<T> = {
	// biome-ignore lint/complexity/noBannedTypes: empty object type used for conditional type checking
	[K in keyof T]-?: {} extends Pick<T, K> ? K : never;
}[keyof T];

// API Response types
export interface ApiResponse<T> {
	data: T | null;
	error: string | null;
	success: boolean;
}

// Content processing types
export interface ContentProcessingOptions {
	stripHtml?: boolean;
	maxLength?: number;
	preserveLineBreaks?: boolean;
}

// Search types
export interface SearchResult {
	title: string;
	description: string;
	url: string;
	type: CollectionType;
	publishDate: Date;
	tags?: string[];
}

// Pagination types
export interface PaginationData {
	currentPage: number;
	totalPages: number;
	totalItems: number;
	itemsPerPage: number;
	hasNextPage: boolean;
	hasPrevPage: boolean;
}
