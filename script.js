const CANVAS_FILL_COLOR = "#3c3c3c";
const CANVAS_BORDER_COLOR = CANVAS_FILL_COLOR;
const SNAKE_FILL_COLOR = "green";
const SNAKE_BORDER_COLOR = "darkgreen";
const FOOD_FILL_COLOR = "red";
const FOOD_BORDER_COLOR = FOOD_FILL_COLOR;

const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

const canvasHeight = canvas.height;
const canvasWidth = canvas.width;

let dx = 20,
  dy = 0;

let foodX = 0,
  foodY = 0;

let snakeParts = [
  { x: 40, y: canvasHeight / 2 },
  { x: 20, y: canvasHeight / 2 },
  { x: 0, y: canvasHeight / 2 },
];

const clearCanvas = () => {
  ctx.fillStyle = CANVAS_FILL_COLOR;
  ctx.strokeStyle = CANVAS_BORDER_COLOR;
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  ctx.strokeRect(0, 0, canvasWidth, canvasHeight);
};

const getRandomCoord = (min, max) =>
  Math.round((Math.random() * (max - min) + min) / 20) * 20;

const isFoodOnSnake = (foodX, foodY) =>
  snakeParts.some(({ x, y }) => foodX === x && foodY === y);

const didEatFood = () => snakeParts[0].x === foodX && snakeParts[0].y === foodY;

const createFood = () => {
  foodX = getRandomCoord(0, canvasWidth);
  foodY = getRandomCoord(0, canvasHeight);

  if (isFoodOnSnake(foodX, foodY)) {
    createFood();
  }
};

const drawSnakePart = ({ x, y }) => {
  ctx.fillStyle = SNAKE_FILL_COLOR;
  ctx.strokeStyle = SNAKE_BORDER_COLOR;
  ctx.fillRect(x, y, 20, 20);
  ctx.strokeRect(x, y, 20, 20);
};

const drawSnake = () => snakeParts.forEach(drawSnakePart);

const drawFood = () => {
  ctx.fillStyle = FOOD_FILL_COLOR;
  ctx.strokeStyle = FOOD_BORDER_COLOR;

  ctx.fillRect(foodX, foodY, 20, 20);
  ctx.strokeRect(foodX, foodY, 20, 20);
};

const advanceSnake = () => {
  let x = snakeParts[0].x + dx;
  let y = snakeParts[0].y + dy;

  x = x > canvasWidth ? 0 : x < 0 ? canvasWidth : x;
  y = y > canvasHeight ? 0 : y < 0 ? canvasHeight : y;

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

  const isGoingUp = dy === -20;
  const isGoingDown = dy === 20;
  const isGoingRight = dx === 20;
  const isGoingLeft = dx === -20;

  if (pressedKey === UP_KEY && !isGoingDown) {
    dy = -20;
    dx = 0;
  } else if (pressedKey === DOWN_KEY && !isGoingUp) {
    dy = 20;
    dx = 0;
  } else if (pressedKey === LEFT_KEY && !isGoingRight) {
    dy = 0;
    dx = -20;
  } else if (pressedKey === RIGHT_KEY && !isGoingLeft) {
    dy = 0;
    dx = 20;
  }
};

// const drawGrid = () => {
//   ctx.strokeStyle = "white";

//   for (let x = 0; x < canvasWidth; x += 20) {
//     for (let y = 0; y < canvasHeight; y += 20) {
//       ctx.strokeRect(x, y, 20, 20);
//     }
//   }
// };

let gameInterval;

const startGame = () => {
  gameInterval = setInterval(() => {
    clearCanvas();
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
document.getElementById("pause-btn").addEventListener("click", toggleGameState);

startGame();
createFood();
clearCanvas();
drawSnake();
