import config from "../config";
import Link from "next/link";

export default function Navbar() {
	return (
		<div className="container mx-auto">
			<div className="navbar flex md:justify-between mt-3">
				<div className="flex-none md:hidden">
					<div className="dropdown">
						<label tabIndex={0} className="btn btn-ghost m-1">
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
						<ul
							tabIndex={0}
							className="dropdown-content z-[1] menu bg-neutral-800 py-3 rounded-box w-52"
						>
							{config.navbar.list.map((item, index) => (
								<li
									className="uppercase"
									key={"NavbarLinks" + index}
								>
									<Link href={"/" + item}>{item}</Link>
								</li>
							))}
						</ul>
					</div>
				</div>

				<div className="btn btn-ghost text-xl uppercase tracking-wide">
					<Link href={"/"}>{config.name}</Link>
				</div>
				<div className="flex-none gap-1 md:inline hidden">
					{config.navbar.list.map((item, index) => (
						<li
							className="btn btn-ghost font-medium uppercase"
							key={"NavbarLinks" + index}
						>
							<Link href={"/" + item}>{item}</Link>
						</li>
					))}
				</div>
			</div>
		</div>
	);
}
