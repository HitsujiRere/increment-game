import { getWoodPerSecond } from "./domain/GameRule";
import type { GameState } from "./domain/GameState";

export class GameEngine {
	private state: GameState;

	constructor(state: GameState) {
		this.state = state;
	}

	update(delta: number): void {
		const woodPerSecond = getWoodPerSecond(this.state.plantingLevel);
		this.state.wood += woodPerSecond * delta;
	}
}
