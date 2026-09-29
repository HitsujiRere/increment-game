import type { GameState } from "@/engine/domain/GameState";
import type { GameCommand } from "@/engine/protocol/Command";
import type { GameEvent } from "@/engine/protocol/Event";
import type { GameEventBus } from "./GameEventBus";

type PendingExportRequest = {
	resolve: (save: GameState) => void;
	reject: (error: Error) => void;
};

export class SaveClient {
	private readonly send: (command: GameCommand) => void;

	private readonly pendingExports = new Map<string, PendingExportRequest>();

	constructor(send: (command: GameCommand) => void, events: GameEventBus) {
		this.send = send;

		events.addEventListener(this.handleEvent.bind(this));
	}

	private handleEvent(event: GameEvent) {
		switch (event.type) {
			case "state/imported":
				// TODO: handling
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
		}
	}

	exportState(): Promise<GameState> {
		const requestId = crypto.randomUUID();

		return new Promise((resolve, reject) => {
			this.pendingExports.set(requestId, { resolve, reject });

			this.send({
				type: "state/export",
				requestId,
			});
		});
	}

	importState(state: GameState): void {
		this.send({
			type: "state/import",
			state,
		});
	}
}
