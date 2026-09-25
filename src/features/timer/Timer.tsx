import { useGameApi } from "@/components/GameProvider";
import { Button } from "@/components/ui/button";
import { useGameStore } from "@/stores/gameStore";

export function Timer() {
	const gameApi = useGameApi();
	const timer = useGameStore((state) => state.timer);

	return (
		<div>
			<div>{timer.elapsed.toFixed(2)}</div>

			<Button onClick={() => gameApi.timer.start()}>Start</Button>

			<Button onClick={() => gameApi.timer.stop()}>Stop</Button>

			<Button onClick={() => gameApi.timer.reset()}>Reset</Button>
		</div>
	);
}
