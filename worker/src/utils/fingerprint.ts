// simple user fingerprinting based on ip + user-agent hash
export async function generate_user_id(request: Request): Promise<string> {
	const ip = request.headers.get("CF-Connecting-IP") || request.headers.get("X-Forwarded-For") || "unknown";
	const user_agent = request.headers.get("User-Agent") || "unknown";
	const raw = `${ip}:${user_agent}`;
	
	const encoder = new TextEncoder();
	const data = encoder.encode(raw);
	const hash_buffer = await crypto.subtle.digest("SHA-256", data);
	const hash_array = Array.from(new Uint8Array(hash_buffer));
	const hash_hex = hash_array.map(b => b.toString(16).padStart(2, "0")).join("");
	
	return hash_hex.substring(0, 16);
}
