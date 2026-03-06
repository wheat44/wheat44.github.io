// Ball Array Demo
// TJ HAM
// 3/3/2026

let ballArray = [];


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(12,124,91);
  for (let ball of ballArray){
    fill(ball.r,ball.g,ball.b);
    ball.x += ball.dx;
    ball.y += ball.dy;
    circle(ball.x,ball.y,ball.radius*2);
    if (ball.x > width){
      ball.x = 0;
    }
    if (ball.x < 0){
      ball.x = width;
    }
    if (ball.y >height){
      ball.y = 0;
    }
    if (ball.y < 0){
      ball.y = height;
    }
  }

}

function mousePressed(){
  spawnBall(mouseX,mouseY);
}
function spawnBall(_x, _y){
  let ball = {
    x:_x,
    y:_y,
    dx: random (-5,5),
    dy: random(-5,5),
    radius: random (10,30),
    r: random(0,255),
    g:random(0,255),
    b: random(0,255),
  };

  ballArray.push(ball);
}

function drawBall(){
  for (let ball of ballArray){
  }
}


function windowResized(){
  windowWidth = windowWidth;
  windowHeight = windowHeight;
}