import { GameClient } from "./client/GameClient";
import { SaveService } from "./engine/persistence/SaveService";
import { LocalStorageSaveRepository } from "./persistence/LocalStorageSaveRepository";

export const gameClient = new GameClient();

const repository = new LocalStorageSaveRepository();
export const saveService = new SaveService(gameClient, repository);

export function bootstrap() {
	saveService.load();
}
