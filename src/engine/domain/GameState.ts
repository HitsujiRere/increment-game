import { DAY_PER_YEAR, SECONDS_PER_DAY } from "./Date";

export type GameState = {
	time: number;
	bornAt: number;
	wood: number;
	plantingLevel: number;
};

export const createInitialGameState = (): GameState => {
	return {
		time: 300 * DAY_PER_YEAR * SECONDS_PER_DAY,
		bornAt: 300 * DAY_PER_YEAR * SECONDS_PER_DAY,
		wood: 0,
		plantingLevel: 0,
	};
};
