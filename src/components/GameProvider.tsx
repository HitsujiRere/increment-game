import { createContext, type ReactNode, useContext } from "react";
import type { GameApi } from "@/engine/GameApi";
import { gameApi } from "../game";

const GameApiContext = createContext<GameApi | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
	return (
		<GameApiContext.Provider value={gameApi}>
			{children}
		</GameApiContext.Provider>
	);
}

export function useGameApi(): GameApi {
	const api = useContext(GameApiContext);

	if (api === null) {
		throw new Error("useGameApi must be used within GameProvider");
	}

	return api;
}
