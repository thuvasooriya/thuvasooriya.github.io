export function toKebabCase(str: string): string {
	return str
		.replace(/([a-z])([A-Z])/g, "$1-$2")
		.replace(/[\s_]+/g, "-")
		.toLowerCase();
}

export function toSnakeCase(str: string): string {
	return str
		.replace(/([a-z])([A-Z])/g, "$1_$2")
		.replace(/[\s-]+/g, "_")
		.toLowerCase();
}

export function toCamelCase(str: string): string {
	return str
		.replace(/[-_\s]+(.)?/g, (_, char) => (char ? char.toUpperCase() : ""))
		.replace(/^[A-Z]/, (char) => char.toLowerCase());
}

export function toPascalCase(str: string): string {
	return str
		.replace(/[-_\s]+(.)?/g, (_, char) => (char ? char.toUpperCase() : ""))
		.replace(/^[a-z]/, (char) => char.toUpperCase());
}

export function slugify(str: string): string {
	return str
		.toLowerCase()
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.replace(/[^a-z0-9\s-]/g, "")
		.replace(/\s+/g, "-")
		.replace(/-+/g, "-")
		.replace(/^-|-$/g, "");
}

export function truncate(str: string, length: number, suffix: string = "..."): string {
	if (str.length <= length) return str;
	return str.slice(0, length - suffix.length) + suffix;
}

export function truncateByWords(str: string, wordCount: number, suffix: string = "..."): string {
	const words = str.split(/\s+/);
	if (words.length <= wordCount) return str;
	return words.slice(0, wordCount).join(" ") + suffix;
}

export function stripHtml(str: string): string {
	return str.replace(/<[^>]*>/g, "").trim();
}

export function stripMarkdown(str: string): string {
	return str
		.replace(/```[\s\S]*?```/g, "")
		.replace(/`([^`]+)`/g, "$1")
		.replace(/\*\*([^*]+)\*\*/g, "$1")
		.replace(/\*([^*]+)\*/g, "$1")
		.replace(/~~([^~]+)~~/g, "$1")
		.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
		.replace(/#{1,6}\s+/g, "")
		.replace(/>\s+/g, "")
		.replace(/^\s*[-*+]\s+/gm, "")
		.replace(/^\s*\d+\.\s+/gm, "")
		.trim();
}

export function createExcerpt(
	content: string,
	maxLength: number = 160,
	stripTags: boolean = true,
): string {
	let text = stripTags ? stripHtml(stripMarkdown(content)) : content;
	text = text.replace(/\s+/g, " ").trim();
	return truncate(text, maxLength);
}

export function capitalize(str: string): string {
	return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function titleCase(str: string): string {
	return str
		.split(/\s+/)
		.map((word) => capitalize(word))
		.join(" ");
}

export function isEmpty(str: string | null | undefined): boolean {
	return !str || str.trim().length === 0;
}

export function isNotEmpty(value: string): boolean {
	return value.trim().length > 0;
}

export function isValidLength(
	value: string,
	min: number = 0,
	max: number = Number.MAX_SAFE_INTEGER,
): boolean {
	const length = value.trim().length;
	return length >= min && length <= max;
}

export function isWhitespace(str: string): boolean {
	return /^\s*$/.test(str);
}

export function normalizeWhitespace(str: string): string {
	return str
		.replace(/\r\n/g, "\n")
		.replace(/\r/g, "\n")
		.replace(/\n{3,}/g, "\n\n")
		.replace(/[ \t]+/g, " ")
		.trim();
}

export function wordCount(str: string): number {
	return str
		.trim()
		.split(/\s+/)
		.filter((word) => word.length > 0).length;
}

export function characterCount(str: string, includeSpaces: boolean = true): number {
	return includeSpaces ? str.length : str.replace(/\s/g, "").length;
}

export function readingTime(str: string, wordsPerMinute: number = 200): number {
	const words = wordCount(stripHtml(stripMarkdown(str)));
	return Math.ceil(words / wordsPerMinute);
}

export function escapeHtml(str: string): string {
	const htmlEscapes: Record<string, string> = {
		"&": "&amp;",
		"<": "&lt;",
		">": "&gt;",
		'"': "&quot;",
		"'": "&#x27;",
	};
	return str.replace(/[&<>"']/g, (char) => htmlEscapes[char] || char);
}

export function unescapeHtml(str: string): string {
	const htmlUnescapes: Record<string, string> = {
		"&amp;": "&",
		"&lt;": "<",
		"&gt;": ">",
		"&quot;": '"',
		"&#x27;": "'",
		"&#39;": "'",
	};
	return str.replace(/&(?:amp|lt|gt|quot|#x27|#39);/g, (entity) => htmlUnescapes[entity] || entity);
}

export function randomString(
	length: number = 8,
	charset: string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
): string {
	let result = "";
	for (let i = 0; i < length; i++) {
		result += charset.charAt(Math.floor(Math.random() * charset.length));
	}
	return result;
}

export function matchesPattern(str: string, pattern: string): boolean {
	const regex = new RegExp(
		`^${pattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/\\\*/g, ".*")}$`,
		"i",
	);
	return regex.test(str);
}

export function commonPrefix(strings: string[]): string {
	if (strings.length === 0) return "";
	if (strings.length === 1) return strings[0] || "";

	let prefix = "";
	const firstString = strings[0] || "";

	for (let i = 0; i < firstString.length; i++) {
		const char = firstString[i];
		if (strings.every((str) => str[i] === char)) {
			prefix += char;
		} else {
			break;
		}
	}

	return prefix;
}

export function commonSuffix(strings: string[]): string {
	if (strings.length === 0) return "";
	if (strings.length === 1) return strings[0] || "";

	let suffix = "";
	const firstString = strings[0] || "";

	for (let i = firstString.length - 1; i >= 0; i--) {
		const char = firstString[i];
		const position = firstString.length - 1 - i;
		if (strings.every((str) => str[str.length - 1 - position] === char)) {
			suffix = char + suffix;
		} else {
			break;
		}
	}

	return suffix;
}

export function sanitizeString(input: string): string {
	return input
		.replace(/[<>]/g, "")
		.replace(/javascript:/gi, "")
		.replace(/on\w+=/gi, "")
		.trim();
}
