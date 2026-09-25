import { useState } from "react";
import { Button } from "./components/ui/button";

function App() {
	const [count, setCount] = useState(0);

	return (
		<>
			<p>App</p>

			<Button onClick={() => setCount((count) => count + 1)}>
				Count is {count}
			</Button>
		</>
	);
}

export default App;
