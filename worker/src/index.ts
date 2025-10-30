import type { Env } from "./types";
import { cors_options } from "./utils/cors";
import { increment_view, get_view, get_all_views } from "./routes/views";
import { update_like, get_like, get_all_likes } from "./routes/likes";

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const url = new URL(request.url);

		// handle CORS preflight
		if (request.method === "OPTIONS") {
			return cors_options();
		}

		// route matching
		const path_match = url.pathname.match(/^\/api\/analytics\/(view|like)(?:\/([^/]+)\/(.+))?$/);

		if (!path_match) {
			return new Response("Not found", { status: 404 });
		}

		const [, endpoint, type, slug] = path_match;

		// views endpoints
		if (endpoint === "view") {
			if (!type || !slug) {
				// GET /api/analytics/view - get all views
				if (request.method === "GET") {
					return get_all_views(request, env);
				}
				return new Response("Method not allowed", { status: 405 });
			}

			// GET /api/analytics/view/:type/:slug
			if (request.method === "GET") {
				return get_view(request, env, slug, type);
			}

			// POST /api/analytics/view/:type/:slug
			if (request.method === "POST") {
				return increment_view(request, env, slug, type);
			}

			return new Response("Method not allowed", { status: 405 });
		}

		// likes endpoints
		if (endpoint === "like") {
			if (!type || !slug) {
				// GET /api/analytics/like - get all likes
				if (request.method === "GET") {
					return get_all_likes(request, env);
				}
				return new Response("Method not allowed", { status: 405 });
			}

			// GET /api/analytics/like/:type/:slug
			if (request.method === "GET") {
				return get_like(request, env, slug, type);
			}

			// POST /api/analytics/like/:type/:slug
			if (request.method === "POST") {
				return update_like(request, env, slug, type);
			}

			return new Response("Method not allowed", { status: 405 });
		}

		return new Response("Not found", { status: 404 });
	},
};
