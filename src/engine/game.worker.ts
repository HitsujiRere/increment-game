import { EventBus } from "@/shared/EventBus";
import { takeSnapshot } from "./domain/GameSnapshot";
import { createInitialGameState } from "./domain/GameState";
import { GameEngine } from "./GameEngine";
import { GameLoop } from "./GameLoop";
import { handleSave } from "./handler/saveHandler";
import { handleWood } from "./handler/woodHandler";
import type { GameCommand } from "./protocol/Command";
import type { GameEvent } from "./protocol/Event";

const state = createInitialGameState();

const engine = new GameEngine(state);

const loop: GameLoop = new GameLoop((delta) => {
	engine.update(delta);

	self.postMessage({
		type: "snapshot",
		snapshot: takeSnapshot(state),
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
	console.log("command", command);

	events.emit(command);
};

loop.start();
