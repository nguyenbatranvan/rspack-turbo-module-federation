import { pluginReact } from "@rsbuild/plugin-react";
import { HtmlConfig, RsbuildConfig, rspack } from "@rsbuild/core";
import mergeWith from "lodash/mergeWith";
import * as path from "node:path";
import { pluginCssMinimizer } from "@rsbuild/plugin-css-minimizer";
import { ModuleFederationPlugin } from "@module-federation/enhanced/rspack";
import { sharedModuleFederation } from "./module-federation/shared-module-federation";
import { mergeUtils } from "./utils/merge";
import { RsdoctorRspackPlugin } from "@rsdoctor/rspack-plugin";
import type { moduleFederationPlugin } from "@module-federation/sdk";
import { pluginTypeCheck } from "@rsbuild/plugin-type-check";
interface BundlerPluginInstance {
	[index: string]: any;

	apply: (compiler: any) => void;
}

interface IProps {
	enableCopy?: boolean;
	moduleFederation?: moduleFederationPlugin.ModuleFederationPluginOptions;
}

const root = process.env.INIT_CWD.split("apps")[0]!;
export const pathJoin = (pathStr: string) => path.join(root, pathStr);

const isAnalyzer = process.env.ANA;
const isProd = process.env.NODE_ENV === "production";
const plugins: BundlerPluginInstance[] = [
	new rspack.DefinePlugin({
		"process.env.PUBLIC_URL": JSON.stringify(process.env.PUBLIC_URL),
	}),
];
if (process.env.RSDOCTOR) {
	plugins.push(
		new RsdoctorRspackPlugin({
			supports: {
				generateTileGraph: true,
			},
		}),
	);
}
const indexFile = "static/js/index.js";
export const getRsBuildConfig = (
	config: RsbuildConfig = {},
	opts: IProps = {},
): RsbuildConfig => {
	const { enableCopy = true, moduleFederation } = opts;

	let htmlConfig: HtmlConfig = {
		// favicon: path.resolve(__dirname, "/icons/fav-icon.png"),
		tags: [
			(tags, utils) => {
				const index = tags.findIndex((item) => item.attrs.src === indexFile);
				if (index !== -1) {
					tags.splice(index, 1);
				}
			},
			{
				tag: "link",
				attrs: {
					href: "/fonts.css",
					rel: "stylesheet",
				},
			},
			{
				tag: "script",
				attrs: {
					defer: "defer",
					src: `/${indexFile}`,
				},
			},
			{
				tag: "link",
				attrs: {
					rel: "icon",
					href: "/icons/fav-icon.png",
				},
			},
		],
	};

	if (moduleFederation) {
		plugins.push(
			new ModuleFederationPlugin({
				...moduleFederation,
				shared: sharedModuleFederation(),
				runtimePlugins: [
					path.resolve(
						__dirname,
						"./module-federation/custom-runtime-plugin.ts",
					),
				],
			}),
		);
	}
	const defaultConfig: RsbuildConfig = {
		plugins: [
			pluginReact({
				splitChunks: {
					react: false,
					// router: false
				},
			}),
			pluginTypeCheck(),
			pluginCssMinimizer(),
		],
		dev: {
			progressBar: false,
		},
		server: {
			publicDir: [
				{
					name: path.join(root, "public"),
					copyOnBuild: true,
					watch: true,
				},
				{
					name: "public",
					copyOnBuild: true,
					watch: true,
				},
			],
			open: true,
		},
		output: {
			assetPrefix: "/",
			cleanDistPath: true,
			filenameHash: false,
			sourceMap: {
				js: isProd ? false : "source-map",
			},
			copy:
				enableCopy && isProd
					? {
							patterns: [
								{
									from: "public",
									context: path.join(root),
								},
								{
									from: "public",
								},
							],
						}
					: null,
		},
		source: {
			aliasStrategy: "prefer-tsconfig",
			alias: {
				// "@icondo/shared": path.join(
				// 	process.env.TURBO_INVOCATION_DIR!,
				// 	"packages/shared/src",
				// ),
				// "@users": path.join(
				// 	process.env.TURBO_INVOCATION_DIR!,
				// 	"modules/users/src",
				// ),
			},
			// exclude: ["node_modules"],
			define: {
				RELEASE_TIME: new Date(),
			},
			transformImport: [
				{
					libraryName: "antd",
					libraryDirectory: "es",
				},
				{
					libraryName: "lodash",
					customName: "lodash/{{ member }}",
				},
			],
		},
		html: htmlConfig,
		performance: {
			// removeConsole: true,
			bundleAnalyze: isAnalyzer
				? {
						analyzerMode: "server",
						openAnalyzer: true,
						analyzerPort: 5001,
					}
				: null,
			chunkSplit: {
				override: {
					chunks: "async",
					minSize: 30000,
				},
				strategy: "split-by-size",
			},
		},

		tools: {
			rspack: {
				// optimization: {
				//     sideEffects: false,
				//     moduleIds: 'named',
				//     minimize: true
				// },
				optimization: {
					minimize: true,
					providedExports: true,
				},
				module: {
					rules: [
						{
							test: /index.ts/i,
							sideEffects: false,
						},
					],
				},
				plugins,
				output: {
					clean: true,
					publicPath: "auto",
				},
			},
		},
	};
	return mergeWith(defaultConfig, config, mergeUtils);
};
