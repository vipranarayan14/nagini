import { Block } from "./Block.js";

import * as config from "./config.js";
import { getRandomCoord } from "./utils.js";

export class Food extends Block {
  constructor(gameboard, snake) {
    super();
    this.fillColor = config.FOOD_FILL_COLOR;
    this.borderColor = config.FOOD_BORDER_COLOR;

    this._gameboard = gameboard;
    this._snake = snake;
  }

  create() {
    this.x = getRandomCoord(this._gameboard.x, this._gameboard.width);
    this.y = getRandomCoord(this._gameboard.y, this._gameboard.height);

    if (this.isFoodOnSnake()) {
      this.create();
    }
  }

  isFoodOnSnake = () =>
    this._snake._parts.some(({ x, y }) => this.x === x && this.y === y);
}
