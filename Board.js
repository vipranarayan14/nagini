import { Block } from "./Block.js";
import * as config from "./config.js";

export class Board extends Block {
  constructor(canvasWidth) {
    super();

    this.height = config.BLOCK_SIZE * 2;
    this.width = canvasWidth / 2;
    this.fillColor = config.SCOREBOARD_FILL_COLOR;
    this.borderColor = config.SCOREBOARD_BORDER_COLOR;
  }
}
