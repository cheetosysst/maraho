/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		loader: 'akamai',
		path: "/",
		domains: ["avatars.githubusercontent.com"],
	},
};

module.exports = nextConfig;
