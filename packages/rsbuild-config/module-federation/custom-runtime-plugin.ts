import { FederationRuntimePlugin } from "@module-federation/enhanced/runtime";
import { getGlobalRemotes } from "./getRemoteGlobal";

const runtimePlugin: () => FederationRuntimePlugin = function () {
	return {
		name: "runtime-register-nested-remote",
		beforeRequest(args) {
			if (!args.options.remotes.length) {
				args.options.remotes = getGlobalRemotes();
			}
			return args;
		},
	};
};
export default runtimePlugin;
