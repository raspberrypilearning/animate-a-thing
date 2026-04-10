const ratFrames = [];

let ratX;
let frameIndex = 0;
let facingLeft = false;

const moveSpeed = 3;
const animationDelay = 6;
const ratWidth = 80;
const ratHeight = 80;

function preload() {
  for (let frameNumber = 0; frameNumber < 6; frameNumber += 1) {
  ratFrames.push(loadImage(`rat_${frameNumber}.png`));
  }
}

function setup() {
  createCanvas(900, 420);
  imageMode(CENTER);
  noSmooth();
  ratX = width / 2;
}

function draw() {
  background(180, 220, 255);

  let isMoving = false;

  if (keyIsDown(LEFT_ARROW)) {
    ratX -= moveSpeed;
    facingLeft = true;
    isMoving = true;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    ratX += moveSpeed;
    facingLeft = false;
    isMoving = true;
  }

  if (isMoving && frameCount % animationDelay === 0) {
    advanceWalkCycle();
  }

  let ratY = height - ratHeight / 2 - 20;
  drawRat(ratX, ratY);
}

function drawRat(x, y) {
  push();
  translate(x, y);
  if (facingLeft) {
    scale(-1, 1);
  }
  image(ratFrames[frameIndex], 0, 0, ratWidth, ratHeight);
  pop();
}

function advanceWalkCycle() {
  frameIndex += 1;
  if (frameIndex >= ratFrames.length) {
    frameIndex = 0;
  }
}