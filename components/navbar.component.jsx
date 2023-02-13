import config from "../config";
import { useState, useEffect } from "react";
import Link from "next/link";
import Container from "./container.component";

export default function Navbar() {
	const [links, setLinks] = useState([]);

	useEffect(() => {
		let tempLinks = [];
		for (let i = 0; i < config.navbar.list.length; i++) {
			tempLinks.push(
				<li className="uppercase" key={"NavbarLinks" + i}>
					<Link href={"/" + config.navbar.list[i]}>
						{config.navbar.list[i]}
					</Link>
				</li>
			);
		}
		setLinks(tempLinks);
	}, []);

	return (
		<Container className="container mx-auto">
			<div className="navbar mt-3">
				<div className="flex-none md:hidden">
					<label
						htmlFor="my-drawer"
						className="btn btn-square btn-ghost rounded-xl shadow drawer-button"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							className="inline-block w-5 h-5 stroke-current"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M4 6h16M4 12h16M4 18h16"
							></path>
						</svg>
					</label>
				</div>

				<div className="flex-1">
					<div className="btn btn-ghost text-xl uppercase tracking-wide">
						<Link href={"/"}>{config.name}</Link>
					</div>
				</div>
				<div className="flex-none md:visible invisible">
					<ul className="menu menu-horizontal p-0">{links}</ul>
				</div>
			</div>
		</Container>
	);
}
