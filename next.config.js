/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		loader: 'akamai',
		domains: ["avatars.githubusercontent.com"],
	},
};

module.exports = nextConfig;
