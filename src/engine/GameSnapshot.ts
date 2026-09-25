export type TimerSnapshot = {
	elapsed: number;
	running: boolean;
};

export type GameSnapshot = {
	timer: TimerSnapshot;
};
