export class GameLoop {
	private readonly update: (delta: number) => void;
	private animationFrameId: number | null = null;
	private lastTime = 0;

	constructor(update: (delta: number) => void) {
		this.update = update;
	}

	start() {
		if (this.animationFrameId !== null) {
			return;
		}

		this.lastTime = performance.now();

		const loop = (now: number) => {
			const delta = (now - this.lastTime) / 1000;
			this.lastTime = now;

			this.update(delta);

			this.animationFrameId = requestAnimationFrame(loop);
		};

		this.animationFrameId = requestAnimationFrame(loop);
	}

	stop() {
		if (this.animationFrameId === null) {
			return;
		}

		cancelAnimationFrame(this.animationFrameId);
		this.animationFrameId = null;
	}
}
