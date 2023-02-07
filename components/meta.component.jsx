export default function MetaTags({ title, url, description, name, image }) {
	return (
		<>
			<meta name="description" content={description} />
			<meta property="og:url" content={`${url}`} />
			<meta property="og:type" content="website" />
			<meta property="og:title" content={`${name}`} />
			<meta
				property="og:description"
				content={`${description}`}
			/>
			<meta property="og:image" content={`${image}`} />

			<meta name="twitter:card" content="summary_large_image" />
			<meta property="twitter:domain" content={`${url}`} />
			<meta property="twitter:url" content={`${url}`} />
			<meta name="twitter:title" content={`${name}`} />
			<meta name="twitter:description" content={`${description}`} />
			<meta name="twitter:image" content={`${image}`} />
		</>
	);
}
