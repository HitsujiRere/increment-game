export type EventListener<T> = (event: T) => void;

export class EventBus<T> {
	private readonly listeners = new Set<EventListener<T>>();

	addEventListener(listener: EventListener<T>): () => void {
		this.listeners.add(listener);

		return () => {
			this.listeners.delete(listener);
		};
	}

	emit(event: T): void {
		for (const listener of this.listeners) {
			listener(event);
		}
	}
}
