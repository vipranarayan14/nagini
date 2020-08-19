export const initAdvance = (snake, food, scoreboard) => () => {
  snake.advance();

  if (snake.ateFood(food)) {
    scoreboard.addScore();
    food.create({ avoid: snake });
  } else {
    snake.truncateTail();
  }
};

export const initChangeDirection = (snake) => (event, swipeDir) => {
  event.preventDefault();

  const UP_KEY = 38;
  const DOWN_KEY = 40;
  const LEFT_KEY = 37;
  const RIGHT_KEY = 39;

  const { keyCode: pressedKey } = event;

  const goUp = pressedKey === UP_KEY || swipeDir === "up";
  const goDown = pressedKey === DOWN_KEY || swipeDir === "down";
  const goLeft = pressedKey === LEFT_KEY || swipeDir === "left";
  const goRight = pressedKey === RIGHT_KEY || swipeDir === "right";

  if (goUp && !snake.isGoingDown) {
    snake.turnUp();
  } else if (goDown && !snake.isGoingUp) {
    snake.turnDown();
  } else if (goLeft && !snake.isGoingRight) {
    snake.turnLeft();
  } else if (goRight && !snake.isGoingLeft) {
    snake.turnRight();
  }
};
