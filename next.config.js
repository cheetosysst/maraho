/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		loader: "custom",
		loaderFile: "./libs/loader.js",
	},
};

module.exports = nextConfig;
