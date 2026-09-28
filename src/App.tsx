import { Save } from "./features/save/Save";
import { Wood } from "./features/wood/Wood";

function App() {
	return (
		<div>
			<header className="flex items-center justify-between border-b p-2">
				<h1>森</h1>

				<Save />
			</header>

			<main className="p-2">
				<Wood />
			</main>
		</div>
	);
}

export default App;
