import fs from "fs";
import Head from "next/head";
import path from "path";
import Layout from "../../components/main.layout";
import config from "../../config";
import Markdown from "../../components/markdown.component";

export default function article({ article, markdown }) {
	return (
		<>
			<Layout>
				<Head>
					<title>{article + " | " + config.name}</title>
				</Head>
				<main>
					<div className="container mx-auto py-10 md:px-20 px-5">
						<Markdown markdown={markdown}/>
					</div>
				</main>
			</Layout>
		</>
	);
}

export async function getStaticPaths() {
	const pathCategory = path.join(process.cwd(), "content");
	const categories = fs
		.readdirSync(pathCategory)
		.filter((path) => !path.includes("index.md"));

	let paths = [];
	categories.map((category) => {
		const articles = fs
			.readdirSync(path.join(pathCategory, category))
			.filter((path) => !path.includes("category.json"));
		articles.map((article) => {
			paths.push({
				params: {
					article,
					category,
				},
			});
		});
	});

	return {
		paths,
		fallback: false,
	};
}

export async function getStaticProps({ params }) {
	const article = fs.readFileSync(
		path.join(
			process.cwd(),
			"content",
			params.category,
			params.article,
			"article.json"
		)
	);

	const markdown = fs.readFileSync(
		path.join(
			process.cwd(),
			"content",
			params.category,
			params.article,
			"index.md"
		)
	);

	let data = await JSON.parse(article);

	return {
		props: {
			id: params.category,
			article: params.article,
			data,
			markdown: markdown.toString(),
		},
	};
}
