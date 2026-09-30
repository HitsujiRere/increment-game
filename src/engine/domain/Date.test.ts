import { describe, expect, test } from "vitest";
import { getGameDate, getTime } from "./Date";

describe("getGameDate, getGameTime", () => {
	test("GameTimeとGameDateを相互に変換できる", () => {
		const time = 12345;
		const date = getGameDate(time);
		expect(getTime(date)).toBe(time);
	});
});
