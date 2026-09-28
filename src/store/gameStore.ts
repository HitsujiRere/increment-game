import { create } from "zustand";
import type { GameSnapshot } from "@/engine/domain/GameSnapshot";

type GameStore = {
	snapshot: GameSnapshot;
	setSnapshot: (snapshot: GameSnapshot) => void;
};

export const useGameStore = create<GameStore>((set) => ({
	snapshot: {
		// TODO: dummy snapshot
		wood: 0,
		plantingLevel: 0,
	},
	setSnapshot: (snapshot) => {
		set({ snapshot });
	},
}));
