import { Board } from "./Board.js";
import { createControlButtons } from "./ControlButton.js";

import { GAME_SPEED } from "./config.js";

const toggleGameSpeed = (speed) => {
  const speedValues = Object.values(GAME_SPEED);
  const currSpeedId = speedValues.findIndex(($speed) => $speed === speed);

  const nextSpeedId = (currSpeedId + 1) % speedValues.length;

  return speedValues[nextSpeedId];
};

const toggleCanvasFullscreen = () =>
  document.fullscreenElement
    ? document.exitFullscreen()
    : document.documentElement.requestFullscreen();

export class Controls extends Board {
  constructor(canvas, game) {
    super(canvas);

    this.x = canvas.width / 2;

    const buttons = [
      {
        color: "cyan",
        onClick: () => game.setSpeed(toggleGameSpeed(game.speed)),
      },
      { color: "yellow", onClick: () => game.togglePause() },
      { color: "pink", onClick: () => game.reset() },
      { color: "white", onClick: () => toggleCanvasFullscreen() },
    ];

    this.controlButtons = createControlButtons(
      canvas,
      this
    )(buttons).map((Button) => new Button());
  }

  draw(ctx) {
    super.draw(ctx);

    this.controlButtons.forEach((button) => {
      button.draw(ctx);
    });
  }
}
