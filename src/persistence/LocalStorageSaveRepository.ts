import { type GameSave, gameSaveSchema } from "@/engine/persistence/GameSave";
import type { SaveRepository } from "./SaveRepository";

export class LocalStorageSaveRepository implements SaveRepository {
	private readonly key = "increment-game-save";

	async save(data: GameSave): Promise<void> {
		localStorage.setItem(this.key, JSON.stringify(data));
	}

	async load(): Promise<GameSave | null> {
		const raw = localStorage.getItem(this.key);
		if (raw === null) {
			return null;
		}
		console.log("raw", raw);

		return gameSaveSchema.parseAsync(JSON.parse(raw));
	}

	async delete(): Promise<void> {
		localStorage.removeItem(this.key);
	}
}
