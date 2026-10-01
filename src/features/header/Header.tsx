import { getGameDate } from "@/engine/domain/Date";
import { useGameStore } from "@/store/gameStore";
import { Save } from "./components/Save";

export function Header() {
	const time = useGameStore((state) => state.snapshot.time);
	const date = getGameDate(time);

	return (
		<header className="flex items-center justify-between border-b p-2">
			<div>
				<h1>ゲーム</h1>
			</div>

			<div className="flex items-baseline gap-4">
				<div>森</div>

				<div>
					<span className="font-mono">{date.year}</span>年
					<span className="font-mono">{date.day}</span>日
				</div>
			</div>

			<div>
				<Save />
			</div>
		</header>
	);
}
