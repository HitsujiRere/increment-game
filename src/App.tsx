import { Header } from "./features/header/Header";
import { Status } from "./features/status/Status";

function App() {
	return (
		<div>
			<Header />

			<main className="p-2">
				<Status />
			</main>
		</div>
	);
}

export default App;
