// Grid Based Game
// Tj Ham
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


///designate gamestate
state = 'start';

///define blackBets (temp)
let blackBets = [2,4,6,8,10,11,13,15,17,22,24,26,28,29,31,33,35];


///assign game betting grid
let bettingGrid = [];
const ROWS = 12;
const COLS = 3;

///constant variables



///initialize screen based dimensional variables 
let betHeight;
let betWidth;
let betX;
let betY;
let cellX;
let cellY;
let colour;
let betTextX;
let betTextY;
let wheelX;
let wheelY;
let imgWidth;
let imgHeight;


let angle;


/// wheel variables
let wheelAngle = 0;
let ballAngle = 0;
let spinSpeed = 0.1;
let ballSpeed = -0.2;
let spinning = false;


function preload() {
  ///load background and meny images
  startIMG = loadImage("Assets/BG/Start.png");
  mainIMG = loadImage('Assets/BG/main.png');
  rouletteIMG = loadImage('Assets/IMG/pictures/r88_Casino_pictures/roulette/roulette_wheel.png');
  rouletteBaseIMG = loadImage('Assets/IMG/pictures/r88_Casino_pictures/roulette/roulette_base.png');
  whiteBall = loadImage('Assets/IMG/pictures/r88_Casino_pictures/roulette/roulette_pill1.png');


}


function setup() {
  ///redefine screen base dimensional variables after screenwidth and height was created
  createCanvas(windowWidth, windowHeight);
  betWidth = windowWidth/4;
  betHeight = windowHeight/5;
  betX = windowWidth/2;
  betY = windowHeight/2;
  cellX = windowWidth/25;
  cellY = windowHeight/7;
  wheelX = windowWidth/4;
  wheelY =  windowHeight/1.5;
  imgWidth = windowWidth/3.5;
  imgHeight = windowHeight/2;


  ///create the grid
  createGrid();

}



function draw() {
  ///draw loop
  displayBG();
  drawGrid();
  drawWheel();
  spinWheel();
  console.log(ballSpeed);
}


function createGrid(){
  ///creates the grid based on grid height/ width
  let index = 1;
  for (let y = 0; y < ROWS; y++) {
    bettingGrid.push([]);
    for (let x = 0; x < COLS; x++) {
      bettingGrid[y].push(index);
      index ++;
    }
  }
}

function displayBG(){
  ///display background based on game state
  imageMode(CORNER);
  if (state === 'start'){
    image(startIMG, 0,0, windowWidth, windowHeight);
  }
  else if (state === 'main' || state === 'spin'){
    image(mainIMG, 0,0, windowWidth, windowHeight);
  }
}

function keyPressed(){
  ///space to change menu
  if (key === " ") {
    state = "main";
  }
  if (key === 's'){
    state = 'spin';
  }
  if (key === "h"){
    state = 'spinoff';
    spinning = false;
  }
  /// r to reset
  if (key === "r") {
    state = "start";
  }
}

function windowResized() {
  /// redefine variables when window is resized.
  resizeCanvas(windowWidth, windowHeight);
  betWidth = windowWidth/4;
  betHeight = windowHeight/5;
  betX = windowWidth/2;
  betY = windowHeight/2;
  cellX = windowWidth/25;
  cellY = windowHeight/7;
  wheelX = windowWidth/4;
  wheelY =  windowHeight/1.5;
  imgWidth = windowWidth/3.5;
  imgHeight = windowHeight/2;
}


function drawGrid(){
  /// draws the perviously created grid
  if (state === 'main' || state === 'spin'){
    for (let x = 0; x < ROWS; x++) {
      for (let y = 0; y < COLS; y++) {

        ///calculate bet text location
        betTextX = x*cellX + betX + cellX/2;
        betTextY = y*cellY + betY + cellY/2;

        if ((y+x)%2 === 0){
          colour = 'red';
        }
        else{
          colour = 'black';
        }
        textSize(20);
        textAlign(CENTER);
        fill(colour);
        rect(x*cellX+betX, y*cellY + betY,cellX, cellY);
        fill('white');
        text(bettingGrid[x][y], betTextX, betTextY);
      }
    }
  }

}

function drawWheel(){
  if (state === 'main'){
    imageMode('center');

    image(rouletteIMG,wheelX,wheelY, imgWidth, imgWidth);
    image(rouletteBaseIMG,wheelX, wheelY, imgWidth + imgWidth/3, imgWidth + imgWidth/3);
  }
}

function spinWheel(){
  if (state === 'spin' || state === 'spinoff'){
    imageMode(CENTER);

    // gradually slow down if spinoff
    if (!spinning) {
      spinSpeed *= 0.98;   // wheel slows down
      ballSpeed *= 0.98;   // ball slows down
    }

    // if spinning is super slow, stop spinning to determine a exact value
    if (spinSpeed <= 0.00001){
      spinSpeed = 0;

    }
    if (ballSpeed >= -0.00001){
      ballSpeed = 0;
    }

    // update angles
    wheelAngle += spinSpeed;
    ballAngle += ballSpeed;



    ///draw the wheel 
    push();
    translate(wheelX, wheelY);
    rotate(wheelAngle);
    image(rouletteIMG, 0, 0, imgWidth, imgWidth);
    pop();

    ///draw the base without rotation
    image(rouletteBaseIMG, wheelX, wheelY, imgWidth + imgWidth/3, imgWidth + imgWidth/3);

    ///draw the ball
    push();
    translate(wheelX, wheelY);
    rotate(ballAngle);
    image(whiteBall, 0,0); // place on rim
    pop();
  }
}
  

function placeBets(){

  
}

function calcWinner(){

}

function makeBet(){

}