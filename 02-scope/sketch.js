// scope demo

let number = 80;

function setup() {
  createCanvas(700, 400);
  background('black');
  stroke("white");
  noLoop();
}

function draw() {
  line(number, 0, number,height);

  for(let number = 120; number < 200; number += 2){
    line(number,0,number,height);
  }

  drawAnotherLine();
  
}
