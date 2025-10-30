export const cors_headers = {
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Methods": "GET, POST, OPTIONS",
	"Access-Control-Allow-Headers": "Content-Type",
	"Access-Control-Max-Age": "86400",
};

export function cors_response(
	data: unknown,
	status = 200,
	headers: Record<string, string> = {},
): Response {
	return new Response(JSON.stringify(data), {
		status,
		headers: {
			"Content-Type": "application/json",
			...cors_headers,
			...headers,
		},
	});
}

export function cors_error(message: string, status = 400): Response {
	return cors_response({ error: message }, status);
}

export function cors_options(): Response {
	return new Response(null, {
		status: 204,
		headers: cors_headers,
	});
}
