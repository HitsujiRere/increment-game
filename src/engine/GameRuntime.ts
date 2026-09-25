import type { Game } from "./Game";
import { GameLoop } from "./GameLoop";

export class GameRuntime {
	private readonly loop: GameLoop;

	constructor(
		game: Game,
		onSnapshot: (snapshot: ReturnType<Game["getSnapshot"]>) => void,
	) {
		this.loop = new GameLoop((delta) => {
			game.update(delta);
			onSnapshot(game.getSnapshot());
		});
	}

	start() {
		this.loop.start();
	}

	stop() {
		this.loop.stop();
	}
}
