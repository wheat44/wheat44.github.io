// Grid Based Game
// Tj Ham
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

state = 'start';

let blackBets = [2,4,6,8,10,11,13,15,17,22,24,26,28,29,31,33,35];


let bettingGrid = [];
const ROWS = 12;
const COLS = 3;
let betHeight;
let betWidth;
let betX;
let betY;
let cellX;
let cellY;
let colour;
let betTextX;
let betTextY;




function preload() {
  ///load background and meny images
  startIMG = loadImage("Assets/BG/Start.png");
  mainIMG = loadImage('Assets/BG/main.png');

}


function setup() {
  createCanvas(windowWidth, windowHeight);
  betWidth = windowWidth/4;
  betHeight = windowHeight/5;
  betX = windowWidth/2;
  betY = windowHeight/2;
  cellX = windowWidth/25;
  cellY = windowHeight/7;


  ///create the grid
  createGrid();

}



function draw() {
  displayBG();
  drawGrid();
}


function createGrid(){
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
  else if (state === 'main'){
    image(mainIMG, 0,0, windowWidth, windowHeight);
  }
}

function keyPressed(){
  if (key === " ") {
    state = "main";
  }
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
}


function drawGrid(){
  if (state === 'main'){
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