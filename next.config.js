/** @type {import('next').NextConfig} */
const path = require("path");
const {withSentryConfig} = require('@sentry/nextjs');
const {PHASE_DEVELOPMENT_SERVER} = require('next/constants');

const moduleExports = (phase, {defaultConfig}) => {
	const nextConfig = {
		webpack5: true,
		reactStrictMode: true,
		sassOptions: {
			includePaths: [path.join(__dirname, "styles")], //https://nextjs.org/docs/basic-features/built-in-css-support#sass-support
		},
		sentry: {
			disableServerWebpackPlugin: process.env.ENV_NAME === 'online', // 设定仅在生产环境上线打包时构建source map 上传
			disableClientWebpackPlugin: process.env.ENV_NAME === 'online',
		},
		i18n: {
			localeDetection: true,
			locales: ['en-US', 'fr', 'nl-NL'],
			defaultLocale: 'en-US',
			domains: [
				{
					domain: 'dev-next.com',
					defaultLocale: 'en-US',
				},
				{
					domain: 'dev-next.nl',
					defaultLocale: 'nl-NL',
				},
				{
					domain: 'dev-next.fr',
					defaultLocale: 'fr',
					// an optional http field can also be used to test
					// locale domains locally with http instead of https
					http: true,
				},
			],
		}
	}
	/**
	 * @type {import('next').NextConfig}
	 */
	if (phase === PHASE_DEVELOPMENT_SERVER) {
		return {
			...defaultConfig,
			...nextConfig
			/* development only config options here */
		}
	}

	return {
		...defaultConfig,
		...nextConfig
	}
}


const sentryWebpackPluginOptions = {
	release: process.env.ENV_NAME || 'development',
	include: './pages',
	ignore: ['node_modules'],
	environment: process.env.ENV_NAME || 'development',
	configFile: path.join(__dirname, './sentry.properties'),
	dryRun: process.env.NODE_ENV === 'development',
	silent: process.env.NODE_ENV === 'development',
	debug: false,
}

module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions)


