import { Game } from "./engine/Game.ts";
import { GameApi } from "./engine/GameApi.ts";
import { GameRuntime } from "./engine/GameRuntime.ts";
import { GameSaveService } from "./persistence/GameSaveService.ts";
import { LocalStorageSaveRepository } from "./persistence/LocalStorageSaveRepository.ts";
import { useGameStore } from "./stores/gameStore.ts";

export const game = new Game();

export const gameApi = new GameApi(game);

const repository = new LocalStorageSaveRepository();
export const gameSaveService = new GameSaveService(game, repository);

export const gameRuntime = new GameRuntime(game, (snapshot) => {
	useGameStore.getState().setSnapshot(snapshot);
});

export function bootstrap() {
	gameSaveService.load();

	gameRuntime.start();
}
