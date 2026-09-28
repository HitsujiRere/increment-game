import type { GameSave } from "@/engine/persistence/GameSave";
import type { SaveRepository } from "./SaveRepository";

export class LocalStorageSaveRepository implements SaveRepository {
	private readonly key = "increment-game-save";

	save(data: GameSave) {
		localStorage.setItem(this.key, JSON.stringify(data));
	}

	load(): GameSave | null {
		const raw = localStorage.getItem(this.key);

		if (raw === null) {
			return null;
		}

		return JSON.parse(raw) as GameSave;
	}

	delete(): void {
		localStorage.removeItem(this.key);
	}
}
