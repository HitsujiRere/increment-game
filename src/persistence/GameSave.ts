import type { GameState } from "@/engine/GameState";

export type TimerSave = {
	elapsed: number;
};

export type GameSave = {
	version: 1;

	state: GameState;

	savedAt: number;
};
