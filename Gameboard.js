import { Block } from "./Block.js";

import * as config from "./config.js";
import { toBlocks } from "./utils.js";

export class Gameboard extends Block {
  constructor(canvas) {
    super();
    this.y = config.SCOREBOARD_HEIGHT;
    this.height = canvas.height;
    this.width = canvas.width;
    this.fillColor = config.GAMEBOARD_FILL_COLOR;
    this.borderColor = config.GAMEBOARD_BORDER_COLOR;
  }

  get middle() {
    return toBlocks((this.height - this.y) / 2);
  }
}
