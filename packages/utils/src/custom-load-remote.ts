import { loadRemote } from "@module-federation/enhanced/runtime";

export const CustomLoadRemote = <Props>(path: string) => {
	return loadRemote(path) as Promise<Props>;
};
