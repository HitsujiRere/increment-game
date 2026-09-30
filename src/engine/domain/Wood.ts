export function getWoodPerSecond(plantingLevel: number): number {
	return plantingLevel * 0.1;
}

export function getPlantingCost(plantingLevel: number): number {
	return plantingLevel + 1;
}
