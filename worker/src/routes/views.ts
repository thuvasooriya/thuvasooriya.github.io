import type { Env, ViewResponse } from "../types";
import { cors_response, cors_error } from "../utils/cors";
import { validate_content_type, validate_slug } from "../utils/validation";

export async function increment_view(
	_request: Request,
	env: Env,
	slug: string,
	type: string,
): Promise<Response> {
	const content_type = validate_content_type(type);
	if (!content_type) {
		return cors_error("Invalid content type. Must be: post, tweet, or project", 400);
	}

	if (!validate_slug(slug)) {
		return cors_error("Invalid slug format", 400);
	}

	const now = Date.now();

	try {
		await env.DB.prepare(
			`INSERT INTO page_views (slug, content_type, views, updated_at)
			 VALUES (?1, ?2, 1, ?3)
			 ON CONFLICT(slug, content_type) DO UPDATE SET
			   views = views + 1,
			   updated_at = ?3`,
		)
			.bind(slug, content_type, now)
			.run();

		const result = await env.DB.prepare(
			`SELECT slug, content_type, views FROM page_views WHERE slug = ?1 AND content_type = ?2`,
		)
			.bind(slug, content_type)
			.first<ViewResponse>();

		if (!result) {
			return cors_error("Failed to retrieve view count", 500);
		}

		return cors_response(result, 200, {
			"Cache-Control": "public, max-age=60",
		});
	} catch (error) {
		console.error("Error incrementing view:", error);
		return cors_error("Internal server error", 500);
	}
}

export async function get_view(
	_request: Request,
	env: Env,
	slug: string,
	type: string,
): Promise<Response> {
	const content_type = validate_content_type(type);
	if (!content_type) {
		return cors_error("Invalid content type. Must be: post, tweet, or project", 400);
	}

	if (!validate_slug(slug)) {
		return cors_error("Invalid slug format", 400);
	}

	try {
		const result = await env.DB.prepare(
			`SELECT slug, content_type, views FROM page_views WHERE slug = ?1 AND content_type = ?2`,
		)
			.bind(slug, content_type)
			.first<ViewResponse>();

		if (!result) {
			return cors_response(
				{
					slug,
					content_type,
					views: 0,
				},
				200,
				{
					"Cache-Control": "public, max-age=60",
				},
			);
		}

		return cors_response(result, 200, {
			"Cache-Control": "public, max-age=60",
		});
	} catch (error) {
		console.error("Error getting view:", error);
		return cors_error("Internal server error", 500);
	}
}

export async function get_all_views(_request: Request, env: Env): Promise<Response> {
	try {
		const results = await env.DB.prepare(
			`SELECT slug, content_type, views FROM page_views ORDER BY updated_at DESC LIMIT 100`,
		).all<ViewResponse>();

		return cors_response(results.results || [], 200, {
			"Cache-Control": "public, max-age=300",
		});
	} catch (error) {
		console.error("Error getting all views:", error);
		return cors_error("Internal server error", 500);
	}
}
