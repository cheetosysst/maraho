import Head from "next/head";
import Image from "next/image";
import config from "../../config";
import Layout from "../../components/main.layout";
import fs from "fs";
import path from "path";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Category({ id, articles, category }) {
	const [articleCards, setArticleCards] = useState([]);

	useEffect(() => {
		let tempList = [];
		for (let i = 0; i < articles.length; i++) {
			let tagList = [];
			let time = new Date(articles[i].timestamp);
			for (let j = 0; j < articles[i].tags.length; j++) {
				tagList.push(
					<div
						key={
							"tag-" +
							articles[i].path +
							"-" +
							articles[i].tags[j]
						}
						className="badge badge-primary mr-1 p-3 group-hover:bg-base-100 border-none group-hover:text-base-content select-none"
					>
						#{articles[i].tags[j]}
					</div>
				);
			}
			tempList.push(
				<Link href={"/" + id + "/" + articles[i].path}>
					<div
						key={"articles-" + i}
						className={`group ${
							i % 2 ? "bg-neutral-focus" : ""
						} hover:bg-primary hover:text-primary-content duration-300 p-5 cursor-pointer`}
					>
						<div className="flex justify-between">
							<div className="text-2xl">{articles[i].title}</div>
							{time.toLocaleDateString("zh-TW")}
						</div>
						<div className="flex justify-start mt-2">{tagList}</div>
					</div>
				</Link>
			);
		}
		setArticleCards(tempList);
	}, [articles, id]);

	return (
		<>
			<Head>
				<title>{category.name + " | " + config.name}</title>
			</Head>
			<Layout>
				<main>
					<div className="container w-9/12 mx-auto my-4 rounded-xl pt-10 pb-4 select-none">
						<h2 className="text-4xl text-primary">
							{category.name}
						</h2>
						<p>{category.description}</p>
					</div>
					<div className="container w-9/12 mx-auto bg-neutral rounded-xl shadow-xl hover:shadow-2xl duration-300 transition-all overflow-hidden">
						{articleCards}
					</div>
				</main>
			</Layout>
		</>
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
	const categories = fs.readdirSync(path.join(process.cwd(), "content"));
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

	let articleData = [];
	articles = articles.filter((item) => {
		return item !== "category.json";
	});
	for (let i = 0; i < articles.length; i++) {
		let articleJson = fs.readFileSync(
			path.join(
				process.cwd(),
				"content",
				params.category,
				articles[i],
				"article.json"
			)
		);
		let articleJsonParsed = JSON.parse(articleJson.toString());
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
