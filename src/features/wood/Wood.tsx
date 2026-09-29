import { useGameClient } from "@/components/GameProvider";
import { Button } from "@/components/ui/button";
import { getPlantingCost, getWoodPerSecond } from "@/engine/domain/GameRule";
import { useGameStore } from "@/store/gameStore";

export function Wood() {
	const gameClient = useGameClient();

	const wood = useGameStore((state) => state.snapshot.wood);
	const plantingLevel = useGameStore((state) => state.snapshot.plantingLevel);

	return (
		<div>
			<div className="font-mono">
				{/* TODO: 値の適切な監視 */}
				木: {wood.toFixed(2)}
			</div>

			<Button
				variant="outline"
				onClick={() => gameClient.wood.lumberjack()}
				className="text-base"
			>
				木こり: 木+1
			</Button>

			<Button
				variant="outline"
				onClick={() => gameClient.wood.plant()}
				className="text-base"
			>
				植林 Lv{plantingLevel} (+{getWoodPerSecond(plantingLevel).toFixed(2)}
				木/秒): -{getPlantingCost(plantingLevel)}木
			</Button>
		</div>
	);
}
