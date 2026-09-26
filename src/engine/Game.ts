import type { GameSave } from "@/persistence/GameSave";
import type { GameSnapshot } from "./GameSnapshot";
import { createInitialGameState, type GameState } from "./GameState";
import { TimerSystem } from "./systems/TimerSystem";

export class Game {
	readonly state: GameState;
	readonly timer: TimerSystem;

	constructor() {
		this.state = createInitialGameState();
		this.timer = new TimerSystem();
	}

	update(delta: number) {
		this.timer.update(this.state, delta);
	}

	getState(): GameState {
		return this.state;
	}

	getSnapshot(): GameSnapshot {
		return {
			timer: this.timer.getSnapshot(this.state),
		};
	}

	exportSave(): GameSave {
		return {
			version: 1,
			state: this.state,
			savedAt: Date.now(),
		};
	}

	importSave(data: GameSave) {
		Object.assign(this.state, structuredClone(data.state));
	}
}
