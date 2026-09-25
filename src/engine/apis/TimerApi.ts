import type { Game } from "../Game";

export class TimerApi {
	private readonly game: Game;

	constructor(game: Game) {
		this.game = game;
	}

	start() {
		this.game.timer.start(this.game.state);
	}

	stop() {
		this.game.timer.stop(this.game.state);
	}

	reset() {
		this.game.timer.reset(this.game.state);
	}
}
