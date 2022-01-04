// https://postcss.org/ 基于javascript的css转译器
// - Increase code readability
// - Use tomorrow’s CSS today
// - The end of global CSS
// - Avoid errors in your CSS
// https://github.com/postcss/postcss/blob/main/docs/README-cn.md

module.exports = {
	plugins: [
		"tailwindcss",
		"autoprefixer",
		[
			"postcss-preset-env", // allows you to use future CSS features today.
			{
				autoprefixer: {
					// Does Autoprefixer polyfill Grid Layout for IE?
					flexbox: "no-2009",
				},
				stage: 3,
				features: {
					"custom-properties": false,
				},
			},
		],
		...(process.env.NODE_ENV === "production" ? ["cssnano"] : []), // https://www.cssnano.cn/docs/introduction/
		"postcss-fail-on-warn", // n some situations it might be helpful to fail the build on any warning from PostCSS or one of its plugins. This guarantees that no warnings go unnoticed, and helps to avoid bugs
		// "stylefmt",
		// "stylelint",
	],
};
