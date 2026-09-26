import type { GameSave } from "./GameSave";

export interface GameSaveRepository {
	save(save: GameSave): void;

	load(): GameSave | null;

	delete(): void;
}
