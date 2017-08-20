function gameplay(ctx, canvasWidth, canvasHeight) {

  width = canvasWidth / 100;
  height = canvasHeight / 100;

  var ground1 = new Shape(45 * width, 0);
  ground1.draw(ctx, 0, 70 * height, false, true);

  var ground2 = new Shape(45 * width, 0);
  ground2.draw(ctx, 55 * width, 70 * height, false, true);

  var character = new Shape(10 * width, 10 * height);
  character.draw(ctx, 10 * width, 60 * height, true, false);
}

function Shape(width, height) {
  this.width = width;
  this.height = height;
}

Shape.prototype.draw = function(ctx, posx, posy, ifRect, ifLine) {
  ctx.moveTo(posx, posy);
  if (ifRect) {
    ctx.fillRect(posx, posy, this.width, this.height);
  } else if (ifLine) {
    ctx.moveTo(posx, posy);
    ctx.lineTo(posx + this.width, posy + this.height);
    ctx.stroke();
  }
}
