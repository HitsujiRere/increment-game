import type { GameSave } from "./GameSave";
import type { GameSaveRepository } from "./GameSaveRepository";

export class LocalStorageSaveRepository implements GameSaveRepository {
	private readonly key = "increment-game-";

	save(save: GameSave) {
		localStorage.setItem(this.key, JSON.stringify(save));
	}

	load(): GameSave | null {
		const raw = localStorage.getItem(this.key);

		if (raw === null) {
			return null;
		}

		return JSON.parse(raw) as GameSave;
	}

	delete() {
		localStorage.removeItem(this.key);
	}
}
