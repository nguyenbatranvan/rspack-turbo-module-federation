import { dependencies } from "../../../package.json";

export type SharedItem = string;

export interface SharedConfig {
	/**
	 * Include the provided and fallback module directly instead behind an async request. This allows to use this shared module in initial load too. All possible shared modules need to be eager too.
	 */
	eager?: boolean;
	/**
	 * Provided module that should be provided to share scope. Also acts as fallback module if no shared module is found in share scope or version isn't valid. Defaults to the property name.
	 */
	import?: false | SharedItem;
	/**
	 * Package name to determine required version from description file. This is only needed when package name can't be automatically determined from request.
	 */
	packageName?: string;
	/**
	 * Version requirement from module in share scope.
	 */
	requiredVersion?: false | string;
	/**
	 * Module is looked up under this key from the share scope.
	 */
	shareKey?: string;
	/**
	 * Share scope name.
	 */
	shareScope?: string;
	/**
	 * Allow only a single version of the shared module in share scope (disabled by default).
	 */
	singleton?: boolean;
	/**
	 * Do not accept shared module if version is not valid (defaults to yes, if local fallback module is available and shared module is not a singleton, otherwise no, has no effect if there is no required version specified).
	 */
	strictVersion?: boolean;
	/**
	 * Version of the provided module. Will replace lower matching versions, but not higher.
	 */
	version?: false | string;
}

export interface SharedObject {
	/**
	 * Modules that should be shared in the share scope.
	 */
	[k: string]: SharedConfig | SharedItem;
}

export type Shared = (SharedItem | SharedObject)[] | SharedObject;

interface IProps {
	eager: boolean;
}

export const sharedModuleFederation = (
	{ eager }: IProps = { eager: false },
): Shared => {
	const mapDependencies: Shared = {};
	Object.keys(dependencies).forEach((key) => {
		// @ts-ignore
		const version = dependencies[key];
		mapDependencies[key] = {
			singleton: true,
			eager,
			requiredVersion: version,
		};
	});

	return {
		...mapDependencies,
		"antd/es/": {
			singleton: true,
			eager,
			requiredVersion: dependencies.antd,
		},
		// "@mui/material/": {
		//     singleton: true,
		//     eager,
		//     requiredVersion: dependencies["@mui/material"]
		// }
	};
};
