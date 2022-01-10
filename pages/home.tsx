import Script from "next/script";
import useSWR from "swr";
import { fetcher } from "../lib/fetch";
const Home = () => {
	const { data, error } = useSWR("/api/user", fetcher);
	return (
		<>
			<Script type="module" src="/main.mjs" />
			<Script noModule={false} />
			<div>home</div>
		</>
	);
};

export default Home;
