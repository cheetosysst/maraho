import config from "../config";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
	const [links, setLinks] = useState([]);

	useEffect(() => {
		let tempLinks = [];
		for (let i = 0; i < config.navbar.list.length; i++) {
			tempLinks.push(
				<li className="uppercase">
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
			<div className="px-4">
				<div className="navbar bg-base-300 mt-3 rounded-xl shadow">
					<div className="flex-1">
						<div className="btn btn-ghost text-xl uppercase tracking-wide">
							<Link href={"/"}>{config.name}</Link>
						</div>
					</div>
					<div className="flex-none">
						<ul className="menu menu-horizontal p-0">{links}</ul>
					</div>
				</div>
			</div>
		</>
	);
}
