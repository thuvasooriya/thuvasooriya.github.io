import { CONTENT_LIMITS } from "@/constants";
import { isNotEmpty, isValidLength } from "./string";

export interface ValidationResult {
	isValid: boolean;
	errors: string[];
	warnings: string[];
}

export function isValidEmail(email: string): boolean {
	const emailRegex = /[^^;@]+@[^@]+\.[^@]+$/;
	return emailRegex.test(email.trim());
}

export function isValidUrl(url: string): boolean {
	try {
		new URL(url);
		return true;
	} catch {
		return false;
	}
}

export { isNotEmpty };

export { isValidLength };

export function isValidSlug(slug: string): boolean {
	const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
	return slugRegex.test(slug);
}

export function isValidDate(dateString: string): boolean {
	const date = new Date(dateString);
	return !Number.isNaN(date.getTime());
}

export function isValidISODate(dateString: string): boolean {
	const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?$/;
	return isoRegex.test(dateString) && isValidDate(dateString);
}

export function isValidTag(tag: string): boolean {
	const tagRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
	return tagRegex.test(tag) && tag.length >= 2 && tag.length <= 50;
}

export function validateTags(tags: string[]): ValidationResult {
	const errors: string[] = [];
	const warnings: string[] = [];

	const uniqueTags = new Set(tags);
	if (uniqueTags.size !== tags.length) {
		warnings.push("Duplicate tags found");
	}

	for (const tag of tags) {
		if (!isValidTag(tag)) {
			errors.push(`Invalid tag format: "${tag}"`);
		}
	}

	if (tags.length > 10) {
		warnings.push("Too many tags (recommended: 5 or fewer)");
	}

	return {
		isValid: errors.length === 0,
		errors,
		warnings,
	};
}

export function validatePostFrontmatter(frontmatter: Record<string, unknown>): ValidationResult {
	const errors: string[] = [];
	const warnings: string[] = [];

	if (!frontmatter.title || typeof frontmatter.title !== "string") {
		errors.push("Title is required and must be a string");
	} else if (!isValidLength(frontmatter.title, 1, CONTENT_LIMITS.TITLE_MAX_LENGTH)) {
		errors.push(`Title must be 1-${CONTENT_LIMITS.TITLE_MAX_LENGTH} characters`);
	}

	if (!frontmatter.description || typeof frontmatter.description !== "string") {
		errors.push("Description is required and must be a string");
	} else if (!isValidLength(frontmatter.description, 1, CONTENT_LIMITS.DESCRIPTION_MAX_LENGTH)) {
		errors.push(`Description must be 1-${CONTENT_LIMITS.DESCRIPTION_MAX_LENGTH} characters`);
	}

	if (!frontmatter.publishDate) {
		errors.push("Publish date is required");
	} else if (
		typeof frontmatter.publishDate === "string" &&
		!isValidISODate(frontmatter.publishDate)
	) {
		errors.push("Publish date must be a valid ISO date string");
	}

	if (
		frontmatter.updatedDate &&
		typeof frontmatter.updatedDate === "string" &&
		!isValidISODate(frontmatter.updatedDate)
	) {
		errors.push("Updated date must be a valid ISO date string");
	}

	if (frontmatter.tags) {
		if (!Array.isArray(frontmatter.tags)) {
			errors.push("Tags must be an array");
		} else {
			const tagValidation = validateTags(frontmatter.tags as string[]);
			errors.push(...tagValidation.errors);
			warnings.push(...tagValidation.warnings);
		}
	}

	if (frontmatter.draft !== undefined && typeof frontmatter.draft !== "boolean") {
		errors.push("Draft flag must be a boolean");
	}

	return {
		isValid: errors.length === 0,
		errors,
		warnings,
	};
}

export function validateNoteFrontmatter(frontmatter: Record<string, unknown>): ValidationResult {
	const errors: string[] = [];
	const warnings: string[] = [];

	if (!frontmatter.title || typeof frontmatter.title !== "string") {
		errors.push("Title is required and must be a string");
	} else if (!isValidLength(frontmatter.title, 1, CONTENT_LIMITS.TITLE_MAX_LENGTH)) {
		errors.push(`Title must be 1-${CONTENT_LIMITS.TITLE_MAX_LENGTH} characters`);
	}

	if (!frontmatter.publishDate) {
		errors.push("Publish date is required");
	} else if (
		typeof frontmatter.publishDate === "string" &&
		!isValidISODate(frontmatter.publishDate)
	) {
		errors.push("Publish date must be a valid ISO date string");
	}

	if (frontmatter.description && typeof frontmatter.description !== "string") {
		errors.push("Description must be a string");
	} else if (
		typeof frontmatter.description === "string" &&
		!isValidLength(frontmatter.description, 1, CONTENT_LIMITS.DESCRIPTION_MAX_LENGTH)
	) {
		errors.push(`Description must be 1-${CONTENT_LIMITS.DESCRIPTION_MAX_LENGTH} characters`);
	}

	return {
		isValid: errors.length === 0,
		errors,
		warnings,
	};
}

export function validateContent(content: string): ValidationResult {
	const errors: string[] = [];
	const warnings: string[] = [];

	if (!content || content.trim().length === 0) {
		errors.push("Content cannot be empty");
		return { isValid: false, errors, warnings };
	}

	if (content.includes("<script")) {
		warnings.push("Script tags detected in content");
	}

	if (content.includes("javascript:")) {
		warnings.push("JavaScript URLs detected in content");
	}

	const imagePattern = /!\[([^\]]*)\]\([^)]+\)/g;
	const images = content.match(imagePattern);
	if (images) {
		for (const image of images) {
			const altMatch = image.match(/!\[([^\]]*)\]/);
			if (!altMatch || !altMatch[1]?.trim()) {
				warnings.push("Image found without alt text");
			}
		}
	}

	const headingPattern = /^#{1,6}\s+/gm;
	const headings = content.match(headingPattern);
	if (headings) {
		let previousLevel = 0;
		for (const heading of headings) {
			const level = heading.match(/^#{1,6}/)?.[0].length || 0;
			if (level > previousLevel + 1) {
				warnings.push("Heading levels should not skip (e.g., H1 -> H3)");
				break;
			}
			previousLevel = level;
		}
	}

	return {
		isValid: errors.length === 0,
		errors,
		warnings,
	};
}

export function validateSiteConfig(config: Record<string, unknown>): ValidationResult {
	const errors: string[] = [];
	const warnings: string[] = [];

	if (!config.title || typeof config.title !== "string") {
		errors.push("Site title is required");
	}

	if (!config.description || typeof config.description !== "string") {
		errors.push("Site description is required");
	}

	if (!config.url || typeof config.url !== "string") {
		errors.push("Site URL is required");
	} else if (!isValidUrl(config.url)) {
		errors.push("Site URL must be a valid URL");
	}

	if (!config.author || typeof config.author !== "string") {
		errors.push("Author is required");
	}

	if (!config.lang || typeof config.lang !== "string") {
		errors.push("Language is required");
	}

	return {
		isValid: errors.length === 0,
		errors,
		warnings,
	};
}

export function validateAndSanitizeInput(
	input: string,
	options: {
		required?: boolean;
		minLength?: number;
		maxLength?: number;
		pattern?: RegExp;
		sanitize?: boolean;
	} = {},
): ValidationResult & { sanitized: string } {
	const errors: string[] = [];
	const warnings: string[] = [];
	const sanitized = options.sanitize ? sanitizeString(input) : input;

	if (options.required && !isNotEmpty(sanitized)) {
		errors.push("This field is required");
	}

	if (options.minLength && sanitized.length < options.minLength) {
		errors.push(`Minimum length is ${options.minLength} characters`);
	}

	if (options.maxLength && sanitized.length > options.maxLength) {
		errors.push(`Maximum length is ${options.maxLength} characters`);
	}

	if (options.pattern && !options.pattern.test(sanitized)) {
		errors.push("Invalid format");
	}

	return {
		isValid: errors.length === 0,
		errors,
		warnings,
		sanitized,
	};
}

function sanitizeString(input: string): string {
	return input
		.replace(/[<>]/g, "")
		.replace(/javascript:/gi, "")
		.replace(/on\w+=/gi, "")
		.trim();
}
