import Head from "next/head";
import config from "../config";
import Layout from "../components/main.layout";
import fs from "fs";
import path from "path";
import Link from "next/link";

export default function Home({ category }) {
	return (
		<>
			<Head>
				<title>{config.name}</title>
				<meta
					name={config.meta.name}
					content={config.meta.description}
				/>
			</Head>

			<main>
				<Layout>
					<h1 className="text-3xl font-bold underline">
						Hello world!
					</h1>
					Proident commodo reprehenderit velit qui duis. Magna nostrud
					id irure aliqua aute cupidatat officia enim ipsum duis.
					Fugiat Lorem nostrud ea fugiat ex sint elit. Adipisicing
					ullamco cillum ex eiusmod veniam cillum nostrud labore quis
					voluptate.
					<div className="p-6 group hover:p-7 transition-all max-w-sm mx-auto bg-white rounded-xl hover:bg-slate-800 shadow-lg flex items-center space-x-4">
						<div>
							<div className="text-xl group-hover:text-fuchsia-400 duration-700 ease-in-and-out transition-all font-medium text-black">
								ChitChat
							</div>
							<p className="text-slate-500">
								You have a new message!
							</p>
							<button className="inline-block cursor-pointer rounded-md bg-primary px-4 py-3 text-center text-sm font-semibold uppercase text-base-300 transition duration-200 ease-in-out hover:bg-secondary">
							<Link href={"/docs"}>
								to
								Button
							</Link>
							</button>
						</div>
					</div>
					<footer></footer>
				</Layout>
			</main>
		</>
	);
}

export function getStaticProps() {
	const category = fs.readdirSync(path.join(process.cwd(), "content"));

	return {
		props: {
			category,
		},
	};
}
