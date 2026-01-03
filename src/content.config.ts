import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

function removeDupsAndLowerCase(array: string[]) {
	return [...new Set(array.map((str) => str.toLowerCase()))];
}

const post = defineCollection({
	loader: glob({ base: "./src/content/post", pattern: "**/*.{md,mdx}" }),
	schema: ({ image }) =>
		z.object({
			title: z.string().max(60),
			description: z.string(),
			cover_image: z
				.object({
					alt: z.string(),
					src: image(),
				})
				.optional(),
			draft: z.boolean().default(false),
			tags: z.array(z.string()).default([]).transform(removeDupsAndLowerCase),
			published: z
				.string()
				.or(z.date())
				.transform((val) => new Date(val)),
			updated: z
				.string()
				.or(z.date())
				.optional()
				.transform((val) => (val ? new Date(val) : undefined)),
		}),
});

const tweet = defineCollection({
	loader: glob({ base: "./src/content/tweet", pattern: "**/*.{md,mdx}" }),
	schema: z.object({
		title: z.string().max(60),
		published: z
			.string()
			.or(z.date())
			.transform((val) => new Date(val)),
		updated: z
			.string()
			.or(z.date())
			.optional()
			.transform((val) => (val ? new Date(val) : undefined)),
	}),
});

const page = defineCollection({
	loader: glob({ base: "./src/content/page", pattern: "**/*.{md,mdx}" }),
	schema: z.object({
		title: z.string(),
		description: z.string().optional(),
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
	}),
});

const project = defineCollection({
	loader: glob({ base: "./src/content/project", pattern: "**/*.{md,mdx}" }),
	schema: z.object({
		title: z.string(),
		description: z.string().optional(),
		tags: z.array(z.string()).default([]).transform(removeDupsAndLowerCase),
		code: z.string().optional(),
		status: z.enum(["init", "plan", "exec", "hold", "done"]).optional(),
		started: z
			.string()
			.or(z.date())
			.optional()
			.transform((val) => (val ? new Date(val) : undefined)),
		updated: z
			.string()
			.or(z.date())
			.optional()
			.transform((val) => (val ? new Date(val) : undefined)),
		github: z.string().url().optional().nullable().or(z.literal("")),
		demo: z.string().url().optional().nullable().or(z.literal("")),
		cover: z.string().optional().nullable(),
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

const wiki = defineCollection({
	loader: glob({ base: "./src/content/wiki", pattern: "**/*.{md,mdx}" }),
	schema: z.object({
		title: z.string(),
		description: z.string().optional(),
		status: z.enum(["seed", "growing", "evergreen"]).default("seed"),
		template: z.enum(["doc", "splash"]).default("doc"),
		tags: z.array(z.string()).optional(),
		updated: z
			.string()
			.or(z.date())
			.optional()
			.transform((val) => (val ? new Date(val) : undefined)),
		sidebar: z
			.object({
				order: z.number().optional(),
				label: z.string().optional(),
				hidden: z.boolean().default(false),
			})
			.default({}),
	}),
});

export const collections = { post, tweet, page, project, wiki };
