// Magic numbers and configuration constants
export const PAGINATION = {
	MAX_POSTS_HOME: 3,
	MAX_NOTES_HOME: 3,
	POSTS_PER_PAGE: 10,
} as const;

export const ANIMATION = {
	INTERSECTION_THRESHOLD: 0.1,
	TRANSITION_DURATION: 600,
	HOVER_TRANSLATE_X: 0.5,
	HOVER_TRANSLATE_Y: -0.5,
} as const;

export const CONTENT_LIMITS = {
	TITLE_MAX_LENGTH: 40,
	DESCRIPTION_MAX_LENGTH: 160,
	EXCERPT_MAX_LENGTH: 200,
} as const;

export const CACHE_DURATIONS = {
	STATIC_ASSETS: "1y",
	DYNAMIC_CONTENT: "1h",
	RSS_FEED: "30m",
} as const;

export const BREAKPOINTS = {
	SM: "640px",
	MD: "768px",
	LG: "1024px",
	XL: "1280px",
} as const;

// NOTE: Date formatting is configured in src/site.config.ts
// Use siteConfig.date.options for the default format
// Or pass custom Intl.DateTimeFormatOptions to getFormattedDate()

export const SOCIAL_PLATFORMS = {
	GITHUB: "github",
	TWITTER: "twitter",
	LINKEDIN: "linkedin",
	EMAIL: "email",
} as const;

export const THEME_MODES = {
	LIGHT: "light",
	DARK: "dark",
	SYSTEM: "system",
} as const;
