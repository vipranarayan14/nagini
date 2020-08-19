import { Block } from "./Block.js";
import { registerClick } from "./utils.js";

export class GameResetButton extends Block {
  constructor(canvas, parentBlock, game) {
    super();

    this.x = parentBlock.x + parentBlock.width - 100;
    this.y = parentBlock.y + 20;
    this.fillColor = "pink";
    this.borderColor = "pink";

    this.game = game;

    registerClick(this, canvas);
  }

  onClick() {
    this.game.reset();
  }
}
