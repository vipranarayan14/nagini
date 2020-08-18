import { BLOCK_SIZE } from "./config.js";

export const toBlocks = (num) => Math.floor(num / BLOCK_SIZE) * BLOCK_SIZE;

export const getRandomCoord = (min, max) =>
  toBlocks(Math.random() * (max - min) + min);
