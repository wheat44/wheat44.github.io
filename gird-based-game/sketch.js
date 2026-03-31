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
  console.log(angle);
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

    push(); 

    // move origin to wheel center
    translate(wheelX, wheelY); 

    // rotate around that point
    rotate(angle); 
    image(rouletteIMG, 0, 0, imgWidth, imgWidth); // draw centered

    // restore canvas
    pop(); 

    // draw base after so it doesn't spin
    image(rouletteBaseIMG, wheelX, wheelY, imgWidth + imgWidth/3, imgWidth + imgWidth/3);
  }
}

function spinWheel(){
  if (state === 'spin'){
    imageMode(CENTER);

    // faster spin
    angle = frameCount /400;
    

    // save canvas state
    push(); 

    // move origin to wheel center
    translate(wheelX, wheelY); 

    // rotate around that point
    rotate(angle); 
    image(rouletteIMG, 0, 0, imgWidth, imgWidth); 
    
    

    // restore canvas
    pop(); 

    // draw base after so it doesn't spin
    image(rouletteBaseIMG, wheelX, wheelY, imgWidth + imgWidth/3, imgWidth + imgWidth/3);


    ///draw the white ball in reverse direction
    push();
    translate(wheelX,wheelY);
    rotate(angle/-1);
    image(whiteBall, 20,20 );
    pop();
  }
  else if (state === 'spinoff'){
    imageMode(CENTER);
    for (let spinoff = 400; spinoff > 0 ; spinoff--){
      

      angle = frameCount / spinoff;
    
      // save canvas stated
      push(); 

      // move origin to wheel center
      translate(wheelX, wheelY); 

      // rotate around that point
      rotate(angle); 
      image(rouletteIMG, 0, 0, imgWidth, imgWidth); 
      image(whiteBall, 20,20 );
      
      
      // restore canvas
      pop(); 

      // draw base after so it doesn't spin
      image(rouletteBaseIMG, wheelX, wheelY, imgWidth + imgWidth/3, imgWidth + imgWidth/3);
    }
  }
  
  
}

function calcWinner(){

}

function makeBet(){

}