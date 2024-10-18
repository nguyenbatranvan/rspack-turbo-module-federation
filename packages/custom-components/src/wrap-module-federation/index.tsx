import { ReactNode } from "react";
import { fetcherJSON } from "utils";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

interface IProps {
	urlConfigRemote?: string;
	urlMdf?: string;
	children: ReactNode;
	id?: string;
}

declare global {
	var __ICONDO__REMOTES: any;
}

export const WrapModuleFederation = async (props: IProps) => {
	const { urlMdf = "/assets/mdf-url.json", id = "root", children } = props;
	const mdfUrl = await fetcherJSON(urlMdf);
	window.__ICONDO__REMOTES = mdfUrl;
	const root = ReactDOM.createRoot(document.getElementById(id)!);
	root.render(<BrowserRouter>{children}</BrowserRouter>);
};
