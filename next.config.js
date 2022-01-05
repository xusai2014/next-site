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
			disableServerWebpackPlugin: false,
			disableClientWebpackPlugin: false,
		},
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
	release: 'development',
	include: './pages',
	ignore: ['node_modules'],
	environment: process.env.ENV_NAME || 'development',
	configFile: path.join(__dirname,'./sentry.properties'),
	dryRun: false,
	silent:false,
	debug: false,
}

module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions)


