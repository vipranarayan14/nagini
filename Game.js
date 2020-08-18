import * as config from "./config.js";

export class Game {
  constructor() {
    this._gameInterval = 0;
  }

  start(draw) {
    this._gameInterval = setInterval(draw, config.GAME_SPEED.NORMAL);
  }

  pause() {
    clearInterval(this._gameInterval);
  }

  togglePause() {
    const isGameRunning = this._gameInterval > 0;

    if (isGameRunning) {
      this.pause();
      this._gameInterval = 0;
    } else {
      this.start();
    }
  }
}
