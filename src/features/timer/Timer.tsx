import { PlayIcon, RefreshIcon, StopIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useGameApi } from "@/components/GameProvider";
import { Button } from "@/components/ui/button";
import { useGameStore } from "@/stores/gameStore";

export function Timer() {
	const gameApi = useGameApi();
	const timer = useGameStore((state) => state.timer);

	return (
		<div>
			<div className="font-mono">{timer.elapsed.toFixed(2)}</div>

			<Button size="icon" onClick={() => gameApi.timer.start()}>
				<HugeiconsIcon icon={PlayIcon} />
			</Button>

			<Button size="icon" onClick={() => gameApi.timer.stop()}>
				<HugeiconsIcon icon={StopIcon} />
			</Button>

			<Button size="icon" onClick={() => gameApi.timer.reset()}>
				<HugeiconsIcon icon={RefreshIcon} />
			</Button>
		</div>
	);
}
