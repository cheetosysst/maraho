import Head from "next/head";
import Link from "next/link";
import Layout from "../components/main.layout";
import config from "../config";

function Error({ statusCode }) {
	return (
		<Layout>
			<Head>
				<title>
					{`${config.name} - ${statusCode ? statusCode : "Error"}`}
				</title>
			</Head>
			<div className="container mx-auto pt-10">
				<p className="flex text-7xl font-light justify-center">
					{statusCode ? statusCode : ""}
				</p>
				<p className="flex justify-center text-3xl mt-5 font-light">
					An error has occurred.
				</p>
				<p className="flex justify-center">
					<Link href={"/"} className="btn btn-primary mt-5" passHref>
						Home
					</Link>
				</p>
			</div>
		</Layout>
	);
}

Error.getInitialProps = ({ res, err }) => {
	const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
	return { statusCode };
};

export default Error;
