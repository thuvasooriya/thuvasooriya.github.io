import type { Config } from "tailwindcss";

export default {
	plugins: [require("@tailwindcss/typography")],
	theme: {
		extend: {
			animation: {
				"float-slow": "float 18s ease-in-out infinite",
				"float-medium": "float 12s ease-in-out infinite 1s",
				"float-fast": "float 10s ease-in-out infinite 2s",
			},
			keyframes: {
				float: {
					"0%, 100%": { transform: "translateY(0) translateX(0)" },
					"25%": { transform: "translateY(-10px) translateX(10px)" },
					"50%": { transform: "translateY(10px) translateX(-5px)" },
					"75%": { transform: "translateY(-5px) translateX(-10px)" },
				},
			},
			typography: () => ({
				DEFAULT: {
					css: {
						h1: {
							color: "var(--color-heading-1)",
						},
						h2: {
							color: "var(--color-heading-2)",
						},
						h3: {
							color: "var(--color-heading-3)",
						},
						h4: {
							color: "var(--color-heading-4)",
						},
						h5: {
							color: "var(--color-heading-5)",
						},
						h6: {
							color: "var(--color-heading-6)",
						},
						// FIXME: proper responsive rendering of checkboxes
						'ul > li:has(input[type="checkbox"])': {
							listStyle: "none",
						},
						'ul > li > input[type="checkbox"]:first-child': {
							margin: "0 6px 0 -24px !important",
						},
						a: {
							textUnderlineOffset: "2px",
							"&:hover": {
								"@media (hover: hover)": {
									color: "var(--color-link)",
									textDecorationColor: "var(--color-link)",
									textDecorationThickness: "2px",
								},
							},
						},
						img: {
							borderRadius: "var(--img-border-radius)",
						},
						blockquote: {
							quotes: "none",
							color: "var(--color-blockquote-text)",
							borderLeftWidth: "1",
							borderRadius: "0.25rem",
							borderLeftColor: "var(--color-blockquote-border)",
							background: "var(--color-blockquote-background)",
						},
						code: {
							border: "1px dotted #666",
							borderRadius: "2px",
						},
						kbd: {
							"&:where([data-theme='dark'], [data-theme='dark'] *)": {
								background: "var(--color-global-text)",
							},
						},

						hr: {
							borderTopStyle: "dashed",
						},
						strong: {
							fontWeight: "700",
						},
						sup: {
							marginInlineStart: "calc(var(--spacing) * 0.5)",
							a: {
								"&:after": {
									content: "']'",
								},
								"&:before": {
									content: "'['",
								},
								"&:hover": {
									"@media (hover: hover)": {
										color: "var(--color-link)",
									},
								},
							},
						},
						/* Table */
						// TODO:
						// - [ ] legible rows
						// - [ ] header highlight
						// - [ ] card background
						table: {
							// borderRadius: "0.25rem",
							// border: "1px solid var(--color-heading-6)",
							// background: "#666",
							// borderCollapse: "collapse",
							// borderSpacing: "2",
							// width: "100%",
						},
						"tbody tr": {
							borderBottomWidth: "none",
						},
						// tfoot: {
						// 	borderTop: "1px dashed #666",
						// },
						thead: {
							borderBottomWidth: "none",
						},
						"thead th": {
							color: "var(--color-heading-6)",
							borderBottom: "2px dashed var(--color-heading-6)",
							// fontWeight: "700",
						},
						'th[align="center"], td[align="center"]': {
							"text-align": "center",
						},
						'th[align="right"], td[align="right"]': {
							"text-align": "right",
						},
						'th[align="left"], td[align="left"]': {
							"text-align": "left",
						},
					},
				},
				sm: {
					css: {
						strong: {
							color: "var(--color-variant-8)",
						},
						em: {
							color: "var(--color-variant-9)",
						},
						del: {
							color: "var(--color-gray-500)",
						},

						code: {
							color: "var(--color-variant-5)",
							fontSize: "var(--text-sm)",
							fontWeight: "400",
						},
					},
				},
			}),
		},
	},
} satisfies Config;
