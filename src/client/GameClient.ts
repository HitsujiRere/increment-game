import type { GameSnapshot } from "@/engine/domain/GameSnapshot";
import type { GameState } from "@/engine/domain/GameState";
import type { GameCommand } from "@/engine/protocol/commands";
import type { GameEvent } from "@/engine/protocol/events";

type PendingExportRequest = {
	resolve: (save: GameState) => void;
	reject: (error: Error) => void;
};

export class GameClient {
	private readonly worker: Worker;

	private readonly snapshot: GameSnapshot;

	private readonly pendingExports = new Map<string, PendingExportRequest>();

	constructor() {
		this.worker = new Worker(
			new URL("../engine/game.worker.ts", import.meta.url),
			{ type: "module" },
		);

		// TODO: dummy snapshot
		this.snapshot = {
			wood: 0,
			plantingLevel: 0,
		};

		this.worker.onmessage = (event: MessageEvent<GameEvent>) => {
			this.handleEvent(event.data);
		};
	}

	private handleEvent(event: GameEvent): void {
		console.log(event);

		switch (event.type) {
			case "snapshot":
				Object.assign(this.snapshot, structuredClone(event.snapshot));
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

	getSnapshot(): GameSnapshot {
		return this.snapshot;
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

	lumberjack(): void {
		this.worker.postMessage({
			type: "lumberjack",
		} satisfies GameCommand);
	}
}
