import { getCollection } from "astro:content";

export async function logWikiIds() {
	const entries = await getCollection("wiki");
	const indexEntries = entries.filter((e) => e.id.endsWith("index") || e.id.includes("/index"));
	console.log(
		"Found index entries:",
		indexEntries.map((e) => e.id),
	);
}

logWikiIds();
