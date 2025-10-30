import { getCollection } from "astro:content";
import { generate_rss } from "@/utils/rss";

export const GET = async () => {
	const notes = await getCollection("note");
	return generate_rss({ items: notes, path_prefix: "notes" });
};
