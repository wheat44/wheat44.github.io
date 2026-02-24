/// Assign Gamestate
state = "menu";

/// Assign values and define terms
let suits = ["Spade", "Heart", "Diamond", "Club"];
let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
let buttonX = 50;
let buttonY = 50;
let buttonR = 75;
let button = false;


/// preload
function preload() {
  ///load all images
  bg = loadImage("Assets/BG/background.webp");
  menu = loadImage("Assets/BG/blackjack bg.png");
  instructionsImg  = loadImage("Assets/instructions.png")
}

function setup() {
  let canvasH = windowHeight;
  let canvasW = windowWidth;
  createCanvas(canvasW, canvasH);
}

function draw() {
  // console.log(state);
  displayBg();
  startButton();
  console.log(button)
  instructions()
}

function displayCard(value, suit) {}

function displayBg() {
  if (state === "main") {
    image(bg, 0, 0, width, height);
  }
  if (state === "menu") {
    image(menu, 0, 0, width, height);
  }
}

function startButton() {
  if (state === "menu") {
    fill(0);
    circle(buttonX, buttonY, buttonR);
    fill(255);
    text("start", buttonX, buttonY);
  }
}

///start menu button
function mousePressed() {
  let buttonDist = dist(mouseX, mouseY, buttonX, buttonY);
  if ((buttonDist < buttonR / 2) && state === 'menu') {
    button = !button;
    state = 'main';  
  }
}
    
function keyPressed() {
  if (key === "r") {
    state = "menu";
  }
}

function instructions(){
  if(state === 'main'){
    text('space to deal cards',20,20);
    image(instructionsImg,40,40,200,200)
  }
}

function dealCards(){
  
}

function changeBet(){
  
}

function calcScore(){
  
}

function displayResult(){
  
}

