import { BLOCK_SIZE } from "./config.js";

export class Block {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.height = BLOCK_SIZE;
    this.width = BLOCK_SIZE;
    this.fillColor = "black";
    this.borderColor = "black";
  }

  draw(ctx) {
    ctx.fillStyle = this.fillColor;
    ctx.strokeStyle = this.borderColor;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.strokeRect(this.x, this.y, this.width, this.height);
  }
}
