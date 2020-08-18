import * as config from "./config.js";

export class Scoreboard {
  constructor(canvasHeight, canvasWidth) {
    this.x = 0;
    this.y = 0;
    this.height = config.BLOCK_SIZE * 2;
    this.width = canvasWidth;
    this.fillColor = config.SCOREBOARD_FILL_COLOR;
    this.borderColor = config.SCOREBOARD_BORDER_COLOR;

    this.score = 0;
  }

  draw(ctx) {
    ctx.fillStyle = this.fillColor;
    ctx.strokeStyle = this.borderColor;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.strokeRect(this.x, this.y, this.width, this.height);
  }

  addScore = () => (this.score += config.SCORE_INCREMENT);
}
