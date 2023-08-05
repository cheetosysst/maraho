import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import Link from "next/link";

export default function Markdown(markdown) {
	return (
		<ReactMarkdown
			remarkPlugins={[remarkGfm]}
			rehypePlugins={[rehypeRaw]}
			components={{
				h1({ node, inline, className, children, ...props }) {
					return (
						<h1
							className={`xl:text-5xl text-4xl mb-4 border-b-2 pb-4 text-primary border-base-content/10 ${
								className !== undefined ? className : ""
							}`}
							{...props}
						>
							{children}
						</h1>
					);
				},
				h2({ node, inline, className, children, ...props }) {
					return (
						<h2
							className={`text-4xl mt-12 mb-4 border-b-2 pb-2 border-base-content/10 ${
								className !== undefined ? className : ""
							}`}
							{...props}
						>
							{children}
						</h2>
					);
				},
				h3({ node, inline, className, children, ...props }) {
					return (
						<h3
							className={`text-3xl mt-8 mb-4 ${
								className !== undefined ? className : ""
							}`}
							{...props}
						>
							{children}
						</h3>
					);
				},
				h4({ node, inline, className, children, ...props }) {
					return (
						<h4
							className={`text-2xl mt-8 mb-4 ${
								className !== undefined ? className : ""
							}`}
							{...props}
						>
							{children}
						</h4>
					);
				},
				h5({ node, inline, className, children, ...props }) {
					return (
						<h5
							className={`text-xl mt-8 mb-4 ${
								className !== undefined ? className : ""
							}`}
							{...props}
						>
							{children}
						</h5>
					);
				},
				p({ node, inline, className, children, ...props }) {
					return (
						<p
							className={`my-5 text-lg font-light ${
								className !== undefined ? className : ""
							}`}
							{...props}
						>
							{children}
						</p>
					);
				},
				ul({ node, inline, className, children, ...props }) {
					// TODO I prefer using list-inside class from tailwind, but it breaks in when the li contains <p>.
					const { ordered, depth } = props;
					if (className === "contains-task-list")
						return (
							<ul
								className={`list px-${
									Number.parseInt(props.depth) * 4
								} ${className !== undefined ? className : ""}${
									Number.parseInt(props.depth)
										? ""
										: " [&>*]:pb-2"
								}`}
								ordered={ordered.toString()}
								depth={depth.toString()}
							>
								{children}
							</ul>
						);
					return (
						// TODO I prefer using list-inside class from tailwind, but it breaks in when the li contains <p>.
						<ul
							className={`list list-disc list-inside mb-4 pl-${
								Number.parseInt(props.depth) * 4
							} ${className !== undefined ? className : ""} ${
								Number.parseInt(props.depth) ? "" : "[&>*]:pb-2"
							}`}
							ordered={props.ordered.toString()}
						>
							{children}
						</ul>
					);
				},
				ol({ node, inline, className, children, ...props }) {
					return (
						<ol
							className={`list-decimal list-inside list mb-4 ml-${
								Number.parseInt(props.depth) * 4
							} ${className !== undefined ? className : ""} ${
								Number.parseInt(props.depth) ? "" : "[&>*]:pb-2"
							}`}
							ordered={props.ordered.toString()}
						>
							{children}
						</ol>
					);
				},
				li({ node, inline, className, children, ...props }) {
					return (
						<li
							className={`${
								className !== undefined ? className : ""
							}`}
							ordered={props.ordered.toString()}
						>
							{children}
						</li>
					);
				},
				a({ node, inline, className, children, href, ...props }) {
					return (
						<Link
							href={href}
							className={`text-primary hover:text-primary-focus hover:shadow-sm transition-all duration-100 px-${
								Number.parseInt(props.depth) * 4
							} ${className !== undefined ? className : ""}`}
							{...props}
						>
							{children[0]}
						</Link>
					);
				},
				code({ node, inline, className, children, ...props }) {
					const match = /language-(\w+)/.exec(className || "");

					if (inline)
						return (
							<code className="bg-white/5 text-base-content text-[0.9em] transition-all py-0.5 px-1 rounded-md font-mono">
								{String(children).replace(/\n$/, "")}
							</code>
						);

					return !inline && match ? (
						<SyntaxHighlighter
							style={a11yDark}
							language={match == null ? "text" : match[1]}
							PreTag="div"
							className="shadow-md hover:shadow-lg transition-all rounded-xl"
							wrapLines={true}
							{...props}
						>
							{String(children).replace(/\n$/, "")}
						</SyntaxHighlighter>
					) : (
						<SyntaxHighlighter
							style={a11yDark}
							language="text"
							className={`shadow-md hover:shadow-lg transition-all rounded-xl`}
							wrapLines={true}
							{...props}
						>
							{String(children).replace(/\n$/, "")}
						</SyntaxHighlighter>
					);
				},
				hr({ node, inline, className, children, ...props }) {
					return <div className="divider"></div>;
				},
				table({ node, inline, className, children, ...props }) {
					return (
						<div className="table-fixed table-zebra rounded-md border-2 m-[-1px] border-base-content/10 overflow-x-scroll mb-4">
							<table
								className={`table w-full ${
									className === undefined ? "" : className
								}`}
								{...props}
							>
								{children}
							</table>
						</div>
					);
				},
				thead({ node, inline, className, children, ...props }) {
					return (
						<thead
							className={`${
								className === undefined ? "" : className
							}`}
							{...props}
						>
							{children}
						</thead>
					);
				},
				tr({ node, inline, className, children, ...props }) {
					return (
						<tr
							className={`${
								className === undefined ? "" : className
							}`}
							// No props here, "the isHeader" prop is rejected by React.
						>
							{children}
						</tr>
					);
				},
				th({ node, inline, className, children, ...props }) {
					return (
						<th
							className={`${
								className === undefined ? "" : className
							}`}
						>
							{children}
						</th>
					);
				},
				td({ node, inline, className, children, ...props }) {
					return (
						<td
							className={`${
								className === undefined ? "" : className
							} ${props.isHeader ? "isheader" : ""}`}
						>
							{children}
						</td>
					);
				},
				input({ node, inline, className, children, ...props }) {
					const { checked } = props;
					return (
						<input
							className={`checkbox checkbox-sm cursor-default select-none ${
								className === undefined ? "" : className
							}`}
							type="checkbox"
							defaultChecked={checked}
							disabled={false}
						>
							{children}
						</input>
					);
				},
				blockquote({ node, inline, className, children, ...props }) {
					return (
						<blockquote
							className={`border-l-4 border-l-base-content/10 pl-4 ${
								className === undefined ? "" : className
							}`}
							{...props}
						>
							{children}
						</blockquote>
					);
				},
			}}
		>
			{markdown.markdown}
		</ReactMarkdown>
	);
}
