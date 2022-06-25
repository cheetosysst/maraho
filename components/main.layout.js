import Head from "next/head";
import config from "../config";

export default function Layout({children}) {
	return (
		<>
			<Head>
				<meta
					name={config.meta.name}
					content={config.meta.description}
				/>
			</Head>
				{children}
			<footer></footer>
		</>
	);
}
