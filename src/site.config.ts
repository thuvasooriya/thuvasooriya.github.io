import type { SiteConfig } from "@/types";
import type { AstroExpressiveCodeOptions } from "astro-expressive-code";

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
	// {
	// 	title: "home",
	// 	path: "/",
	// },
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
	// {
	// 	title: "wiki",
	// 	path: "https://wiki.thuvasooriya.me",
	// },
];

// https://expressive-code.com/reference/configuration/
export const expressiveCodeOptions: AstroExpressiveCodeOptions = {
	styleOverrides: {
		borderRadius: "2px",
		codeFontFamily: '"JetBrains Mono Variable", monospace;',
		codeFontSize: "0.875rem",
		codeLineHeight: "1.7142857rem",
		codePaddingInline: "1rem",
		frames: {
			frameBoxShadowCssValue: "none",
		},
		uiLineHeight: "inherit",
	},
	themeCssSelector(theme, { styleVariants }) {
		// If one dark and one light theme are available
		// generate theme CSS selectors compatible with cactus-theme dark mode switch
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
