import { GAME_SPEED } from "./config.js";
import { toBlocks } from "./utils.js";

import { Gameboard } from "./Gameboard.js";
import { Scoreboard } from "./Scoreboard.js";
import { Controls } from "./Controls.js";
import { Snake } from "./Snake.js";
import { Food } from "./Food.js";
import { Game } from "./Game.js";
// import { Grid } from "./Grid.js";

import * as snakeCore from "./snake-core.js";

const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

canvas.height = toBlocks(window.innerHeight * 0.9);
canvas.width = toBlocks(window.innerWidth * 0.9);

const game = new Game();
const gameboard = new Gameboard(canvas);
const scoreboard = new Scoreboard(canvas);
const controls = new Controls(canvas, game);
const snake = new Snake(gameboard);
const food = new Food(gameboard, snake);
// const grid = new Grid();

const advanceSnake = snakeCore.initAdvance(snake, food, scoreboard);
const changeSnakeDirection = snakeCore.initChangeDirection(snake);

const draw = () => {
  if (snake.hitSelf) {
    game.end();
  }

  scoreboard.draw(ctx);
  controls.draw(ctx);
  gameboard.draw(ctx);
  // grid.draw(ctx);
  food.draw(ctx);
  snake.draw(ctx);
  advanceSnake();
};

const reset = () => {
  scoreboard.resetScore();
  snake.reset();
  food.create();
};

food.create();

game.setReset(reset);

game.init(draw, GAME_SPEED.NORMAL);

game.start();

window.tocca({ swipeThreshold: 30 });

document.addEventListener("swipeup", (e) => changeSnakeDirection(e, "up"));
document.addEventListener("swipedown", (e) => changeSnakeDirection(e, "down"));
document.addEventListener("swipeleft", (e) => changeSnakeDirection(e, "left"));
document.addEventListener("swiperight", (e) =>
  changeSnakeDirection(e, "right")
);
document.addEventListener("keydown", changeSnakeDirection);
