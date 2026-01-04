import type { Env, ContentType, BatchResponse } from "../types";
import { cors_response, cors_error } from "../utils/cors";
import { validate_content_type, validate_slug } from "../utils/validation";

const MAX_SLUGS = 50;

export async function get_batch(
	request: Request,
	env: Env,
): Promise<Response> {
	const url = new URL(request.url);
	const type = url.searchParams.get("type");
	const slugs_param = url.searchParams.get("slugs");

	if (!type || !slugs_param) {
		return cors_error("Missing required parameters: type, slugs", 400);
	}

	const content_type = validate_content_type(type);
	if (!content_type) {
		return cors_error("Invalid content type. Must be: post, tweet, project, or wiki", 400);
	}

	const slugs = slugs_param.split(",").filter(Boolean);
	if (slugs.length === 0) {
		return cors_error("No valid slugs provided", 400);
	}

	if (slugs.length > MAX_SLUGS) {
		return cors_error(`Too many slugs. Maximum is ${MAX_SLUGS}`, 400);
	}

	const valid_slugs = slugs.filter(validate_slug);
	if (valid_slugs.length === 0) {
		return cors_error("No valid slugs after validation", 400);
	}

	try {
		const placeholders = valid_slugs.map((_, i) => `?${i + 2}`).join(", ");

		const views_query = `
			SELECT slug, views 
			FROM page_views 
			WHERE content_type = ?1 AND slug IN (${placeholders})
		`;

		const likes_query = `
			SELECT slug, total_count as likes 
			FROM likes_count 
			WHERE content_type = ?1 AND slug IN (${placeholders})
		`;

		const [views_result, likes_result] = await Promise.all([
			env.DB.prepare(views_query).bind(content_type, ...valid_slugs).all<{ slug: string; views: number }>(),
			env.DB.prepare(likes_query).bind(content_type, ...valid_slugs).all<{ slug: string; likes: number }>(),
		]);

		const views_map = new Map(views_result.results?.map((r) => [r.slug, r.views]) || []);
		const likes_map = new Map(likes_result.results?.map((r) => [r.slug, r.likes]) || []);

		const response: BatchResponse = {};
		for (const slug of valid_slugs) {
			response[slug] = {
				views: views_map.get(slug) || 0,
				likes: likes_map.get(slug) || 0,
			};
		}

		return cors_response(response, 200, {
			"Cache-Control": "public, max-age=60",
		});
	} catch (error) {
		console.error("Error in batch get:", error);
		return cors_error("Internal server error", 500);
	}
}

export async function increment_batch(
	request: Request,
	env: Env,
): Promise<Response> {
	let body: { type: string; slugs: string[] } | undefined;
	try {
		body = await request.json() as { type: string; slugs: string[] };
	} catch {
		return cors_error("Invalid JSON body", 400);
	}

	if (!body?.type || !Array.isArray(body.slugs)) {
		return cors_error("Missing required fields: type, slugs", 400);
	}

	const content_type = validate_content_type(body.type);
	if (!content_type) {
		return cors_error("Invalid content type. Must be: post, tweet, project, or wiki", 400);
	}

	const slugs = body.slugs.filter(validate_slug);
	if (slugs.length === 0) {
		return cors_response({ incremented: 0 });
	}

	if (slugs.length > MAX_SLUGS) {
		return cors_error(`Too many slugs. Maximum is ${MAX_SLUGS}`, 400);
	}

	const now = Date.now();

	try {
		const statements = slugs.map((slug) =>
			env.DB.prepare(
				`INSERT INTO page_views (slug, content_type, views, updated_at)
				 VALUES (?1, ?2, 1, ?3)
				 ON CONFLICT(slug, content_type) DO UPDATE SET
				   views = views + 1,
				   updated_at = ?3`,
			).bind(slug, content_type, now)
		);

		await env.DB.batch(statements);

		return cors_response({ incremented: slugs.length });
	} catch (error) {
		console.error("Error in batch increment:", error);
		return cors_error("Internal server error", 500);
	}
}
