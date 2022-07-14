import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import config from "../config";
import Navbar from "./navbar.component.js";

export default function Layout({ children }) {
	const [links, setLinks] = useState([]);

	useEffect(() => {
		let tempLinks = [];
		for (let i = 0; i < config.navbar.list.length; i++) {
			tempLinks.push(
				<li className="uppercase" key={"SideLinks" + i}>
					<Link href={"/" + config.navbar.list[i]}>
						{config.navbar.list[i]}
					</Link>
				</li>
			);
		}
		setLinks(tempLinks);
	}, []);

	return (
		<>
			<Head>
				<meta
					name={config.meta.name}
					content={config.meta.description}
				/>
			</Head>
			<div className="drawer">
				<input
					id="my-drawer"
					type="checkbox"
					className="drawer-toggle"
				/>
				<div className="drawer-content">
					<Navbar />
					{children}
				</div>
				<div className="drawer-side">
					<label
						htmlFor="my-drawer"
						className="drawer-overlay"
					></label>
					<ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
						<h1 className="text-2xl ml-3 my-3">Category</h1>
						{links}
					</ul>
				</div>
			</div>
		</>
	);
}
