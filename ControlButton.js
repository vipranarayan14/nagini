import { Block } from "./Block.js";
import { registerClick } from "./utils.js";
import { BLOCK_SIZE } from "./config.js";

export const createControlButtons = (canvas, parentBlock) => (buttons) =>
  buttons.map((button, id) => {
    const buttonOrder = buttons.length - id;

    return class ControlButton extends Block {
      constructor() {
        super();

        this.x =
          parentBlock.x + parentBlock.width - buttonOrder * (BLOCK_SIZE + 10);
        this.y = parentBlock.y + 20;
        this.fillColor = button.color;
        this.borderColor = button.color;

        this.onClick = button.onClick;

        registerClick(this, canvas);
      }
    };
  });
