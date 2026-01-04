import { type CollectionEntry, getCollection } from "astro:content";

type ContentCollection = "post" | "tweet" | "project";
type ContentEntry<T extends ContentCollection> = CollectionEntry<T>;

// filter out drafts in production
function filterDrafts<T extends { data: { draft?: boolean } }>(entries: T[]): T[] {
	return entries.filter((entry) => (import.meta.env.PROD ? !entry.data.draft : true));
}

// sort by publish date (newest first)
export function sortByDate<T extends { data: { published?: Date | undefined } }>(
	entries: T[],
	order: "asc" | "desc" = "desc",
): T[] {
	return [...entries].sort((a, b) => {
		const dateA = a.data.published?.getTime() ?? 0;
		const dateB = b.data.published?.getTime() ?? 0;
		return order === "desc" ? dateB - dateA : dateA - dateB;
	});
}

// get all posts (filtered by draft status)
export async function getAllPosts(): Promise<ContentEntry<"post">[]> {
	const posts = await getCollection("post");
	return filterDrafts(posts);
}

// get all tweets
export async function getAllTweets(): Promise<ContentEntry<"tweet">[]> {
	return await getCollection("tweet");
}

// get all projects
export async function getAllProjects(): Promise<ContentEntry<"project">[]> {
	return await getCollection("project");
}

// get parent project code for a project entry (works for both main and log entries)
export async function getProjectCode(entry: ContentEntry<"project">): Promise<string | undefined> {
	if (entry.data.code) return entry.data.code;
	if (!entry.id.includes("/")) return undefined;
	const folder = entry.id.split("/")[0];
	const allProjects = await getCollection("project");
	const parent = allProjects.find((p) => p.id === folder);
	return parent?.data.code;
}

// build a map of project codes for all projects (efficient batch lookup)
export async function getProjectCodeMap(): Promise<Map<string, string>> {
	const allProjects = await getCollection("project");
	const codeMap = new Map<string, string>();
	const folderCodes = new Map<string, string>();
	for (const p of allProjects) {
		if (p.data.code) {
			const folder = p.id.includes("/") ? p.id.split("/")[0] : p.id;
			if (folder) folderCodes.set(folder, p.data.code);
			codeMap.set(p.id, p.data.code);
		}
	}
	for (const p of allProjects) {
		if (!codeMap.has(p.id) && p.id.includes("/")) {
			const folder = p.id.split("/")[0];
			if (folder) {
				const code = folderCodes.get(folder);
				if (code) codeMap.set(p.id, code);
			}
		}
	}
	return codeMap;
}

// group entries by year
export function groupByYear<T extends { data: { published: Date } }>(
	entries: T[],
): Record<string, T[]> {
	return entries.reduce<Record<string, T[]>>((acc, entry) => {
		const year = entry.data.published.getFullYear().toString();
		if (!acc[year]) {
			acc[year] = [];
		}
		acc[year].push(entry);
		return acc;
	}, {});
}

// legacy alias
export function groupPostsByYear(posts: ContentEntry<"post">[]) {
	return groupByYear(posts);
}

// get all tags from entries (includes duplicates)
export function getAllTags<T extends { data: { tags?: string[] } }>(entries: T[]): string[] {
	return entries.flatMap((entry) => entry.data.tags ?? []);
}

// get unique tags
export function getUniqueTags<T extends { data: { tags?: string[] } }>(entries: T[]): string[] {
	return [...new Set(getAllTags(entries))];
}

// get unique tags with count, sorted by count descending
export function getUniqueTagsWithCount<T extends { data: { tags?: string[] } }>(
	entries: T[],
): [string, number][] {
	const tagCounts = getAllTags(entries).reduce(
		(acc, tag) => acc.set(tag, (acc.get(tag) ?? 0) + 1),
		new Map<string, number>(),
	);
	return [...tagCounts.entries()].sort((a, b) => b[1] - a[1]);
}

// get tag counts as object
export function getTagCounts<T extends { data: { tags?: string[] } }>(
	entries: T[],
): Record<string, number> {
	return Object.fromEntries(getUniqueTagsWithCount(entries));
}

// filter entries by tag
export function filterByTag<T extends { data: { tags?: string[] } }>(
	entries: T[],
	tag: string,
): T[] {
	return entries.filter((entry) => entry.data.tags?.includes(tag));
}
