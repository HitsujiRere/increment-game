import type { Game } from "@/engine/Game";
import type { GameSaveRepository } from "./GameSaveRepository";

export class GameSaveService {
	private readonly game: Game;
	private readonly repository: GameSaveRepository;

	constructor(game: Game, repository: GameSaveRepository) {
		this.game = game;
		this.repository = repository;
	}

	save() {
		const data = this.game.exportSave();

		this.repository.save(data);
	}

	load() {
		const data = this.repository.load();

		if (data === null) {
			return false;
		}

		this.game.importSave(data);

		return true;
	}

	delete() {
		this.repository.delete();
	}
}
