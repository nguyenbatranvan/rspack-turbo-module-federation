import { defineConfig } from "@rsbuild/core";
import { getRsBuildConfig } from "rsbuild-config/rsbuid-core";

export default defineConfig(
	getRsBuildConfig(
		{
			server: {
				port: 3002,
			},
		},
		{
			moduleFederation: {
				dts: false,
				manifest: false,
				name: "remote",
				exposes: {
					"./App": "./src/App.tsx",
				},
				filename: "remoteEntry.js",
			},
		},
	),
);
