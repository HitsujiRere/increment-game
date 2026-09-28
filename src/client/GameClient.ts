import type { GameState } from "@/engine/domain/GameState";
import type { GameCommand } from "@/engine/protocol/commands";
import type { GameEvent } from "@/engine/protocol/events";
import { useGameStore } from "@/store/gameStore";

type PendingExportRequest = {
	resolve: (save: GameState) => void;
	reject: (error: Error) => void;
};

export class GameClient {
	private readonly worker: Worker;

	private readonly pendingExports = new Map<string, PendingExportRequest>();

	constructor() {
		this.worker = new Worker(
			new URL("../engine/game.worker.ts", import.meta.url),
			{ type: "module" },
		);

		this.worker.onmessage = (event: MessageEvent<GameEvent>) => {
			this.handleEvent(event.data);
		};
	}

	private handleEvent(event: GameEvent): void {
		if (event.type !== "snapshot") {
			console.log(event);
		}

		switch (event.type) {
			case "snapshot":
				useGameStore.getState().setSnapshot(event.snapshot);
				break;

			case "state/imported":
				return;

			case "state/exported": {
				const request = this.pendingExports.get(event.requestId);
				if (!request) {
					return;
				}

				this.pendingExports.delete(event.requestId);
				request.resolve(event.state);
				return;
			}

			case "error":
				// TODO: handling
				return;
		}
	}

	exportState(): Promise<GameState> {
		const requestId = crypto.randomUUID();

		return new Promise((resolve, reject) => {
			this.pendingExports.set(requestId, { resolve, reject });

			this.worker.postMessage({
				type: "state/export",
				requestId,
			});
		});
	}

	importState(state: GameState): void {
		this.worker.postMessage({
			type: "state/import",
			state,
		} satisfies GameCommand);
	}

	// TODO: 整理
	lumberjack(): void {
		this.worker.postMessage({
			type: "lumberjack",
		} satisfies GameCommand);
	}

	plant(): void {
		this.worker.postMessage({
			type: "plant",
		} satisfies GameCommand);
	}
}
