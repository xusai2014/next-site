/** @type {import('next').NextConfig} */
const path = require("path");
module.exports = {
	reactStrictMode: true,
	sassOptions: {
		includePaths: [path.join(__dirname, "styles")], //https://nextjs.org/docs/basic-features/built-in-css-support#sass-support
	},
};
