import { BLOCK_SIZE } from "./config.js";

const getMousePosition = (event, canvas) => {
  var canvasRect = canvas.getBoundingClientRect();
  return {
    x: event.clientX - canvasRect.left,
    y: event.clientY - canvasRect.top,
  };
};

function isMouseInside(mousePosition, block) {
  const isMouseBelowTop = mousePosition.y > block.y;
  const isMouseAboveBottom = mousePosition.y < block.y + block.height;
  const isMouseAfterLeft = mousePosition.x > block.x;
  const isMouseBeforeRight = mousePosition.x < block.x + block.width;

  return (
    isMouseBelowTop &&
    isMouseAboveBottom &&
    isMouseAfterLeft &&
    isMouseBeforeRight
  );
}

export const toBlocks = (num) => Math.floor(num / BLOCK_SIZE) * BLOCK_SIZE;

export const getRandomCoord = (min, max) =>
  toBlocks(Math.random() * (max - min) + min);

export const registerClick = (block, canvas) => {
  document.addEventListener("click", (event) => {
    const mousePosition = getMousePosition(event, canvas);

    if (isMouseInside(mousePosition, block)) {
      block.onClick(event);
    }
  });
};
