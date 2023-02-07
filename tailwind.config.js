module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		colors: {
			tag: "#39BAE6",
			func: "#FFB454",
			entity: "#59C2FF",
			string: "#AAD94C",
			regexp: "#95E6CB",
			markup: "#F07178",
			keyword: "#FF8F40",
			special: "#E6B673",
			comment: "#ACB6BF8C",
			constant: "#D2A6FF",
			operator: "#F29668",
		},
		container: {
			padding: {
				DEFAULT: "1rem",
				sm: "2rem",
				lg: "4rem",
				xl: "5rem",
				"2xl": "6rem",
			},
		},
		extend: {},
	},
	plugins: [require("daisyui"), require("@tailwindcss/typography")],
	daisyui: {
		themes: ["halloween", "light"],
	},
};
