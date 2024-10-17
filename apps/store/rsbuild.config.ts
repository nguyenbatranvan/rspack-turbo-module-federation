import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { getRsBuildConfig } from "rsbuild-config/rsbuid-core";

export default defineConfig(
	getRsBuildConfig(
		{
			server: {
				port: 3001,
			},
		},
		{
			moduleFederation: {
				dts: false,
				manifest: false,
				name: "appStore",
				exposes: {
					"./store": "./src/store/index.ts",
				},
				filename: "remoteEntry.js",
			},
		},
	),
);
