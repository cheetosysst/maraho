import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import config from "../config";

export default function Home() {
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
        Proident commodo reprehenderit velit qui duis. Magna nostrud id irure aliqua aute cupidatat officia enim ipsum duis. Fugiat Lorem nostrud ea fugiat ex sint elit. Adipisicing ullamco cillum ex eiusmod veniam cillum nostrud labore quis voluptate.
      </main>

			<footer></footer>
		</>
	);
}
