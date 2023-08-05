import Head from "next/head";
import Container from "../components/container.component";
import Layout from "../components/main.layout";
import config from "../config";

export default function NotFound() {
	return (
		<Layout>
			<Head>
				<title>{`${config.name} - Not Found`}</title>
			</Head>
			<main>
				<Container className={`flex justify-center`}>
					<h1 className="text-4xl mt-[30%]">404 - Not Found</h1>
				</Container>
			</main>
		</Layout>
	);
}
