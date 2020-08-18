import * as config from "./config.js";
import { getRandomCoord } from "./utils.js";

export class Food {
  constructor(gameboard) {
    this.x = 0;
    this.y = 0;
    this.height = config.BLOCK_SIZE;
    this.width = config.BLOCK_SIZE;
    this.fillColor = config.FOOD_FILL_COLOR;
    this.borderColor = config.FOOD_BORDER_COLOR;

    this._gameboard = gameboard;
  }

  draw(ctx) {
    ctx.fillStyle = this.fillColor;
    ctx.strokeStyle = this.borderColor;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.strokeRect(this.x, this.y, this.width, this.height);
  }

  create(snake) {
    this.x = getRandomCoord(this._gameboard.x, this._gameboard.width);
    this.y = getRandomCoord(this._gameboard.y, this._gameboard.height);

    if (this.isFoodOnSnake(snake)) {
      this.create(snake);
    }
  }

  isFoodOnSnake = (snake) =>
    snake._parts.some(({ x, y }) => this.x === x && this.y === y);
}
