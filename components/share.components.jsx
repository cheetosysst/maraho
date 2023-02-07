import Link from "next/link";
function ShareButton({ url, name }) {
	return (
		<Link
			href={url}
			className="hover:text-primary transition-all duration-200"
		>
			{name}
		</Link>
	);
}

function TwitterShare({ text, url }) {
	return (
		<ShareButton
			className="align-middle inline-block"
			url={`https://twitter.com/share?text=${encodeURIComponent(
				text
			)}%0A&url=${encodeURI(url)}`}
			name="Twitter"
		/>
	);
}

function FacebookShare({ text, url }) {
	return (
		<ShareButton
			className="align-middle inline-block"
			url={`https://www.facebook.com/sharer.php?u=${encodeURI(
				url
			)}&t=${encodeURIComponent(text)}`}
			name="Facebook"
		/>
	);
}

function RedditShare({ text, url }) {
	return (
		<ShareButton
			className="align-middle inline-block"
			url={`http://www.reddit.com/submit?url=${encodeURI(
				url
			)}&title=${encodeURIComponent(text)}`}
			name="Reddit"
		/>
	);
}

export { TwitterShare, FacebookShare, RedditShare, ShareButton };
