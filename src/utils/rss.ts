import type { CollectionEntry } from "astro:content";
import rss from "@astrojs/rss";
import { siteConfig } from "@/site.config";

interface generate_rss_config<t extends "post" | "note"> {
	items: CollectionEntry<t>[];
	path_prefix: string;
}

export function generate_rss<t extends "post" | "note">({
	items,
	path_prefix,
}: generate_rss_config<t>) {
	return rss({
		title: siteConfig.title,
		description: siteConfig.description,
		site: import.meta.env.SITE,
		items: items.map((item) => ({
			title: item.data.title,
			description: "description" in item.data ? item.data.description : undefined,
			pubDate: item.data.publishDate,
			link: `${path_prefix}/${item.id}/`,
		})),
	});
}
