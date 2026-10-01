const TICK_PER_SECONDS = 5;

export class GameLoop {
	private readonly tickRate = 1000 / TICK_PER_SECONDS;

	private readonly update: (delta: number) => void;

	private running = false;
	private timerId: ReturnType<typeof setTimeout> | null = null;
	private lastTime = 0;
	public gameSpeed = 1;

	constructor(update: (delta: number) => void) {
		this.update = update;
	}

	start(): void {
		if (this.running) {
			return;
		}

		this.running = true;
		this.lastTime = performance.now();

		this.scheduleNextTick();
	}

	stop(): void {
		this.running = false;

		if (this.timerId !== null) {
			clearTimeout(this.timerId);
			this.timerId = null;
		}
	}

	private scheduleNextTick(): void {
		this.timerId = setTimeout(() => {
			this.tick();
		}, this.tickRate);
	}

	private tick(): void {
		if (!this.running) {
			return;
		}

		const now = performance.now();
		const delta = ((now - this.lastTime) * this.gameSpeed) / 1000;

		this.lastTime = now;

		this.update(delta);

		this.scheduleNextTick();
	}
}
