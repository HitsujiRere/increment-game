import { create } from "zustand";
import {
	createDummySnapshot,
	type GameSnapshot,
} from "@/engine/domain/GameSnapshot";

type GameStore = {
	snapshot: GameSnapshot;
	setSnapshot: (snapshot: GameSnapshot) => void;
};

export const useGameStore = create<GameStore>((set) => ({
	snapshot: createDummySnapshot(),
	setSnapshot: (snapshot) => {
		set({ snapshot });
	},
}));
