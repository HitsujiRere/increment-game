import { createContext, type ReactNode, useContext } from "react";
import type { GameClient } from "@/client/GameClient";
import type { SaveService } from "@/engine/persistence/SaveService";
import { gameClient, saveService } from "@/game";

const GameClientContext = createContext<GameClient | null>(null);

const SaveServiceContext = createContext<SaveService | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
	return (
		<GameClientContext.Provider value={gameClient}>
			<SaveServiceContext.Provider value={saveService}>
				{children}
			</SaveServiceContext.Provider>
		</GameClientContext.Provider>
	);
}

export function useGameClient(): GameClient {
	const api = useContext(GameClientContext);

	if (api === null) {
		throw new Error("useGameClient must be used within GameProvider");
	}

	return api;
}

export function useSaveService(): SaveService {
	const service = useContext(SaveServiceContext);

	if (service === null) {
		throw new Error("useGameSaveSurvice must be used within GameProvider");
	}

	return service;
}
