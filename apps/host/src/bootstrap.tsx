import React from "react";
import { WrapModuleFederation } from "custom-components";
import loadable from "@loadable/component";

const App = loadable(() => import("./App"));
try {
	(async () => {
		await WrapModuleFederation({
			children: <App />,
		});
	})();
} catch (e) {
	// todo error
}
