import { Save } from "./features/save/Save";
import { Status } from "./features/status/Status";

function App() {
	return (
		<div>
			<header className="flex items-center justify-between border-b p-2">
				<h1>森</h1>

				<Save />
			</header>

			<main className="p-2">
				<Status />
			</main>
		</div>
	);
}

export default App;
