import Router from "next/router";

function PaginateButton({ text, action, active }) {
	return (
		<button
			className={`btn bg-white/5 hover:bg-white/10 border-0 ${
				active ? "bg-white/10" : ""
			}`}
			onClick={action}
		>
			{text}
		</button>
	);
}

function PaginateItem({ page, active, path }) {
	const paginate = () => {
		Router.push({
			pathname: "/" + path,
			query: { page: page },
		});
	};

	return <PaginateButton text={page} active={active} action={paginate} />;
}

export default function Paginate({ start, end, active, path }) {
	const positionStart = active - 4 < start ? start : active - 4;
	const positionEnd = active + 4 > end ? end + 1 : active + 5;
	let items = [];

	for (let i = positionStart; i < positionEnd; i++) {
		items.push(
			<PaginateItem
				key={"paginate-" + i}
				page={i}
				active={active === i}
				path={path}
			/>
		);
	}

	const paginateBack = () => {
		if (active <= 1) return;
		Router.push({
			pathname: "/" + path,
			query: { page: active - 1 },
		});
	};

	const paginateForward = () => {
		if (active >= end) return;
		Router.push({
			pathname: "/" + path,
			query: { page: active + 1 },
		});
	};

	return (
		<div className="btn-group flex justify-center mt-4">
			<PaginateButton text={"<"} path={path} action={paginateBack} />
			{items}
			<PaginateButton text={">"} path={path} action={paginateForward} />
		</div>
	);
}
