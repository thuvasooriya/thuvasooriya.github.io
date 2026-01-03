import { type CollectionEntry, getCollection } from "astro:content";
import { getAllPosts, getAllProjects } from "./post";

export type TaggableCollection = "post" | "project" | "wiki";

export interface TagInfo {
	tag: string;
	total: number;
	counts: Record<TaggableCollection, number>;
}

export async function getAllWiki(): Promise<CollectionEntry<"wiki">[]> {
	return await getCollection("wiki");
}

export async function getAllTaggableContent(): Promise<{
	posts: CollectionEntry<"post">[];
	projects: CollectionEntry<"project">[];
	wiki: CollectionEntry<"wiki">[];
}> {
	const [posts, projects, wiki] = await Promise.all([
		getAllPosts(),
		getAllProjects(),
		getAllWiki(),
	]);
	return { posts, projects, wiki };
}

function extractTags(
	entry: CollectionEntry<"post"> | CollectionEntry<"project"> | CollectionEntry<"wiki">,
): string[] {
	const tags = entry.data.tags;
	return Array.isArray(tags) ? tags : [];
}

export async function getGlobalTagCounts(): Promise<Map<string, TagInfo>> {
	const { posts, projects, wiki } = await getAllTaggableContent();
	const tagMap = new Map<string, TagInfo>();

	const processEntries = <
		T extends CollectionEntry<"post"> | CollectionEntry<"project"> | CollectionEntry<"wiki">,
	>(
		entries: T[],
		collection: TaggableCollection,
	) => {
		for (const entry of entries) {
			for (const tag of extractTags(entry)) {
				const existing = tagMap.get(tag) || {
					tag,
					total: 0,
					counts: { post: 0, project: 0, wiki: 0 },
				};
				existing.total += 1;
				existing.counts[collection] += 1;
				tagMap.set(tag, existing);
			}
		}
	};

	processEntries(posts, "post");
	processEntries(projects, "project");
	processEntries(wiki, "wiki");

	return tagMap;
}

export async function getGlobalTags(): Promise<TagInfo[]> {
	const tagMap = await getGlobalTagCounts();
	return [...tagMap.values()].sort((a, b) => b.total - a.total);
}

export async function getGlobalTagNames(): Promise<string[]> {
	const tagMap = await getGlobalTagCounts();
	return [...tagMap.keys()].sort();
}

export async function getContentByTag(tag: string): Promise<{
	posts: CollectionEntry<"post">[];
	projects: CollectionEntry<"project">[];
	wiki: CollectionEntry<"wiki">[];
}> {
	const { posts, projects, wiki } = await getAllTaggableContent();
	return {
		posts: posts.filter((p) => p.data.tags?.includes(tag)),
		projects: projects.filter((p) => p.data.tags?.includes(tag)),
		wiki: wiki.filter((w) => w.data.tags?.includes(tag)),
	};
}
