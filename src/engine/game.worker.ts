import { EventBus } from "@/types/EventBus";
import { createInitialGameState } from "./domain/GameState";
import { GameEngine } from "./GameEngine";
import { GameLoop } from "./GameLoop";
import { handleSave } from "./handler/handleSave";
import { handleWood } from "./handler/handleWood";
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

const post = (event: GameEvent) => {
	self.postMessage(event);
};

const events = new EventBus<GameCommand>();

events.addEventListener(handleSave(post, state));
events.addEventListener(handleWood(post, state));

self.onmessage = (event: MessageEvent<GameCommand>) => {
	const command = event.data;
	events.emit(command);
};

loop.start();
