import type { GameState } from "./GameState";

export type GameSnapshot = {
	time: number;
	bornAt: number;
	wood: number;
	plantingLevel: number;
};

export const createDummySnapshot = (): GameSnapshot => {
	return {
		time: 0,
		bornAt: 0,
		wood: 0,
		plantingLevel: 0,
	};
};

export const takeSnapshot = (state: GameState): GameSnapshot => {
	return {
		time: state.time,
		bornAt: state.bornAt,
		wood: state.wood,
		plantingLevel: state.plantingLevel,
	};
};
