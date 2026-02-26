// Images Demo

function preload() {
  nalinda = loadImage('nalinda.jpg');
  diddy = loadImage('diddy.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  image(nalinda, mouseX, mouseY, windowWidth /8, windowHeight/8);
  image(diddy,mouseX - 600 ,mouseY, diddy.height / 2, diddy.width/ 2);
}
