import * as config from "./config.js";
import { toBlocks } from "./utils.js";

export class Gameboard {
  constructor(canvasHeight, canvasWidth) {
    this.x = 0;
    this.y = config.SCOREBOARD_HEIGHT;
    this.height = canvasHeight;
    this.width = canvasWidth;
    this.fillColor = config.GAMEBOARD_FILL_COLOR;
    this.borderColor = config.GAMEBOARD_BORDER_COLOR;
  }

  middle() {
    return toBlocks((this.height - this.y) / 2);
  }

  draw(ctx) {
    ctx.fillStyle = this.fillColor;
    ctx.strokeStyle = this.borderColor;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.strokeRect(this.x, this.y, this.width, this.height);
  }
}
