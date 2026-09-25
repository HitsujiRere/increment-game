import { TimerApi } from "./apis/TimerApi";
import type { Game } from "./Game";

export class GameApi {
	readonly timer: TimerApi;

	constructor(game: Game) {
		this.timer = new TimerApi(game);
	}
}
