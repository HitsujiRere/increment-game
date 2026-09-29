import type { GameCommand } from "@/engine/protocol/Command";
import type { GameEvent } from "@/engine/protocol/Event";
import { useGameStore } from "@/store/gameStore";
import { EventBus } from "@/types/EventBus";
import { SaveClient } from "./SaveClient";
import { WoodClient } from "./WoodClient";

export class GameClient {
	private readonly worker: Worker;
	private readonly events = new EventBus<GameEvent>();

	readonly save: SaveClient;
	readonly wood: WoodClient;

	constructor() {
		this.worker = new Worker(
			new URL("@/engine/game.worker.ts", import.meta.url),
			{ type: "module" },
		);

		const send = this.sendCommand.bind(this);

		this.save = new SaveClient(send, this.events);
		this.wood = new WoodClient(send);

		this.worker.onmessage = (event: MessageEvent<GameEvent>) => {
			this.handleEvent(event.data);
		};
	}

	private sendCommand(command: GameCommand): void {
		this.worker.postMessage(command);
	}

	private handleEvent(event: GameEvent): void {
		switch (event.type) {
			case "snapshot":
				useGameStore.getState().setSnapshot(event.snapshot);
				break;

			case "error":
				// TODO: handling
				return;

			default:
				this.events.emit(event);
				return;
		}
	}
}
