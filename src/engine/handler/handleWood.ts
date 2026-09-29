import type { GameCommand } from "@/engine/protocol/Command";
import type { GameEvent } from "@/engine/protocol/Event";
import { getPlantingCost } from "../domain/GameRule";
import type { GameState } from "../domain/GameState";

export function handleWood(
	_post: (event: GameEvent) => void,
	state: GameState,
) {
	return (command: GameCommand) => {
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
		}
	};
}
