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

const changeDirection = ({ keyCode: pressedKey }) => {
  const LEFT_KEY = 37;
  const RIGHT_KEY = 39;
  const UP_KEY = 38;
  const DOWN_KEY = 40;

  if (pressedKey === UP_KEY && !snake.isGoingDown) {
    snake.turnUp();
  } else if (pressedKey === DOWN_KEY && !snake.isGoingUp) {
    snake.turnDown();
  } else if (pressedKey === RIGHT_KEY && !snake.isGoingLeft) {
    snake.turnRight();
  } else if (pressedKey === LEFT_KEY && !snake.isGoingRight) {
    snake.turnLeft();
  }
};

const draw = () => {
  scoreboard.draw(ctx);
  gameboard.draw(ctx);
  // grid.draw();
  food.draw(ctx);
  snake.draw(ctx);
  advanceSnake();
};

document.addEventListener("keydown", changeDirection);

food.create(snake);
draw();

game.start(draw);
