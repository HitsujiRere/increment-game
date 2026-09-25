import { Game } from "./engine/Game.ts";
import { GameApi } from "./engine/GameApi.ts";
import { GameRuntime } from "./engine/GameRuntime.ts";
import { useGameStore } from "./stores/gameStore.ts";

export const game = new Game();

export const gameApi = new GameApi(game);

export const gameRuntime = new GameRuntime(game, (snapshot) => {
	useGameStore.getState().setSnapshot(snapshot);
});

export function bootstrap() {
	gameRuntime.start();
}
