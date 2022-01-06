import "../styles/globals.scss";
import type { AppProps, AppInitialProps } from "next/app";
import Script from "next/script";

function MyApp({ Component, pageProps }: AppProps) {
	const { intlMessages = {} }: AppInitialProps & any = pageProps;
	return (
		<>
			<Script
				id={"script-i18n"}
				strategy="beforeInteractive"
			>{`window.__INTL_MESSAGES__ = ${JSON.stringify(
				intlMessages
			)};`}</Script>
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
