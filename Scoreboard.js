import { Board } from "./Board.js";
import * as config from "./config.js";

export class Scoreboard extends Board {
  constructor(...args) {
    super(...args);

    this.score = 0;
  }

  addScore = () => (this.score += config.SCORE_INCREMENT);

  drawScore(ctx) {
    ctx.fillStyle = "white";
    ctx.font = "50px Arial";
    ctx.fillText(this.score.toString(), this.x + 30, 58);
  }

  draw(ctx) {
    super.draw(ctx);
    this.drawScore(ctx);
  }
}
