import { create } from "zustand";
import type { GameSnapshot } from "@/engine/GameSnapshot";

type GameStore = GameSnapshot & {
	setSnapshot: (snapshot: GameSnapshot) => void;
};

export const useGameStore = create<GameStore>((set) => ({
	timer: {
		elapsed: 0,
		running: false,
	},

	setSnapshot: (snapshot) => {
		set(snapshot);
	},
}));
