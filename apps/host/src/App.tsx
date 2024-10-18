import { loadRemote } from "@module-federation/enhanced/runtime";
import loadable from "@loadable/component";
import { ErrorBoundary } from "react-error-boundary";
import { CustomLoadRemote } from "utils";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import { Home } from "./pages/home.tsx";
// lazy load
const AppRemote = loadable(
	() => loadRemote<typeof import("remote/App")>("remote/App"),
	{
		fallback: <p>Loading...</p>,
		resolveComponent: (m) => m!.default,
	},
);
// lazy load
const AppRemoteTwo = loadable(
	() => loadRemote<typeof import("remoteTwo/App")>("remoteTwo/App"),
	{
		fallback: <p>Loading...</p>,
		resolveComponent: (m) => m!.default,
	},
);
const { useBearStore } =
	await CustomLoadRemote<typeof import("appStore/store")>("appStore/store");

const App = () => {
	const { removeAllBears, bears } = useBearStore();
	return (
		<>
			<nav>
				<ul>
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/remote-2">remote two</Link>
					</li>
				</ul>
			</nav>

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

			<Routes>
				<Route path="/" element={<Home />}>
					<Route
						path={"remote-1"}
						element={
							<ErrorBoundary fallback={<p>not yet remote!!</p>}>
								<AppRemote />
							</ErrorBoundary>
						}
					/>
					<Route
						path={"remote-2"}
						element={
							<ErrorBoundary fallback={<p>not yet remote two!!</p>}>
								<AppRemoteTwo name={"name remote two"} />
							</ErrorBoundary>
						}
					/>
					<Route path={""} element={<Navigate to={"remote-1"} />} />
				</Route>
			</Routes>
		</>
	);
};

export default App;
