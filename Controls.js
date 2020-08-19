import { Board } from "./Board.js";
import { createControlButtons } from "./ControlButton.js";

const toggleCanvasFullscreen = () =>
  document.fullscreenElement
    ? document.exitFullscreen()
    : document.documentElement.requestFullscreen();

export class Controls extends Board {
  constructor(canvas, game) {
    super(canvas);

    this.x = canvas.width / 2;

    const buttons = [
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
