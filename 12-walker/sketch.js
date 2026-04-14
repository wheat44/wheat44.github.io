// Walker OOP Demo

class Walker{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.color = "red";
    this.speed = 1;
    this.diameter = 2;
  }
  display(){
    fill(this.color);
    stroke(this.color);
    circle(this.x,this.y,this.diameter);
  }

  move(){
    let choice = random(100);
    if (choice < 25) {
      //up
      this.y -= this.speed;
    }
    else if (choice < 50){
      this.y += this.speed;

    }
    else if (choice < 75){
      this.x += this.speed;
    }
    else{
      this.x -= this.speed;
    }
  }
}

let tyler;

function setup() {
  createCanvas(windowWidth, windowHeight);
  tyler = new Walker(width/2, height/2);
  audrey = new Walker (300,500);
  audrey.color = 'blue';
}



function draw() {
  tyler.display();
  tyler.move();
  audrey.display();
  audrey.move();
}
