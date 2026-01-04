import type { D1Database } from "@cloudflare/workers-types";

export interface Env {
	DB: D1Database;
}

export type ContentType = "post" | "tweet" | "project" | "wiki";

export interface ViewResponse {
	slug: string;
	content_type: ContentType;
	views: number;
}

export interface LikeResponse {
	slug: string;
	content_type: ContentType;
	user_likes: number;
	total_likes: number;
	unique_users: number;
}

export interface StatsResponse {
	views: ViewResponse[];
	likes: LikeResponse[];
}

export interface ErrorResponse {
	error: string;
	message?: string;
}

export interface BatchQuery {
	type: ContentType;
	slugs: string[];
}

export interface BatchItemResponse {
	views: number;
	likes: number;
}

export interface BatchResponse {
	[slug: string]: BatchItemResponse;
}

export interface BatchIncrementQuery {
	type: ContentType;
	slugs: string[];
}
