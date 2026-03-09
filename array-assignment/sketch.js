// Array Assignmemnt - Ride the buss
// Tj Ham
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let state = 'menu';

let suits = ["Spades", "Hearts", "Diamonds", "Clubs"];
let values = [ "ace","2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king"];
let cardImages = [];


let buttonX;
let buttonY;
let buttonH;
let buttonW;

function preload() {
  ///load background and meny images
  main = loadImage("Assets/BG/mainBG.jpg");
  menu = loadImage("Assets/BG/menu.png");
  // instructionsImg  = loadImage("Assets/BG/Instructions_BG.png");

  //back of card
  bOC = loadImage('Assets/Cards/back_of_card.png');

  ///load cards using a nested loop
  for (let index = 0; index < 4; index++) {
    for (let j = 0; j < 13; j++) {
      let fileName = values[j] + "_of_" + suits[index] + ".svg";
      let key = values[j] + "_" + suits[index];
      /// key in form 2_Spades

      cardImages[key] = loadImage("Assets/Cards/" + fileName);
    }
  }
}









function setup() {
  createCanvas(windowWidth, windowHeight);
  buttonH = windowHeight/ 15;
  buttonW = windowWidth / 15;
  buttonX = windowWidth / 2;
  buttonY = windowHeight / 1.5;
}

function draw() {
  displayBG();
  displayButtons();
}

function displayBG(){
  if (state === 'menu'){
    image(menu,0,0, windowWidth, windowHeight);
  }
  else if (state === 'main'){
    image(main, 0, 0, windowWidth, windowHeight);
  }
}

function mousePressed(){
  if (state === 'menu') {

    if (mouseX > buttonX && mouseX < buttonX + buttonW && mouseY > buttonY && mouseY < buttonY +buttonH ) {
      state = 'main';
      console.log('poop');
    }
  }
}

function keyPressed(){
  /// r to reset 
  if (key === "r") {
    state = "menu";
  }
}

function displayButtons(){
  if (state === 'menu'){
    fill(0,222,41);
    rectMode(CENTER);
    textAlign(CENTER);
    rect(buttonX, buttonY, buttonW, buttonH);
    fill('black');
    text('START!',buttonX, buttonY);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  buttonH = windowHeight/ 15;
  buttonW = windowWidth / 15;
  buttonX = windowWidth /2;
  buttonY = windowHeight / 1.5;
}
