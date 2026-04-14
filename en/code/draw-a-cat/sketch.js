let img;

function preload() {
  img = loadImage(
    "cat.png",
    () => {
      const status = document.getElementById("status");
      if (status) status.textContent = "Loaded cat.png successfully.";
      console.log("Image loaded");
    },
    (err) => {
      const status = document.getElementById("status");
      if (status) status.textContent = "Failed to load cat.png. Check console/network tab.";
      console.error("Image failed to load", err);
    }
  );
}

function setup() {
  const canvas = createCanvas(256, 256);
  canvas.parent("canvas-wrap");
  background(245);
  image(img, 0, 0, width, height);
}

function draw() {
  // No-op: static repro.
}