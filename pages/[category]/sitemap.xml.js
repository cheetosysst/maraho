import config from "../../config";
import fs from "fs";
import path from "path";

/**
 * Generates sitemap index 
 * @param {*} posts list of sub indexs
 * @returns sitemap xml
 */
function generateSiteMap(posts, category) {
	return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${posts
		.map((id) => {
			return `
	<url>
		<loc>${`${config.url}/${category}/${id}`}</loc>
	</url>`;})
		.join("")}
</urlset>
 `;
}

/**
 * Mount point, required.
 */
function SiteMap() {}

export async function getServerSideProps({ res, params }) {
	console.log(params);
	const articles = fs
		.readdirSync(path.join(process.cwd(), "content", params.category))
		.filter((e) => e !== "category.json");

	res.setHeader("Content-Type", "text/xml");
	res.write(generateSiteMap(articles, params.category));
	res.end();

	return {
		props: {},
	};
}

export default SiteMap;
