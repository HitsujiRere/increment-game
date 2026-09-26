import { createContext, type ReactNode, useContext } from "react";
import type { GameApi } from "@/engine/GameApi";
import type { GameSaveService } from "@/persistence/GameSaveService";
import { gameApi, gameSaveService } from "../game";

const GameApiContext = createContext<GameApi | null>(null);

const GameSaveServiceContext = createContext<GameSaveService | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
	return (
		<GameApiContext.Provider value={gameApi}>
			<GameSaveServiceContext.Provider value={gameSaveService}>
				{children}
			</GameSaveServiceContext.Provider>
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

export function useGameSaveService(): GameSaveService {
	const service = useContext(GameSaveServiceContext);

	if (service === null) {
		throw new Error("useGameSaveSurvice must be used within GameProvider");
	}

	return service;
}
