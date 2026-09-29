import type { GameState } from "./GameState";

export type GameSnapshot = {
	wood: number;
	plantingLevel: number;
};

export const createDummySnapshot = (): GameSnapshot => {
	return {
		wood: 0,
		plantingLevel: 0,
	};
};

export const takeSnapshot = (state: GameState): GameSnapshot => {
	return {
		wood: state.wood,
		plantingLevel: state.plantingLevel,
	};
};
