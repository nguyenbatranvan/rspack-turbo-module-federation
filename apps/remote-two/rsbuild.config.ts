import { defineConfig } from "@rsbuild/core";
import { getRsBuildConfig } from "rsbuild-config/rsbuid-core";

export default defineConfig(
	getRsBuildConfig(
		{
			server: {
				port: 3003,
			},
		},
		{
			moduleFederation: {
				dts: false,
				name: "remoteTwo",
				exposes: {
					"./App": "./src/App.tsx",
				},
				filename: "remoteEntry.js",
			},
		},
	),
);
