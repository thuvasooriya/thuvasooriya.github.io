import { getAllPosts } from "@/data/post";
import { generate_rss } from "@/utils/rss";

export const GET = async () => {
	const posts = await getAllPosts();
	return generate_rss({ items: posts, path_prefix: "posts" });
};
