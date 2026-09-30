import { useGameClient } from "@/components/GameProvider";
import { Button } from "@/components/ui/button";
import { getGameDate } from "@/engine/domain/Date";
import { getPlantingCost, getWoodPerSecond } from "@/engine/domain/Wood";
import { useGameStore } from "@/store/gameStore";

export function Status() {
	const gameClient = useGameClient();

	const time = useGameStore((state) => state.snapshot.time);
	const date = getGameDate(time);

	const wood = useGameStore((state) => state.snapshot.wood);
	const plantingLevel = useGameStore((state) => state.snapshot.plantingLevel);

	return (
		<div>
			<div>
				<span className="font-mono">{date.year}</span>年
				<span className="font-mono">{date.day}</span>日
			</div>

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
