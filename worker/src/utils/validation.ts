import type { ContentType } from "../types";

const valid_content_types: ContentType[] = ["post", "tweet", "project"];

export function validate_content_type(type: string): ContentType | null {
	if (valid_content_types.includes(type as ContentType)) {
		return type as ContentType;
	}
	return null;
}

export function validate_slug(slug: string): boolean {
	// allow alphanumeric, hyphens, underscores, forward slashes
	return /^[a-zA-Z0-9\-_\/]+$/.test(slug) && slug.length > 0 && slug.length <= 500;
}

export function validate_like_count(count: number): boolean {
	return Number.isInteger(count) && count >= 0 && count <= 13;
}
