import fs from "fs";
import path from "path";

export default function article() {
	return <>Article page</>;
}

export async function getStaticPaths() {
	const pathCategory = path.join(process.cwd(), "content");
	const categories = fs.readdirSync(pathCategory);

	let paths = [];
	categories.map((category) => {
		const articles = fs.readdirSync(path.join(pathCategory, category));

		articles.map((article) => {
			paths.push({
				params:{
					article,
					category,
				}
			});
		});
	});

	return {
		paths,
		fallback: false,
	};
}

export async function getStaticProps({ params }) {
	const articles = fs.readdirSync(
		path.join(process.cwd(), "content", params.category)
	);

	return {
		props: {
			id: params.category,
			articles,
		},
	};
}
