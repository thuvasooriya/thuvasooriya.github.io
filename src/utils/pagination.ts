import type { Page } from "astro";

export function getPaginationProps(page: Page) {
	return {
		...(page.url.prev && {
			prevUrl: {
				text: "← previous page",
				url: page.url.prev,
			},
		}),
		...(page.url.next && {
			nextUrl: {
				text: "next page →",
				url: page.url.next,
			},
		}),
	};
}
