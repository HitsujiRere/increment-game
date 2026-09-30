import { z } from "zod/mini";

const gameSaveStateSchema = z.object({
	time: z.number(),
	bornAt: z.number(),
	wood: z.number(),
	plantingLevel: z.number(),
});

export const gameSaveSchema = z.object({
	version: z.literal(1),
	state: gameSaveStateSchema,
	savedAt: z.number(),
});

export type GameSave = z.infer<typeof gameSaveSchema>;
