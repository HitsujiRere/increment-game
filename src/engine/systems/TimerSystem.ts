import type { TimerSnapshot } from "../GameSnapshot";
import type { GameState } from "../GameState";

export class TimerSystem {
	update(state: GameState, delta: number) {
		if (!state.timer.running) return;

		state.timer.elapsed += delta;
	}

	getSnapshot(state: GameState): TimerSnapshot {
		return {
			elapsed: state.timer.elapsed,
			running: state.timer.running,
		};
	}

	start(state: GameState) {
		state.timer.running = true;
	}

	stop(state: GameState) {
		state.timer.running = false;
	}

	reset(state: GameState) {
		state.timer.elapsed = 0;
	}
}
