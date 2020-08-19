const canReset = () =>
  window.confirm(
    "Are you sure you want to reset the game?" + "\n" + "This can't be undone."
  );

export class Game {
  constructor() {
    this._gameInterval = 0;
    this.draw = () => {};
    this.reset = () => {};
  }

  resetInterval() {
    clearInterval(this._gameInterval);
    this._gameInterval = 0;
  }

  init(draw, gameSpeed) {
    this.draw = draw;
    this.gameSpeed = gameSpeed;
    this.draw();
  }

  setReset(reset) {
    this.reset = () => {
      if (!canReset()) return;
      this.resetInterval();
      reset();
      this.draw();
    };
  }

  start() {
    this._gameInterval = setInterval(this.draw, this.gameSpeed);
  }

  pause() {
    this.resetInterval();
  }

  togglePause() {
    const isGameRunning = this._gameInterval > 0;

    if (isGameRunning) {
      this.pause();
    } else {
      this.start();
    }
  }
}
