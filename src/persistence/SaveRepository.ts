import type { GameSave } from "@/engine/persistence/GameSave";

export interface SaveRepository {
	save(save: GameSave): Promise<void>;

	load(): Promise<GameSave | null>;

	delete(): Promise<void>;
}
