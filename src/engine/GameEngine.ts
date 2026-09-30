import type { GameState } from "./domain/GameState";
import { getWoodPerSecond } from "./domain/Wood";

export class GameEngine {
	private state: GameState;

	constructor(state: GameState) {
		this.state = state;
	}

	update(delta: number): void {
		this.state.time += delta;

		const woodPerSecond = getWoodPerSecond(this.state.plantingLevel);
		this.state.wood += woodPerSecond * delta;
	}
}
