import { Block } from "./Block.js";
import { registerClick } from "./utils.js";

export class TogglePauseButton extends Block {
  constructor(canvas, parentBlock, game) {
    super();

    this.x = parentBlock.x + parentBlock.width - 160;
    this.y = parentBlock.y + 20;
    this.fillColor = "white";
    this.borderColor = "white";

    this.game = game;

    registerClick(this, canvas);
  }

  onClick() {
    this.game.togglePause();
  }
}
