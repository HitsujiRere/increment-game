export type TimerState = {
	elapsed: number;
	running: boolean;
};

export type GameState = {
	timer: TimerState;
};

export const createInitialGameState = (): GameState => {
	return {
		timer: {
			elapsed: 0,
			running: false,
		},
	};
};
