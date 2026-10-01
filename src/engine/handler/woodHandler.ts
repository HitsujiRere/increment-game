import type { GameState } from "../domain/GameState";
import { getPlantingCost } from "../domain/Wood";
import type { GameCommand } from "../protocol/Command";
import type { GameEvent } from "../protocol/Event";

export function woodHandler(
	post: (event: GameEvent) => void,
	state: GameState,
) {
	return (command: GameCommand) => {
		switch (command.type) {
			case "lumberjack":
				state.wood += 1;
				break;

			case "plant": {
				{
					const cost = getPlantingCost(state.plantingLevel);
					if (state.wood >= cost) {
						state.wood -= cost;
						state.plantingLevel += 1;
					} else {
						// TODO: error share type
						post({ type: "error", message: "Cannot plant" });
					}
					break;
				}
			}
		}
	};
}
