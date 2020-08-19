import { Block } from "./Block.js";

import * as config from "./config.js";
import { toBlocks } from "./utils.js";

export class Gameboard extends Block {
  constructor(canvasHeight, canvasWidth) {
    super();
    this.y = config.SCOREBOARD_HEIGHT;
    this.height = canvasHeight;
    this.width = canvasWidth;
    this.fillColor = config.GAMEBOARD_FILL_COLOR;
    this.borderColor = config.GAMEBOARD_BORDER_COLOR;
  }

  get middle() {
    return toBlocks((this.height - this.y) / 2);
  }
}
