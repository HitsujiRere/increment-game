import type { GameState } from "../domain/GameState";
import type { GameCommand } from "../protocol/Command";
import type { GameEvent } from "../protocol/Event";

export function handleSave(post: (event: GameEvent) => void, state: GameState) {
	return (command: GameCommand) => {
		switch (command.type) {
			case "state/import":
				Object.assign(state, command.state);

				post({
					type: "state/imported",
				});
				break;

			case "state/export":
				post({
					type: "state/exported",
					requestId: command.requestId,
					state,
				});
				break;
		}
	};
}
