import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import expressiveCode from "astro-expressive-code";
import icon from "astro-icon";
import fs from "fs";
import rehypeExternalLinks from "rehype-external-links";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import remarkUnwrapImages from "remark-unwrap-images";
import { expressiveCodeOptions } from "./src/site.config";
import { remarkReadingTime } from "./src/utils/remark-reading-time";

// https://astro.build/config
export default defineConfig({
	image: {
		domains: ["webmention.io"],
	},
	integrations: [
		expressiveCode(expressiveCodeOptions),
		icon(),
		tailwind({
			applyBaseStyles: false,
		}),
		sitemap(),
		mdx(),
	],
	markdown: {
		rehypePlugins: [
			[
				rehypeExternalLinks,
				{
					rel: ["nofollow, noopener, noreferrer"],
					target: "_blank",
				},
			],
			rehypeKatex,
		],
		remarkPlugins: [
			remarkUnwrapImages,
			remarkReadingTime,
			[
				remarkMath,
				{
					singleDollarTextMath: true,
				},
			],
		],
		remarkRehype: {
			footnoteLabelProperties: {
				className: ["lowercase"],
			},
		},
	},
	prefetch: true,
	redirects: {
		jotter: "https://jotter4u.fly.dev/",
	},
	site: "https://thuvasooriya.me",
	// https://docs.astro.build/en/guides/prefetch/
	vite: {
		optimizeDeps: {
			exclude: ["@resvg/resvg-js"],
		},
		plugins: [rawFonts([".ttf", ".woff"])],
	},
});
function rawFonts(ext: string[]) {
	return {
		name: "vite-plugin-raw-fonts",
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error:next-line
		transform(_, id) {
			if (ext.some((e) => id.endsWith(e))) {
				const buffer = fs.readFileSync(id);
				return {
					code: `export default ${JSON.stringify(buffer)}`,
					map: null,
				};
			}
		},
	};
}
