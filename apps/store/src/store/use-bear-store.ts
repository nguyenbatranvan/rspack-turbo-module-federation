import { create } from "zustand";

interface IProps {
	bears: number;
	increasePopulation: () => void;
	removeAllBears: () => void;
}
export const useBearStore = create<IProps>((set) => ({
	bears: 0,
	increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
	removeAllBears: () => set({ bears: 0 }),
}));
