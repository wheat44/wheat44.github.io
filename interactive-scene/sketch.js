/// Assign Gamestate
state = "menu";

/// Assign global variables and define terms
/// dont forget to make all of the button varibles based on screen height/width so it can resize
let suits = ["Spades", "Hearts", "Diamonds", "Clubs"];
let values = [ "2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king", "ace"];
let cardImages = {};
let buttonX = 50;
let buttonY = 50;
let buttonR = 75;
let button = false;
let bet = 100
let playerMoney = 5000
let deal = false;
let card = {
  cardValue: values[12],
  cardSuite: suits[2]
};



/// preload
function preload() {
  ///load all images
  bg = loadImage("Assets/BG/background.webp");
  menu = loadImage("Assets/BG/blackjack bg.png");
  instructionsImg  = loadImage("Assets/instructions.png");

  ///load cards using a nested loop
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 12; j++) {
      let fileName = values[j] + "_of_" + suits[i] + ".svg";
      let key = values[j] + "_" + suits[i];
      /// key in form 2_Spades

      cardImages[key] = loadImage("Assets/Cards/" + fileName);
    }
  }
}

function setup() {
  let canvasH = windowHeight;
  let canvasW = windowWidth;
  createCanvas(canvasW, canvasH);
}

function draw() {
  console.log(deal);
  displayBg();
  startButton();
  // console.log(state);
  instructions();
  displayBet();
  dealCards();
}

function displayCard(value, suit) {}

function displayBg() {
  if (state === "main" || state === 'play') {
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

///button mousepressed controls
function mousePressed() {
  let buttonDist = dist(mouseX, mouseY, buttonX, buttonY);
  if ((buttonDist < buttonR / 2) && state === 'menu') {
    button = !button;
    state = 'main';  
  }
  else if ((buttonDist < buttonR / 2) && state === 'main') {
    button = !button;
    state = 'play';  
  }
}

/// display instructions when game starts
function instructions(){
  if(state === 'main'){
    text('space to deal cards',20,20);
    image(instructionsImg,40,40,200,200)
    let buttonDist = dist(mouseX, mouseY, buttonX, buttonY);
    fill(0)
    circle(buttonX,buttonY,buttonR)
    fill(255)
    text("OKAY!", buttonX, buttonR)
  }
}

function keyPressed(){
  ///space pressed changes deal to true
  if (keyCode === 32 && state === 'play'){
    deal = true;
  }
  /// r to reset 
  if (key === "r") {
    state = "menu";
  }
}
    
function dealCards(){
  if (deal === true){
    let randSuits1 = floor(random(0,3))
    let randValue1 = floor(random(0,12))
    image(cardImages[values[randValue1] + '_' + suits[randSuits1]], 600, 600, 200, 200)
    let randSuits2 = floor(random(0,3))
    let randValue2 = floor(random(0,12))
    image(cardImages[values[randValue2] + '_' + suits[randSuits2]], 1000, 600, 200, 200)
    deal = false
  }
}

///mousewheel betting control
function mouseWheel(event) {
  ///scrolling down
  if (event.delta > 0 && bet > 0){
    bet -= 25;
  }
  ///scrolling up
  else if(event.delta < 0 && bet < 1000){
    bet += 25;
  }
  ///prevent screen from scrolling when mouse scrolls 
  return false 
}

function displayBet(){
  if (state === 'play'){
    let amount = bet
    text(amount, 80,80)
    
  }
}



function calcScore(){
  
}

function displayResult(){
  
}

/// if window is resized, resize the canvas
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}