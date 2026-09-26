import { Save } from "./features/save/Save";
import { Timer } from "./features/timer/Timer";

function App() {
	return (
		<div className="m-2">
			<h1>農業</h1>

			<Save />

			<Timer />
		</div>
	);
}

export default App;
