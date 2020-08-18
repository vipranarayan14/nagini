const GAMEBOARD_FILL_COLOR = "#4c4c4c";
const GAMEBOARD_BORDER_COLOR = GAMEBOARD_FILL_COLOR;
const SCOREBOARD_FILL_COLOR = "#222222";
const SCOREBOARD_BORDER_COLOR = SCOREBOARD_FILL_COLOR;
const SNAKE_FILL_COLOR = "#00a000";
const SNAKE_BORDER_COLOR = SNAKE_FILL_COLOR; // "darkgreen";
const FOOD_FILL_COLOR = "#ff5500";
const FOOD_BORDER_COLOR = FOOD_FILL_COLOR;

const BLOCK_SIZE = 40;
const SCORE_INCREMENT = 10;

const toBlocks = (num) => Math.floor(num / BLOCK_SIZE) * BLOCK_SIZE;

const canvas = document.getElementById("game-canvas");
canvas.height = toBlocks(window.innerHeight * 0.9);
canvas.width = toBlocks(window.innerWidth * 0.9);

const ctx = canvas.getContext("2d");

const canvasHeight = canvas.height;
const canvasWidth = canvas.width;

const scoreBoard = {
  x: 0,
  y: 0,
  height: BLOCK_SIZE * 2,
  width: canvasWidth,
};

const gameBoard = {
  x: 0,
  y: scoreBoard.height,
  height: canvasHeight,
  width: canvasWidth,
};

gameBoard.middle = toBlocks((gameBoard.height - gameBoard.y) / 2);

let score = 0;

let dx = BLOCK_SIZE,
  dy = 0;

let foodX = 0,
  foodY = 0;

let snakeParts = [
  { x: BLOCK_SIZE * 2, y: gameBoard.middle },
  { x: BLOCK_SIZE * 1, y: gameBoard.middle },
  { x: BLOCK_SIZE * 0, y: gameBoard.middle },
];

const drawScoreBoard = () => {
  ctx.fillStyle = SCOREBOARD_FILL_COLOR;
  ctx.strokeStyle = SCOREBOARD_BORDER_COLOR;
  ctx.fillRect(scoreBoard.x, scoreBoard.y, scoreBoard.width, scoreBoard.height);
  ctx.strokeRect(
    scoreBoard.x,
    scoreBoard.y,
    scoreBoard.width,
    scoreBoard.height
  );
};

const drawGameBoard = () => {
  ctx.fillStyle = GAMEBOARD_FILL_COLOR;
  ctx.strokeStyle = GAMEBOARD_BORDER_COLOR;
  ctx.fillRect(gameBoard.x, gameBoard.y, gameBoard.width, gameBoard.height);
  ctx.strokeRect(gameBoard.x, gameBoard.y, gameBoard.width, gameBoard.height);
};

const getRandomCoord = (min, max) =>
  toBlocks(Math.random() * (max - min) + min);

const isFoodOnSnake = (foodX, foodY) =>
  snakeParts.some(({ x, y }) => foodX === x && foodY === y);

const didEatFood = () => snakeParts[0].x === foodX && snakeParts[0].y === foodY;

const increaseScore = () => (score += SCORE_INCREMENT);

const createFood = () => {
  foodX = getRandomCoord(gameBoard.x, gameBoard.width);
  foodY = getRandomCoord(gameBoard.y, gameBoard.height);

  if (isFoodOnSnake(foodX, foodY)) {
    createFood();
  }
};

const drawSnakePart = ({ x, y }) => {
  ctx.fillStyle = SNAKE_FILL_COLOR;
  ctx.strokeStyle = SNAKE_BORDER_COLOR;
  ctx.fillRect(x, y, BLOCK_SIZE, BLOCK_SIZE);
  ctx.strokeRect(x, y, BLOCK_SIZE, BLOCK_SIZE);
};

const drawSnake = () => snakeParts.forEach(drawSnakePart);

const drawFood = () => {
  ctx.fillStyle = FOOD_FILL_COLOR;
  ctx.strokeStyle = FOOD_BORDER_COLOR;

  ctx.fillRect(foodX, foodY, BLOCK_SIZE, BLOCK_SIZE);
  ctx.strokeRect(foodX, foodY, BLOCK_SIZE, BLOCK_SIZE);
};

const advanceSnake = () => {
  let x = snakeParts[0].x + dx;
  let y = snakeParts[0].y + dy;

  x = x > gameBoard.width ? gameBoard.x : x < gameBoard.x ? gameBoard.width : x;
  y =
    y > gameBoard.height ? gameBoard.y : y < gameBoard.y ? gameBoard.height : y;

  snakeParts = [{ x, y }].concat(snakeParts);

  if (didEatFood()) {
    createFood();
  } else {
    snakeParts = snakeParts.slice(0, snakeParts.length - 1);
  }
};

const changeDirection = ({ keyCode: pressedKey }) => {
  const LEFT_KEY = 37;
  const RIGHT_KEY = 39;
  const UP_KEY = 38;
  const DOWN_KEY = 40;

  const isGoingUp = dy === -BLOCK_SIZE;
  const isGoingDown = dy === BLOCK_SIZE;
  const isGoingRight = dx === BLOCK_SIZE;
  const isGoingLeft = dx === -BLOCK_SIZE;

  if (pressedKey === UP_KEY && !isGoingDown) {
    dy = -BLOCK_SIZE;
    dx = 0;
  } else if (pressedKey === DOWN_KEY && !isGoingUp) {
    dy = BLOCK_SIZE;
    dx = 0;
  } else if (pressedKey === LEFT_KEY && !isGoingRight) {
    dy = 0;
    dx = -BLOCK_SIZE;
  } else if (pressedKey === RIGHT_KEY && !isGoingLeft) {
    dy = 0;
    dx = BLOCK_SIZE;
  }
};

const drawGrid = () => {
  ctx.strokeStyle = "white";

  for (let x = 0; x < canvasWidth; x += BLOCK_SIZE) {
    for (let y = 0; y < canvasHeight; y += BLOCK_SIZE) {
      ctx.strokeRect(x, y, BLOCK_SIZE, BLOCK_SIZE);
    }
  }
};

let gameInterval;

const startGame = () => {
  gameInterval = setInterval(() => {
    drawScoreBoard();
    drawGameBoard();
    // drawGrid();
    drawFood();
    advanceSnake();
    drawSnake();
  }, 300);
};

const pauseGame = () => {
  clearInterval(gameInterval);
};

const toggleGameState = (e) => {
  const isGameRunning = gameInterval > 0;

  if (isGameRunning) {
    pauseGame();
    gameInterval = 0;
  } else {
    startGame();
  }
};

document.addEventListener("keydown", changeDirection);
// document.getElementById("pause-btn").addEventListener("click", toggleGameState);

startGame();
createFood();
drawGameBoard();
drawSnake();
