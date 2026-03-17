//perlin noise demo



let time = 0;


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  fill('black');
  time += 0.01;

  let x = noise(time) *width;
  let y = noise(time+600) *height;
  circle(x, y,50);
}
