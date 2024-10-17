// import "./App.css";
import { CustomLoadRemote } from "utils";

const { useBearStore } =
	await CustomLoadRemote<typeof import("appStore/store")>("appStore/store");
const App = () => {
	const { removeAllBears, bears, increasePopulation } = useBearStore();
	return (
		<div className="content">
			<h1>Rsbuild with React</h1>
			<p>This is remote app</p>
			<h1>Count store:{bears}</h1>
			<br />
			<button
				onClick={increasePopulation}
				type={"button"}
				style={{
					padding: 10,
				}}
			>
				increase
			</button>
		</div>
	);
};

export default App;
