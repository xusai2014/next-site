// CSS缩减方案，colorMin, ConvertValues, uniqueSelectors(remove duplicate), SVGO, normalizeUnicode ...
// https://www.cssnano.cn/docs/introduction/
// https://www.cssnano.cn/docs/what-are-optimisations/ 默认开启优化
module.exports = {
	preset: [
		"default",
		{
			// 例如可针对定制svg开启特殊参数
			// https://github.com/svg/svgo
			svgo: {
				plugins: [
					{
						removeDoctype: true,
					},
					{
						// svgo 自定义优化插件
						name: "customPluginName",
						type: "perItem", // 'perItem', 'perItemReverse' or 'full'
						params: {
							optionName: "optionValue",
						},
						fn: (ast, params, info) => {},
					},
				],
			},
		},
	],
};
