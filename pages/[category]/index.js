import Head from "next/head";
import config from "../../config";
import Layout from "../../components/main.layout";
import fs from "fs";
import path from "path";
import { useState, useEffect } from "react";
export default function Category({ id, articles }) {
	return (
		<>
			<Layout>
				<main>
					Category
					<br />
					{articles}
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
