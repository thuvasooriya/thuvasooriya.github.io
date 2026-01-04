import type { AstroExpressiveCodeOptions } from "astro-expressive-code";
import type { SiteConfig, ThemeConfig } from "@/types";

export const siteConfig: SiteConfig = {
	author: "thuvasooriya",
	title: "sooriya",
	description: "[me to me]: shut up, i'm thinking...",
	lang: "en-US",
	ogLocale: "en_US",
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

export const themeConfig: ThemeConfig = {
	themes: [
		{ name: "hollowknight", label: "hollow knight", isDark: true },
		{ name: "catppuccin-mocha", label: "catppuccin mocha", isDark: true },
		{ name: "radiant", label: "radiant", isDark: false },
		{ name: "tokyo-night", label: "tokyo night", isDark: true },
		{ name: "dracula", label: "dracula", isDark: true },
		{ name: "onedark", label: "one dark", isDark: true },
	],
	defaultDark: "hollowknight",
	defaultLight: "radiant",
	typography: ["mono", "sans", "serif"],
	defaultTypography: "mono",
};

// Used to generate links in both the Header & Footer.
export const menuLinks: Array<{ title: string; path: string }> = [
	{
		title: "about",
		path: "/about/",
	},
	{
		title: "posts",
		path: "/post/",
	},
	{
		title: "tweets",
		path: "/tweet/",
	},
	{
		title: "projects",
		path: "/project/",
	},
	{
		title: "wiki",
		path: "/wiki/",
	},
];

// https://expressive-code.com/reference/configuration/
export const filterConfig = {
	min_tag_usage: 1,
	initial_tags_to_show: 8,
};

const darkThemes = new Set([
	"hollowknight",
	"catppuccin-mocha",
	"tokyo-night",
	"dracula",
	"onedark",
]);

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
	themeCssSelector(theme) {
		const isDarkTheme = theme.type === "dark";
		const themeSelectors = isDarkTheme
			? [...darkThemes].map((t) => `[data-theme="${t}"]`).join(", ")
			: `[data-theme="radiant"]`;
		return themeSelectors;
	},
	themes: ["catppuccin-mocha", "catppuccin-latte"],
	useThemedScrollbars: false,
	shiki: {
		langAlias: {
			just: "make",
			ld: "asm",
			ls: "asm",
			linker: "asm",
			sv: "system-verilog",
			systemverilog: "system-verilog",
			verilog: "verilog",
			assembly: "asm",
		},
	},
};
