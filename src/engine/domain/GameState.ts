export type GameState = {
	wood: number;
	plantingLevel: number;
};

export const createInitialGameState = (): GameState => {
	return {
		wood: 0,
		plantingLevel: 0,
	};
};
