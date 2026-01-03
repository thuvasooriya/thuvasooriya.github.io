import { getCollection } from "astro:content";
import { generate_rss } from "@/utils/rss";

export const GET = async () => {
	const tweets = await getCollection("tweet");
	return generate_rss({ items: tweets, path_prefix: "tweets" });
};
