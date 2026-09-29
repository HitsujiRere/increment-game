import { getPlantingCost } from "./domain/GameRule";
import { createInitialGameState } from "./domain/GameState";
import { GameEngine } from "./GameEngine";
import { GameLoop } from "./GameLoop";
import type { GameCommand } from "./protocol/Command";
import type { GameEvent } from "./protocol/Event";

const state = createInitialGameState();

const engine = new GameEngine(state);

const loop: GameLoop = new GameLoop((delta) => {
	engine.update(delta);

	self.postMessage({
		type: "snapshot",
		// TODO: convert state to snapshot
		snapshot: state,
	} satisfies GameEvent);
});

self.onmessage = (event: MessageEvent<GameCommand>) => {
	const command = event.data;

	switch (command.type) {
		case "lumberjack":
			// TODO:
			state.wood += 1;
			break;

		case "plant":
			// TODO:
			state.wood -= getPlantingCost(state.plantingLevel);
			state.plantingLevel += 1;
			break;

		case "state/import":
			Object.assign(state, command.state);

			self.postMessage({
				type: "state/imported",
			} satisfies GameEvent);
			break;

		case "state/export":
			self.postMessage({
				type: "state/exported",
				requestId: command.requestId,
				state,
			} satisfies GameEvent);
			break;
	}
};

loop.start();
