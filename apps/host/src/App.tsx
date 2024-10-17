// import "./App.css";
import { loadRemote } from "@module-federation/enhanced/runtime";
import loadable from "@loadable/component";
import { ErrorBoundary } from "react-error-boundary";
import { CustomLoadRemote } from "utils";
const AppRemote = loadable(
	() => loadRemote<typeof import("remote/App")>("remote/App"),
	{
		fallback: <p>Loading...</p>,
		resolveComponent: (m) => m.default,
	},
);

const { useBearStore } =
	await CustomLoadRemote<typeof import("appStore/store")>("appStore/store");

const App = () => {
	const { removeAllBears, bears } = useBearStore();
	return (
		<>
			<div>
				<h1>Rsbuild with React</h1>
				<p>This is host app count: {bears}</p>
				<button
					onClick={removeAllBears}
					style={{ padding: 10 }}
					type={"button"}
				>
					Reset count
				</button>
			</div>
			<div
				style={{
					padding: 20,
					border: "1px dashed black",
				}}
			>
				<ErrorBoundary fallback={<p>not yet!!</p>}>
					<AppRemote />
				</ErrorBoundary>
			</div>
		</>
	);
};

export default App;
