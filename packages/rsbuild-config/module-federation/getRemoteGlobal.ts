import { Remotes } from "./module-fedeation.type";

declare global {
	var __ICONDO__REMOTES: any;
}
export const getGlobalRemotes = () => {
	return window.__ICONDO__REMOTES || [];
};

export const setGlobalRemotes = (data: Remotes) => {
	if (!window.__ICONDO__REMOTES || !window.__ICONDO__REMOTES?.length) {
		window.__ICONDO__REMOTES = data;
	}
	localStorage.setItem(
		"__ICONDO__REMOTES",
		JSON.stringify(window.__ICONDO__REMOTES || data || []),
	);
	// if (!window.__ICONDO__REMOTES || !window.__ICONDO__REMOTES?.length) {
	//     window.__ICONDO__REMOTES = data;
	// }
	// localStorage.setItem("__ICONDO__REMOTES", JSON.stringify(window.__ICONDO__REMOTES || data || []));
};
// const BroadcastLogout = new BroadcastChannel("auth-channel");
// BroadcastLogout.onmessage = () => {
//     setGlobalRemotes(window.__ICONDO__REMOTES);
// };
