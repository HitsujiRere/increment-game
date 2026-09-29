import type { GameCommand } from "@/engine/protocol/Command";

export class WoodClient {
	private readonly send: (command: GameCommand) => void;

	constructor(send: (command: GameCommand) => void) {
		this.send = send;
	}

	lumberjack(): void {
		this.send({
			type: "lumberjack",
		});
	}

	plant(): void {
		this.send({
			type: "plant",
		});
	}
}
