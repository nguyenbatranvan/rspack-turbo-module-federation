import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { getRsBuildConfig } from "rsbuild-config/rsbuid-core";

export default defineConfig(
	getRsBuildConfig(
		{
			server: {
				port: 3000,
			},
		},
		{
			moduleFederation: {
				dts: false,
				manifest: false,
				name: "host",
			},
		},
	),
);
