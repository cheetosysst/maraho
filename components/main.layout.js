import Head from "next/head";
import Image from "next/image";
import config from "../config";
import Navbar from "./navbar.component.js";

export default function Layout({ children }) {

	return (
		<>
			<Head>
				<meta
					name={config.meta.name}
					content={config.meta.description}
				/>
			</Head>
			<Navbar/>
			{children}
		</>
	);
}
