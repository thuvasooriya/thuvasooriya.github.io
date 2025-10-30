import type { AstroExpressiveCodeOptions } from "astro-expressive-code";
import type { SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
	author: "thuvasooriya",
	title: "sooriya",
	description: "[me to me]: shut up, i'm thinking...",
	lang: "en-US",
	ogLocale: "en_US",
	// Date.prototype.toLocaleDateString() parameters, found in src/utils/date.ts.
	date: {
		locale: "en-US",
		options: {
			day: "numeric",
			month: "short",
			year: "numeric",
		},
	},
	url: "https://thuvasooriya.me",
};

// Used to generate links in both the Header & Footer.
export const menuLinks: Array<{ title: string; path: string }> = [
	{
		title: "about",
		path: "/about/",
	},
	{
		title: "posts",
		path: "/posts/",
	},
	{
		title: "tweets",
		path: "/tweets/",
	},
	{
		title: "projects",
		path: "/projects/",
	},
];

// https://expressive-code.com/reference/configuration/
export const filterConfig = {
	min_tag_usage: 1,
	initial_tags_to_show: 8,
};

export const expressiveCodeOptions: AstroExpressiveCodeOptions = {
	styleOverrides: {
		borderRadius: "2px",
		codeFontFamily: '"JetBrains Mono Variable", monospace',
		codeFontSize: "0.875rem",
		codeLineHeight: "1.7142857rem",
		codePaddingInline: "1rem",
		frames: {
			frameBoxShadowCssValue: "none",
		},
		uiLineHeight: "inherit",
	},
	themeCssSelector(theme, { styleVariants }) {
		if (styleVariants.length >= 2) {
			const baseTheme = styleVariants[0]?.theme;
			const altTheme = styleVariants.find((v) => v.theme.type !== baseTheme?.type)?.theme;
			if (theme === baseTheme || theme === altTheme) return `[data-theme='${theme.type}']`;
		}
		// return default selector
		return `[data-theme="${theme.name}"]`;
	},
	themes: ["catppuccin-mocha", "catppuccin-latte"],
	useThemedScrollbars: false,
};
