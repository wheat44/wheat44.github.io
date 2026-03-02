// Images Demo

function preload() {
  nalinda = loadImage('nalinda.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  image(nalinda, mouseX, mouseY, windowWidth /8, windowHeight/8);
}
