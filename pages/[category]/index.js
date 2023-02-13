import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import config from "../../config";
import Layout from "../../components/main.layout";
import fs from "fs";
import path from "path";
import Paginate from "../../components/paginate.component";
import MetaTags from "../../components/meta.component";
import Container from "../../components/container.component";

export default function Category({ id, articles, category }) {
	const [articleCards, setArticleCards] = useState([]);
	const [page, setPage] = useState(1);
	const { query } = useRouter();

	useEffect(() => {
		if (query.page === undefined) return;
		setPage(Number(query.page));
	}, [query.page]);

	useEffect(() => {
		const articleCards = [];
		for (
			let i = 0 + (page - 1) * 10;
			i < articles.length + (page - 1) * 10;
			i++
		) {
			if (articles[i] === undefined) break;
			const time = new Date(articles[i].timestamp);
			const tagList = articles[i].tags.map((data) => (
				<div key={`tag-${articles[i].path}-${data}`} className="mr-2">
					#{data}
				</div>
			));

			articleCards.push(
				<ArticleCard
					href={`/${id}/${articles[i].path}`}
					title={articles[i].title}
					tags={tagList}
					time={time}
					key={"articles-" + i}
				/>
			);
		}
		setArticleCards(articleCards);
	}, [articles, id, page]);

	return (
		<>
			<Head>
				<title>{`${category.name} - ${config.name}`}</title>
				<meta name="robots" content="noindex,nofollow" />
				<MetaTags
					title={`${category.name} - ${config.name}`}
					url={`${config.url}/`}
					description={`${category.description}`}
					name={`${category.name} - ${config.name}`}
					image={`${config.url}/${config.meta.image}`}
				/>
			</Head>
			<Layout>
				<main>
					<Container className="my-4 pt-10 pb-4 select-none">
						<h2 className="text-4xl">{category.name}</h2>
						<p>{category.description}</p>
					</Container>
					<Container>{articleCards}</Container>
					<Paginate
						start={1}
						end={articles.length / 10}
						active={page}
						path={id}
					/>
				</main>
			</Layout>
		</>
	);
}

function ArticleCard({ href, title, tags, time, className, ...props }) {
	return (
		<Link href={href}>
			<div
				className={`group rounded-md mb-5 bg-white/5 hover:bg-white/10 duration-300 p-5 cursor-pointer ${className}`}
				{...props}
			>
				<div className="flex justify-between">
					<div className="grid">
						<div className="col-12 md:col-6 md:text-2xl text-xl mr-5">
							{title}
						</div>
						<div className="flex flex-nowrap md:w-auto w-10 justify-start mt-2">
							{tags}
						</div>
					</div>
					{time.toLocaleDateString("zh-TW")}
				</div>
			</div>
		</Link>
	);
}

export function getCategories(categories) {
	return categories.map((category) => {
		return {
			params: {
				category,
			},
		};
	});
}

export async function getStaticPaths() {
	const categories = fs
		.readdirSync(path.join(process.cwd(), "content"))
		.filter((path) => !path.includes("index.md"));
	const paths = getCategories(categories);
	return {
		paths,
		fallback: false,
	};
}

export async function getStaticProps({ params }) {
	let articles = fs.readdirSync(
		path.join(process.cwd(), "content", params.category)
	);

	const categoryDataRaw = fs.readFileSync(
		path.join(process.cwd(), "content", params.category, "category.json")
	);
	const categoryData = JSON.parse(categoryDataRaw.toString());

	articles = articles.filter((item) => {
		return item !== "category.json";
	});

	const articleData = [];
	for (let i = 0; i < articles.length; i++) {
		const articleJson = fs.readFileSync(
			path.join(
				process.cwd(),
				"content",
				params.category,
				articles[i],
				"article.json"
			)
		);
		const articleJsonParsed = JSON.parse(articleJson.toString());
		articleJsonParsed["path"] = articles[i];
		articleData.push(articleJsonParsed);
	}

	articleData.sort((a, b) => {
		return -(Date.parse(a.timestamp) - Date.parse(b.timestamp));
	});

	return {
		props: {
			id: params.category,
			articles: articleData,
			category: categoryData,
		},
	};
}
