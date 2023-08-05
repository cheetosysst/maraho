import Navbar from "./navbar.component.jsx";

export default function Layout({ children }) {
	return (
		<div className="flex flex-row">
			<div className="flex-grow"></div>
			<div className="w-[90%] md:w-[80%] xl:w-[65%]">
				<Navbar />
				<div className="px-4">{children}</div>
			</div>
			<div className="flex-grow"></div>
		</div>
	);
}
