import type { Root } from "hast";
import type { Plugin } from "unified";
import { visit } from "unist-util-visit";

export const rehypeCleanUrls: Plugin<[], Root> = () => {
	return (tree) => {
		visit(tree, "element", (node) => {
			if (node.tagName === "a" && node.properties?.href) {
				const href = node.properties.href as string;
				// Check if it's an internal link (relative or absolute starting with /)
				// The relative links plugin converts relative to absolute /wiki/..., so we check for that.
				if (href.startsWith("/") && href.endsWith("/index")) {
					node.properties.href = href.replace(/\/index$/, "") || "/";
				}
			}
		});
	};
};
