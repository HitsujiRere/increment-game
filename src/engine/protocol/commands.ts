import type { GameState } from "../domain/GameState";

export type GameCommand =
	| {
			type: "lumberjack";
	  }
	| {
			type: "plant";
	  }
	| {
			type: "state/import";
			state: GameState;
	  }
	| {
			type: "state/export";
			requestId: string;
	  };
