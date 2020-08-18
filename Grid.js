export class Grid {
  draw(ctx) {
    ctx.strokeStyle = "white";

    for (let x = 0; x < canvasWidth; x += config.BLOCK_SIZE) {
      for (let y = 0; y < canvasHeight; y += config.BLOCK_SIZE) {
        ctx.strokeRect(x, y, config.BLOCK_SIZE, config.BLOCK_SIZE);
      }
    }
  }
}
