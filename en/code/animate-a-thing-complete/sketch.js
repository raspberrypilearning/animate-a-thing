const ratFrames = [];

let x;
let facing = 1; // 1 = right, -1 = left
let frameIndex = 0;
let frameStep = 1;

const moveSpeed = 3;
const animationDelay = 6;
const spriteHeight = 96;
const groundHeight = 90;

function preload() {
  for (let i = 0; i <= 5; i += 1) {
    ratFrames.push(loadImage(`rat_${i}.png`));
  }
}

function setup() {
  const canvas = createCanvas(900, 420);
  canvas.parent('sketch-holder');

  imageMode(CENTER);
  noSmooth();

  x = width / 2;
}

function draw() {
  drawBackground();

  let moving = false;

  if (keyIsDown(LEFT_ARROW) && !keyIsDown(RIGHT_ARROW)) {
    x -= moveSpeed;
    facing = -1;
    moving = true;
  } else if (keyIsDown(RIGHT_ARROW) && !keyIsDown(LEFT_ARROW)) {
    x += moveSpeed;
    facing = 1;
    moving = true;
  }

  const currentFrame = ratFrames[frameIndex];
  const drawH = spriteHeight;
  const drawW = (currentFrame.width / currentFrame.height) * drawH;
  const halfW = drawW / 2;
  const y = height - groundHeight - drawH / 2;

  x = constrain(x, halfW, width - halfW);

  if (moving && frameCount % animationDelay === 0) {
    advanceWalkCycle();
  }

  drawRat(currentFrame, drawW, drawH, y);
}

function advanceWalkCycle() {
  frameIndex += frameStep;

  if (frameIndex >= ratFrames.length - 1 || frameIndex <= 0) {
    frameStep *= -1;
  }
}

function drawRat(frameImage, drawW, drawH, y) {
  push();
  translate(x, y);

  if (facing === -1) {
    scale(-1, 1);
  }

  image(frameImage, 0, 0, drawW, drawH);
  pop();
}

function drawBackground() {
  background(27, 32, 44);

  noStroke();
  fill(40, 48, 66);
  rect(0, height - groundHeight, width, groundHeight);

  fill(58, 68, 92);
  for (let i = 0; i < width; i += 70) {
    rect(i, height - groundHeight, 40, groundHeight);
  }
}
