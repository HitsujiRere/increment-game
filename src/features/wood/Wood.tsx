import { useGameClient } from "@/components/GameProvider";
import { Button } from "@/components/ui/button";

export function Wood() {
	const gameClient = useGameClient();

	return (
		<div>
			<div className="font-mono">
				{/* TODO: 値の適切な監視 */}
				木: {gameClient.getSnapshot().wood.toFixed(2)}
			</div>

			<Button onClick={() => gameClient.lumberjack()}>木こり</Button>
		</div>
	);
}
