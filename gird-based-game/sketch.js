// Grid Based Game
// Tj Ham
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

state = 'start';


let bettingGrid = [];
const ROWS = 12;
const COLS = 3;




function preload() {
  ///load background and meny images
  startIMG = loadImage("Assets/BG/Start.png");
  mainIMG = loadImage('Assets/BG/main.png');

}


function setup() {
  createCanvas(windowWidth, windowHeight);
  let betWidth = windowWidth/4;
  let betHeight = windowHeight/5;
  let betX = windowWidth/1.5;
  let betY = windowHeight/2;
  let cell_size = windowWidth/40;

  ///create the grid
  let index = 1;
  for (let y = 0; y < ROWS; y++) {
    bettingGrid.push([]);
    
    for (let x = 0; x < COLS; x++) {
      bettingGrid[y].push(index);
      index ++;

    }
  }
}

function draw() {
  displayBG;
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
}


function drawGrid(){

}