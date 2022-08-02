import config from "../config";
import fs from "fs";
import path from "path";

/**
 * Generates sitemap index
 * @param {*} posts list of sub indexs
 * @returns sitemap xml
 */
function generateSiteMapIndex(posts) {
	return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${posts
		.map((id) => {
			return `
	<sitemap>
		<loc>${`${config.url}/${id}/sitemap.xml`}</loc>
	</sitemap>`;
		})
		.join("")}
</sitemapindex>
 `;
}

/**
 * Mount point, required.
 */
function SiteMap() {}

export async function getServerSideProps({ res }) {
	const articles = fs
		.readdirSync(path.join(process.cwd(), "content"))
		.filter((e) => e !== "index.md");

	res.setHeader("Content-Type", "text/xml");
	res.write(generateSiteMapIndex(articles));
	res.end();

	return {
		props: {},
	};
}

export default SiteMap;
