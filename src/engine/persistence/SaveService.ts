import type { GameClient } from "@/client/GameClient";
import { toast } from "@/components/ui/toast";
import type { SaveRepository } from "@/persistence/SaveRepository";

export class SaveService {
	private readonly client: GameClient;
	private readonly repository: SaveRepository;

	constructor(client: GameClient, repository: SaveRepository) {
		this.client = client;
		this.repository = repository;
	}

	async save(): Promise<void> {
		// TODO: Error handling
		const data = await this.client.save.exportState();

		this.repository.save({
			version: 1,
			state: data,
			savedAt: Date.now(),
		});

		toast.add({ title: "保存しました", type: "success" });
	}

	load(): void {
		const data = this.repository.load();
		if (!data) {
			return;
		}

		this.client.save.importState(data.state);
	}

	delete(): void {
		this.repository.delete();
	}
}
