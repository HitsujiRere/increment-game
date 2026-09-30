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
			<div className="font-mono">木: {wood.toFixed(2)}</div>

			<div className="flex gap-2">
				<Button variant="outline" onClick={() => gameClient.wood.lumberjack()}>
					木こり: 木+1
				</Button>

				<Button
					variant="outline"
					disabled={wood < getPlantingCost(plantingLevel)}
					onClick={() => gameClient.wood.plant()}
				>
					植林 Lv{plantingLevel} (+{getWoodPerSecond(plantingLevel).toFixed(2)}
					木/秒): -{getPlantingCost(plantingLevel)}木
				</Button>
			</div>
		</div>
	);
}
