import fs from "fs";
import path from "path";
import config from "../config";

const articles = article();

function sitemap() {
	const entries = articles.map(
		(item) => `\t<url>
		<loc>${item.path}</loc>
		<lastmod>${item.date.mtime.toISOString()}</lastmod>
		<changefreq>monthly</changefreq>
		<priority>1</priority>
	</url>`
	);
	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join("\n")}
</urlset>
	`;
	fs.writeFileSync("public/sitemap.xml", sitemap);
}

function rss() {
	const date = new Date();
	const ufcDate = getUFCDate(date);
	const entries = articles.map(
		(item) => `\t\t<item>
			<title>${item.title}</title>
			<link>${item.path}</link>
			<description>${item.description}</description>
			<guid>${item.path}</guid>
			<pubDate>${getUFCDate(item.date.birthtime)}</pubDate>
			<source>${config.url+"/index.xml"}</source>
		</item>`
	);

	const sitemap = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
	<channel>
		<title>${config.meta.name}</title>
		<description>${config.meta.description}</description>
		<link>${config.url}</link>
		<copyright>${date.getFullYear()} ${
		config.author.name
	} All rights reserved</copyright>
		<lastBuildDate>${ufcDate}</lastBuildDate>
		<pubDate>${ufcDate}</pubDate>
		<ttl>1800</ttl>
${entries.join("\n")}
	</channel>
</rss>
`;
	fs.writeFileSync("public/index.xml", sitemap);
}

function getUFCDate(date) {
	const months = {
		Jan: "January",
		Feb: "February",
		Mar: "March",
		Apr: "April",
		May: "May",
		Jun: "June",
		Jul: "July",
		Aug: "August",
		Sep: "September",
		Oct: "October",
		Nov: "November",
		Dec: "December",
	};

	const weekDay = date.toString().match(/Mon|Tue|Wed|Thu|Fri|Sat|Sun/)[0];
	const day = date.toString().match(/[0-9]{1,2}/)[0];
	const month =
		months[
			date
				.toString()
				.match(/Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec/)[0]
		];
	const year = date.toString().match(/[0-9]{4}/)[0];
	const time = date.toString().match(/[0-9]{2}:[0-9]{2}:[0-9]{2}/)[0];
	const timezone = date.toString().match(/[+-][0-9]{4}/)[0];
	return `${weekDay}, ${day} ${month} ${year} ${time} ${timezone}`;
}

function article() {
	return [
		...new Set(
			[].concat(
				...fs
					.readdirSync("content")
					.filter((item) => item.slice(-3) !== ".md")
					.map((item) =>
						fs
							.readdirSync(path.join("content", item))
							.filter((file) => file.slice(-5) !== ".json")
							.map((file) => {
								const data = JSON.parse(
									fs.readFileSync(
										path.join(
											"content",
											item,
											file,
											"article.json"
										)
									)
								);
								return {
									date: fs.statSync(
										path.join(
											"content",
											item,
											file,
											"index.md"
										),
										(err, stat) => {}
									),
									path:
										config.url +
										"/" +
										path.join(
											encodeURIComponent(item),
											encodeURIComponent(file)
										),
									...data,
								};
							})
					)
			)
		),
	];
}

export { sitemap, rss };
