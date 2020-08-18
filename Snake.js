import * as config from "./config.js";

export class Snake {
  constructor(gameboard) {
    this.height = this.width = config.BLOCK_SIZE;
    this.fillColor = config.SNAKE_FILL_COLOR;
    this.borderColor = config.SNAKE_BORDER_COLOR;

    this._gameboard = gameboard;

    this._dx = config.BLOCK_SIZE;
    this._dy = 0;

    this._parts = [
      { x: config.BLOCK_SIZE * 2, y: this._gameboard.middle() },
      { x: config.BLOCK_SIZE * 1, y: this._gameboard.middle() },
      { x: config.BLOCK_SIZE * 0, y: this._gameboard.middle() },
    ];
  }

  draw(ctx) {
    this._parts.forEach(({ x, y }) => {
      ctx.fillStyle = this.fillColor;
      ctx.strokeStyle = this.borderColor;
      ctx.fillRect(x, y, this.width, this.height);
      ctx.strokeRect(x, y, this.width, this.height);
    });
  }

  get isGoingUp() {
    return this._dy === -config.BLOCK_SIZE;
  }
  get isGoingDown() {
    return this._dy === config.BLOCK_SIZE;
  }
  get isGoingLeft() {
    return this._dx === -config.BLOCK_SIZE;
  }
  get isGoingRight() {
    return this._dx === config.BLOCK_SIZE;
  }

  advance() {
    let x = this._parts[0].x + this._dx;
    let y = this._parts[0].y + this._dy;

    x =
      x > this._gameboard.width
        ? this._gameboard.x
        : x < this._gameboard.x
        ? this._gameboard.width
        : x;
    y =
      y > this._gameboard.height
        ? this._gameboard.y
        : y < this._gameboard.y
        ? this._gameboard.height
        : y;

    this._parts = [{ x, y }].concat(this._parts);
  }

  turnUp() {
    this._dy = -config.BLOCK_SIZE;
    this._dx = 0;
  }

  turnDown() {
    this._dy = config.BLOCK_SIZE;
    this._dx = 0;
  }

  turnLeft() {
    this._dy = 0;
    this._dx = -config.BLOCK_SIZE;
  }

  turnRight() {
    this._dy = 0;
    this._dx = config.BLOCK_SIZE;
  }

  ateFood = (food) =>
    this._parts[0].x === food.x && this._parts[0].y === food.y;

  truncateTail = () =>
    (this._parts = this._parts.slice(0, this._parts.length - 1));
}
