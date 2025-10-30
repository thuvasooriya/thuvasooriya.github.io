import type { Env, LikeResponse } from "../types";
import { cors_response, cors_error } from "../utils/cors";
import { validate_content_type, validate_slug, validate_like_count } from "../utils/validation";
import { generate_user_id } from "../utils/fingerprint";

export async function update_like(
	request: Request,
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

	const user_id = await generate_user_id(request);
	const now = Date.now();

	let body: { count: number } | undefined;
	try {
		body = await request.json() as { count: number };
	} catch {
		return cors_error("Invalid JSON body. Expected: { count: number }", 400);
	}

	if (!body || typeof body.count !== "number") {
		return cors_error("Missing or invalid 'count' field", 400);
	}

	if (!validate_like_count(body.count)) {
		return cors_error("Like count must be between 0 and 13", 400);
	}

	try {
		// start transaction
		const batch = [
			// upsert user's like count
			env.DB.prepare(
				`INSERT INTO likes (slug, content_type, user_id, count, created_at, updated_at)
				 VALUES (?1, ?2, ?3, ?4, ?5, ?5)
				 ON CONFLICT(slug, content_type, user_id) DO UPDATE SET
				   count = ?4,
				   updated_at = ?5`,
			).bind(slug, content_type, user_id, body.count, now),

			// recalculate total count from likes table
			env.DB.prepare(
				`INSERT INTO likes_count (slug, content_type, total_count, unique_users, updated_at)
				 VALUES (
				   ?1, ?2,
				   (SELECT COALESCE(SUM(count), 0) FROM likes WHERE slug = ?1 AND content_type = ?2),
				   (SELECT COUNT(DISTINCT user_id) FROM likes WHERE slug = ?1 AND content_type = ?2 AND count > 0),
				   ?3
				 )
				 ON CONFLICT(slug, content_type) DO UPDATE SET
				   total_count = (SELECT COALESCE(SUM(count), 0) FROM likes WHERE slug = ?1 AND content_type = ?2),
				   unique_users = (SELECT COUNT(DISTINCT user_id) FROM likes WHERE slug = ?1 AND content_type = ?2 AND count > 0),
				   updated_at = ?3`,
			).bind(slug, content_type, now),
		];

		await env.DB.batch(batch);

		// fetch updated counts
		const result = await env.DB.prepare(
			`SELECT 
			   l.count as user_likes,
			   lc.total_count as total_likes,
			   lc.unique_users
			 FROM likes l
			 LEFT JOIN likes_count lc ON l.slug = lc.slug AND l.content_type = lc.content_type
			 WHERE l.slug = ?1 AND l.content_type = ?2 AND l.user_id = ?3`,
		)
			.bind(slug, content_type, user_id)
			.first<{ user_likes: number; total_likes: number; unique_users: number }>();

		const response: LikeResponse = {
			slug,
			content_type,
			user_likes: result?.user_likes || 0,
			total_likes: result?.total_likes || 0,
			unique_users: result?.unique_users || 0,
		};

		return cors_response(response);
	} catch (error) {
		console.error("Error updating like:", error);
		return cors_error("Internal server error", 500);
	}
}

export async function get_like(
	request: Request,
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

	const user_id = await generate_user_id(request);

	try {
		const result = await env.DB.prepare(
			`SELECT 
			   COALESCE(l.count, 0) as user_likes,
			   COALESCE(lc.total_count, 0) as total_likes,
			   COALESCE(lc.unique_users, 0) as unique_users
			 FROM (SELECT ?1 as slug, ?2 as content_type, ?3 as user_id) params
			 LEFT JOIN likes l ON params.slug = l.slug AND params.content_type = l.content_type AND params.user_id = l.user_id
			 LEFT JOIN likes_count lc ON params.slug = lc.slug AND params.content_type = lc.content_type`,
		)
			.bind(slug, content_type, user_id)
			.first<{ user_likes: number; total_likes: number; unique_users: number }>();

		const response: LikeResponse = {
			slug,
			content_type,
			user_likes: result?.user_likes || 0,
			total_likes: result?.total_likes || 0,
			unique_users: result?.unique_users || 0,
		};

		return cors_response(response, 200, {
			"Cache-Control": "public, max-age=60",
		});
	} catch (error) {
		console.error("Error getting like:", error);
		return cors_error("Internal server error", 500);
	}
}

export async function get_all_likes(_request: Request, env: Env): Promise<Response> {
	try {
		const results = await env.DB.prepare(
			`SELECT slug, content_type, total_count as total_likes, unique_users 
			 FROM likes_count 
			 ORDER BY updated_at DESC 
			 LIMIT 100`,
		).all<Omit<LikeResponse, "user_likes">>();

		return cors_response(results.results || [], 200, {
			"Cache-Control": "public, max-age=300",
		});
	} catch (error) {
		console.error("Error getting all likes:", error);
		return cors_error("Internal server error", 500);
	}
}
