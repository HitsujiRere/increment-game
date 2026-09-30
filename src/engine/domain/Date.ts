export const DAY_PER_YEAR = 20 as const;
export const SECONDS_PER_DAY = 2 as const;

export type GameDate = { year: number; day: number; dayProgress: number };

export function getGameDate(time: number): GameDate {
	const date = time / SECONDS_PER_DAY;
	const year = Math.floor(date / DAY_PER_YEAR);
	const dayIndex = Math.floor(date % DAY_PER_YEAR);
	return {
		year,
		day: dayIndex,
		dayProgress: date % 1,
	};
}

export function getTime(date: GameDate): number {
	return (
		(date.year * DAY_PER_YEAR + date.day + date.dayProgress) * SECONDS_PER_DAY
	);
}
