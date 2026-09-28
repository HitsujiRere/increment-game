import type { GameClient } from "@/client/GameClient";
import type { SaveRepository } from "@/persistence/SaveRepository";

export class SaveService {
	readonly client: GameClient;
	private readonly repository: SaveRepository;

	constructor(client: GameClient, repository: SaveRepository) {
		this.client = client;
		this.repository = repository;
	}

	async save(): Promise<void> {
		const data = await this.client.exportState();

		this.repository.save({
			version: 1,
			state: data,
			savedAt: Date.now(),
		});
	}

	load(): void {
		const data = this.repository.load();
		if (!data) {
			return;
		}

		this.client.importState(data.state);
	}

	delete(): void {
		this.repository.delete();
	}
}
