import { Board } from "./Board.js";

export class Controls extends Board {
  constructor(canvasWidth) {
    super(canvasWidth);
    this.x = canvasWidth / 2;
  }

  draw(ctx) {
    super.draw(ctx);
    this.drawPauseToggleBtn(ctx);
  }

  drawPauseToggleBtn(ctx) {}
}
