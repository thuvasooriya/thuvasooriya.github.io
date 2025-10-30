import type { Root } from "mdast";
import { toString as mdastToString } from "mdast-util-to-string";
import getReadingTime from "reading-time";
import type { VFile } from "vfile";

export function remarkReadingTime() {
	return (tree: Root, file: VFile) => {
		const textOnPage = mdastToString(tree);
		const readingTime = getReadingTime(textOnPage);
		if (!file.data.astro) {
			file.data.astro = { frontmatter: {} };
		}
		if (!file.data.astro.frontmatter) {
			file.data.astro.frontmatter = {};
		}
		file.data.astro.frontmatter.readingTime = readingTime.text;
	};
}
