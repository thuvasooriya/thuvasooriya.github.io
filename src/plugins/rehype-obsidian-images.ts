import type { Element, Root } from "hast";
import { visit } from "unist-util-visit";

const SIZE_PATTERN = /^(.*?)\|(\d+)(?:x(\d+))?$/;

export function rehypeObsidianImages() {
	return (tree: Root) => {
		visit(tree, "element", (node: Element) => {
			if (node.tagName !== "img") return;

			const alt = node.properties?.alt;
			if (typeof alt !== "string") return;

			const match = alt.match(SIZE_PATTERN);
			if (!match) return;

			const [, altText, width, height] = match;
			const caption = altText?.trim() || "";
			node.properties.alt = caption;
			if (width) node.properties.width = width;
			if (height) node.properties.height = height;
			if (caption) node.properties.dataCaption = caption;
			node.properties.className = ["sized-image"];
		});
	};
}
