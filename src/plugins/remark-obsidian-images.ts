import type { Image, Root } from "mdast";
import { visit } from "unist-util-visit";

const SIZE_PATTERN = /^(.*?)\|(\d+)(?:x(\d+))?$/;

export function remarkObsidianImages() {
	return (tree: Root) => {
		visit(tree, "image", (node: Image) => {
			if (!node.alt) return;

			const match = node.alt.match(SIZE_PATTERN);
			if (!match) return;

			const [, altText, width, height] = match;
			node.alt = altText?.trim() || "";

			if (!node.data) node.data = {};
			if (!node.data.hProperties) node.data.hProperties = {};

			const props = node.data.hProperties as Record<string, string>;
			if (width) props.width = width;
			if (height) props.height = height;
		});
	};
}
