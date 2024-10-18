import { FC } from "react";
import { CustomLoadRemote } from "utils";

interface IProps {
	name?: string;
}
const { useBearStore } =
	await CustomLoadRemote<typeof import("appStore/store")>("appStore/store");
const App: FC<IProps> = (props) => {
	const { name } = props;
	const { increasePopulation, bears, removeAllBears } = useBearStore();
	return (
		<div
			style={{
				marginTop: 10,
				padding: 10,
				border: "1px dashed #333",
			}}
		>
			<h1>This is REMOTE TWO: {name}</h1>
			<p>Count: {bears}</p>
			<button type={"button"} onClick={increasePopulation}>
				increase
			</button>
			<br />
			<br />
			<button type={"button"} onClick={removeAllBears}>
				reset
			</button>
		</div>
	);
};

export default App;
