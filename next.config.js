/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		loader: 'akaimai',
		domains: ["avatars.githubusercontent.com"],
	},
};

module.exports = nextConfig;
