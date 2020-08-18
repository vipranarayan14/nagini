import { toBlocks } from "./utils.js";

import { Gameboard } from "./Gameboard.js";
import { Scoreboard } from "./Scoreboard.js";
import { Snake } from "./Snake.js";
import { Food } from "./Food.js";
import { Game } from "./Game.js";
// import { Grid } from "./Grid.js";

const canvas = document.getElementById("game-canvas");
canvas.height = toBlocks(window.innerHeight * 0.9);
canvas.width = toBlocks(window.innerWidth * 0.9);

const ctx = canvas.getContext("2d");

const canvasHeight = canvas.height;
const canvasWidth = canvas.width;

const gameboard = new Gameboard(canvasHeight, canvasWidth);
const scoreboard = new Scoreboard(canvasHeight, canvasWidth);
const snake = new Snake(gameboard);
const food = new Food(gameboard);
const game = new Game();
// const grid = new Grid();

const advanceSnake = () => {
  snake.advance();

  if (snake.ateFood(food)) {
    scoreboard.addScore();
    food.create(snake);
  } else {
    snake.truncateTail();
  }
};

const changeDirection = (event, swipeDir) => {
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

const draw = () => {
  scoreboard.draw(ctx);
  scoreboard.drawScore(ctx);
  gameboard.draw(ctx);
  // grid.draw();
  food.draw(ctx);
  snake.draw(ctx);
  advanceSnake();
};

food.create(snake);
draw();

game.start(draw);

window.tocca({ swipeThreshold: 30 });

document.addEventListener("swipeup", (e) => changeDirection(e, "up"));
document.addEventListener("swipedown", (e) => changeDirection(e, "down"));
document.addEventListener("swipeleft", (e) => changeDirection(e, "left"));
document.addEventListener("swiperight", (e) => changeDirection(e, "right"));
document.addEventListener("keydown", changeDirection);
