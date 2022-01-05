import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Script from "next/script";

function MyApp({ Component, pageProps }: AppProps) {
	const { intlMessages = {} }: any = pageProps;
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
