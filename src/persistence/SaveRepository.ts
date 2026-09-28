import type { GameSave } from "@/engine/persistence/GameSave";

export interface SaveRepository {
	save(save: GameSave): void;

	load(): GameSave | null;

	delete(): void;
}
