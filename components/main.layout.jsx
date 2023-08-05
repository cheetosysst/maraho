import { useState, useEffect } from "react";
import Link from "next/link";
import config from "../config";
import Navbar from "./navbar.component.jsx";

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
			<Navbar />
			<div className="flex flex-row">
				<div className="flex-grow"></div>
				<div className="w-[90%] md:w-[80%] xl:w-[65%]">{children}</div>
				<div className="flex-grow"></div>
			</div>
		</>
	);
}
