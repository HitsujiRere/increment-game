import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { GameProvider } from "./components/GameProvider.tsx";
import { bootstrap } from "./game.ts";

const root = document.getElementById("root");

if (!root) {
	throw new Error("Root element not found");
}

bootstrap();

createRoot(root).render(
	<StrictMode>
		<GameProvider>
			<App />
		</GameProvider>
	</StrictMode>,
);
