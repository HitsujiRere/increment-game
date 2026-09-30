import { z } from "zod/mini";

export const gameSaveSchema = z.object({
	version: z.literal(1),
	state: z.object({
		wood: z.number(),
		plantingLevel: z.number(),
	}),
	savedAt: z.number(),
});

export type GameSave = z.infer<typeof gameSaveSchema>;
