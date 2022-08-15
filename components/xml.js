import fs from "fs";

function sitemap(articles) {
	const entries = articles.map(
		(item) => `\t<url>
		<loc>${item.path}</loc>
		<lastmod>${item.date.toISOString()}</lastmod>
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

function rss() {}

export { sitemap, rss };
