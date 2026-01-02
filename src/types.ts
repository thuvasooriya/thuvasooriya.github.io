export interface SiteConfig {
	author: string;
	date: {
		locale: string | string[] | undefined;
		options: Intl.DateTimeFormatOptions;
	};
	description: string;
	lang: string;
	ogLocale: string;
	title: string;
	url: string;
}

export interface MenuLink {
	title: string;
	path: string;
	external?: boolean;
	description?: string;
}

export interface PostMeta {
	title: string;
	description: string;
	publishDate: Date;
	updatedDate?: Date;
	tags: string[];
	draft: boolean;
	coverImage?: {
		src: string;
		alt: string;
	};
	ogImage?: string;
}

export interface NoteMeta {
	title: string;
	description?: string;
	publishDate: Date;
}

export interface PaginationLink {
	srLabel?: string;
	text?: string;
	url: string;
}

export interface SiteMeta {
	articleDate?: string | undefined;
	description?: string;
	ogImage?: string | undefined;
	title: string;
}

export type AdmonitionType = "tip" | "note" | "important" | "caution" | "warning";

export type ThemeName =
	| "hollowknight"
	| "catppuccin-mocha"
	| "radiant"
	| "tokyo-night"
	| "dracula"
	| "onedark";

export type Typography = "mono" | "sans" | "serif";

export interface ThemeInfo {
	name: ThemeName;
	label: string;
	isDark: boolean;
}

export interface ThemeConfig {
	themes: ThemeInfo[];
	defaultDark: ThemeName;
	defaultLight: ThemeName;
	typography: Typography[];
	defaultTypography: Typography;
}

export type SortOrder = "asc" | "desc";

export type CollectionType = "post" | "note";

export interface PaginationData {
	currentPage: number;
	totalPages: number;
	totalItems: number;
	itemsPerPage: number;
	hasNextPage: boolean;
	hasPrevPage: boolean;
}
