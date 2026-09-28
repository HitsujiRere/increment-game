import type { GameSnapshot } from "../domain/GameSnapshot";
import type { GameState } from "../domain/GameState";

export type GameEvent =
	| {
			type: "snapshot";
			snapshot: GameSnapshot;
	  }
	| {
			type: "state/imported";
	  }
	| {
			type: "state/exported";
			requestId: string;
			state: GameState;
	  }
	| {
			type: "error";
			message: string;
	  };
