import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

function removeDupsAndLowerCase(array: string[]) {
	return [...new Set(array.map((str) => str.toLowerCase()))];
}

const baseSchema = z.object({
	title: z.string().max(60),
});

const post = defineCollection({
	loader: glob({ base: "./src/content/posts", pattern: "**/*.{md,mdx}" }),
	schema: ({ image }) =>
		baseSchema.extend({
			description: z.string(),
			coverImage: z
				.object({
					alt: z.string(),
					src: image(),
				})
				.optional(),
			draft: z.boolean().default(false),
			ogImage: z.string().optional(),
			tags: z.array(z.string()).default([]).transform(removeDupsAndLowerCase),
			publishDate: z
				.string()
				.or(z.date())
				.transform((val) => new Date(val)),
			updatedDate: z
				.string()
				.optional()
				.transform((str) => (str ? new Date(str) : undefined)),
		}),
});

const note = defineCollection({
	loader: glob({ base: "./src/content/tweets", pattern: "**/*.{md,mdx}" }),
	schema: baseSchema.extend({
		description: z.string().optional(),
		publishDate: z
			.string()
			.datetime({ offset: true }) // Ensures ISO 8601 format with offsets allowed (e.g. "2024-01-01T00:00:00Z" and "2024-01-01T00:00:00+02:00")
			.transform((val) => new Date(val)),
	}),
});

const page = defineCollection({
	loader: glob({ base: "./src/content/pages", pattern: "**/*.{md,mdx}" }),
	schema: z.object({
		title: z.string(),
		description: z.string().optional(),
		hero: z
			.object({
				title: z.string(),
				subtitle: z.string(),
				tagline: z.string(),
			})
			.optional(),
		tiles: z
			.array(
				z.object({
					type: z.enum(["now", "bio", "cv", "social", "custom"]),
					tag: z.string().optional(),
					title: z.string().optional(),
					description: z.string().optional(),
					icon: z.string().optional(),
					link: z.string().optional(),
					previewImage: z.string().optional(),
					items: z.array(z.string()).optional(),
					span: z.enum(["1", "2", "3", "4", "6", "full"]).default("2"),
					color: z
						.enum([
							"primary",
							"accent",
							"variant-1",
							"variant-2",
							"variant-3",
							"variant-4",
							"social-github",
							"social-x",
							"social-instagram",
							"social-pinterest",
							"social-spotify",
							"social-rss",
						])
						.default("primary"),
				}),
			)
			.optional(),
		// legacy fields for backward compatibility
		now: z
			.array(
				z.object({
					tag: z.string(),
					title: z.string(),
					description: z.string(),
					icon: z.string(),
				}),
			)
			.optional(),
		skills: z
			.array(
				z.object({
					category: z.string(),
					icon: z.string(),
					items: z.array(z.string()),
				}),
			)
			.optional(),
		philosophy: z
			.array(
				z.object({
					title: z.string(),
					description: z.string(),
					icon: z.string(),
				}),
			)
			.optional(),
		stay_updated: z
			.object({
				title: z.string(),
				description: z.string(),
			})
			.optional(),
	}),
});

const proj = defineCollection({
	loader: glob({ base: "./src/content/proj", pattern: "**/*.{md,mdx}" }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string().optional(),
			// post-like fields for articles and logs
			publishDate: z
				.string()
				.or(z.date())
				.optional()
				.transform((val) => (val ? new Date(val) : undefined)),
			updatedDate: z
				.string()
				.optional()
				.transform((str) => (str ? new Date(str) : undefined)),
			draft: z.boolean().default(false),
			// project-specific fields (primarily for index.md)
			demoLink: z.string().url().optional(),
			github: z.string().url().optional(),
			status: z.enum(["active", "archived", "planning", "paused", "draft"]).optional(),
			tags: z.array(z.string()).default([]).transform(removeDupsAndLowerCase),
			coverImage: z
				.object({
					alt: z.string(),
					src: image(),
				})
				.optional(),
			startDate: z
				.string()
				.optional()
				.transform((str) => (str ? new Date(str) : undefined)),
			links: z
				.array(
					z.object({
						label: z.string(),
						url: z.string().url(),
					}),
				)
				.optional(),
		}),
});

export const collections = { post, note, page, proj };
