import JetBrainsMonoBold from "@/assets/JetBrainsMono-Bold.ttf";
import JetBrainsMono from "@/assets/JetBrainsMono-Regular.ttf";
import { getAllPosts } from "@/data/post";
import { siteConfig } from "@/site.config";
import { getFormattedDate } from "@/utils/date";
import { Resvg } from "@resvg/resvg-js";
import Logo from "@/components/bits/Logo.astro";
import type { APIContext, InferGetStaticPropsType } from "astro";
import satori, { type SatoriOptions } from "satori";
import { html } from "satori-html";

const ogOptions: SatoriOptions = {
	// debug: true,
	fonts: [
		{
			data: Buffer.from(JetBrainsMono),
			name: "JetBrains Mono",
			style: "normal",
			weight: 400,
		},
		{
			data: Buffer.from(JetBrainsMonoBold),
			name: "JetBrains Mono",
			style: "normal",
			weight: 700,
		},
	],
	height: 630,
	width: 1200,
};

const markup = (title: string, pubDate: string) =>
	html`<div tw="flex flex-col w-full h-full bg-[#11111b] text-[#f9e2af]">
		<div tw="flex flex-col flex-1 w-full p-15 justify-center">
			<p tw="text-4xl text-[#a6e3a1] mb-6">${pubDate}</p>
			<h1 tw="text-6xl font-bold leading-snug text-[#89b4fa]">${title}</h1>
		</div>
		<div tw="flex items-center justify-between w-full p-15 border-t-4 border-[#f9e2af] text-xl">
			<div tw="flex items-center">
        <svg xml:space="preserve" height="80" fill="#f9e2af" viewBox="0 0 1000 1000">
          <path
            d="M281.26 136.2c13.208-4.122 48.8-8.99 54.8-8.71 10.31.29 20.68-.64 30.93.79 6.13.63 26.56 5.34 30.28 7.87-4.31.19-16.516.2-20.428.48-8.321.597-13.166.887-21.342 2.89-14.04 3.44-27.99 7.57-41.1 13.74-14.97 7.19-28.85 16.79-40.37 28.78-9.22 10.26-18 21.31-22.83 34.39-3.91 7.89-4.9 16.67-6.72 25.17-1.57 6.69-1.06 13.64-.87 20.45.92 6.29 2.32 12.5 3.6 18.73 4.66 17.03 15.6 31.77 28.97 43.05 9.13 7.46 19.02 13.96 29.44 19.46 18.83 9.25 38.05 17.67 57.35 25.89 14.07 6.82 28.9 13.45 39.57 25.28 8.85 9.01 12.74 22.14 11.71 34.59-1.96 13.85-9.59 27.11-21.32 34.91-9.77 5.96-20.79 10.23-32.34 10.52-13.56-.02-27.35.94-40.6-2.63-22.15-6.47-43.19-16.32-63.18-27.77-7.77-5.16-15.48-10.42-23.02-15.9-20.03-16.38-38.06-35.74-50.32-58.69-5.61-10.24-10.33-21.02-13.62-32.23-2.4-10.88-6.22-21.57-6.35-32.83-.06-9.38-.02-18.76-.03-28.15-.14-8.08 2.21-15.9 4.1-23.68 3.22-16.16 10.55-31.16 18.79-45.31 4.79-7.95 10.51-15.32 16.73-22.2 8.89-9.52 18.33-18.67 29.34-25.73 14.84-10.37 31.59-17.78 48.83-23.16Z"
            transform="matrix(2.3664 0 0 2.3664 -380.375 -290.43)"></path><path
            d="M367.89 195.91c6.77-2.37 14.02-2.31 21.05-3.26 7.71-.77 15.34.89 23.03 1.13 10.02.65 19.27 4.7 28.74 7.65 20.15 7.58 39.51 17.36 57.27 29.54 15.22 9.7 28.48 22.18 40.42 35.65 9.8 10.95 17.5 23.58 24.54 36.43 5.09 10.13 9.26 20.76 12.36 31.66 1.34 8.46 3.59 16.74 5.08 25.17.33 11.43.24 22.9.05 34.34-1.18 8.44-3.5 16.69-5.07 25.06-4.95 18.18-13.78 35.14-24.52 50.54-6.74 9.77-15.3 18.05-23.88 26.17-18.15 16.67-40.66 27.94-64.13 35.03-9.56 3.81-19.98 4.15-29.8 7-7.83 2.35-16.05.85-24.01 2.19-11.7 1.28-23.31-1.13-34.99-.7-5.33-.04-24.19-5.76-28.24-7.92 7.63-1.9 15.54-.45 23.24-1.76 6.4-.42 12.8-.92 19.18-1.64 5.95-.89 13.049-2.52 18.879-3.91 9.3-2.22 16.541-6.88 25.111-11.04 13.4-6.52 25.45-15.57 36.24-25.81 8.7-9.2 16.87-19.19 22.08-30.83 3.64-8.26 7.47-16.67 8.22-25.79.74-8.55 2.74-17.18 1.17-25.75-1.41-8.31-1.54-16.99-5.19-24.75-4.65-12.25-12.28-23.25-21.74-32.27-13.35-11.57-28.25-21.42-44.45-28.54-22.62-11.51-46.86-19.6-68.96-32.17-5.49-3.32-10.55-7.3-15.39-11.51-5.86-5.18-10.07-12.05-12.54-19.43-1.71-4.92-1.09-10.19-1.22-15.3-.79-11.81 5.45-22.98 13.44-31.24 6.43-6.94 15.31-10.75 24.03-13.94Z"
            transform="matrix(2.3664 0 0 2.3664 -380.375 -290.43)"></path>
        </svg>
        <p tw="ml-10 text-4xl font-semibold">${siteConfig.title}</p>
			</div>
			<p tw="text-[#fab387] text-4xl">by ${siteConfig.author}</p>
		</div>
	</div>`;

type Props = InferGetStaticPropsType<typeof getStaticPaths>;

export async function GET(context: APIContext) {
	const { pubDate, title } = context.props as Props;

	const postDate = getFormattedDate(pubDate, {
		month: "long",
		weekday: "long",
	});
	const svg = await satori(markup(title, postDate), ogOptions);
	const png = new Resvg(svg).render().asPng();
	return new Response(png, {
		headers: {
			"Cache-Control": "public, max-age=31536000, immutable",
			"Content-Type": "image/png",
		},
	});
}

export async function getStaticPaths() {
	const posts = await getAllPosts();
	return posts
		.filter(({ data }) => !data.ogImage)
		.map((post) => ({
			params: { slug: post.id },
			props: {
				pubDate: post.data.updatedDate ?? post.data.publishDate,
				title: post.data.title,
			},
		}));
}
