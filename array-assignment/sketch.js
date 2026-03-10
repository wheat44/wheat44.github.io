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
let cards = [];


let buttonX;
let buttonY;
let buttonH;
let buttonW;
let cardWidth;
let cardHeight;


let inPlay = false;

let bet = 0;
let playerMoney = 5000;


function preload() {
  ///load background and meny images
  main = loadImage("Assets/BG/mainBG.jpg");
  menu = loadImage("Assets/BG/menu.png");
  instructions = loadImage('Assets/BG/instructions.png');

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
  displayBet();
}

function displayBG(){
  if (state === 'menu'){
    image(menu,0,0, windowWidth, windowHeight);
  }
  else if (state === 'main'){
    image(main, 0, 0, windowWidth, windowHeight);
  }
  else if (state === 'instructions'){
    image(instructions, 0,0, windowWidth, windowHeight);
  }
}

function mousePressed(){
  if (state === 'menu') {
    if (mouseX > (buttonX - 1/2 * buttonW) && mouseX < (buttonX + 1/2 * buttonW) && mouseY > (buttonY - 1/2 *buttonH) && mouseY < (buttonY + 1/2 *buttonH )){
      state = 'instructions';
      console.log('poop');
    }
  }
  else if (state === 'instructions') {
    if (mouseX > (buttonX - 1/2 * buttonW) && mouseX < (buttonX + 1/2 * buttonW) && mouseY > (buttonY - 1/2 *buttonH) && mouseY < (buttonY + 1/2 *buttonH )){
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
  if (state === 'instructions'){
    fill(0,222,41);
    rectMode(CENTER);
    textAlign(CENTER);
    rect(buttonX, buttonY, buttonW, buttonH);
    fill('black');
    text('OKAY!',buttonX, buttonY);
  }
}

function mouseWheel(event) {
  ///scrolling down
  if (event.delta > 0 && bet > 0 && inPlay === false && state === 'main' && bet <= playerMoney){
    bet -= 25;
  }
  ///scrolling up
  else if(event.delta < 0 && bet < 1000 && inPlay === false && state === 'main' && bet <= playerMoney){
    bet += 25;
  }
  ///prevent screen from scrolling when mouse scrolls 
  return false;
}

function displayBet(){
  if (state === 'main'){
    fill(20,186,43);
    textSize(20);
    let amount = bet;
    text("Bet: $" + amount, windowWidth * 0.1, windowHeight * 0.2);
    let money = playerMoney;
    text("Money: $" + money, windowWidth * 0.1, windowHeight * 0.25);
    
  }
}

function displayBackCards(){
  imageMode(CENTER);
  image(bOC,width/2 - width/60, height/2, cardWidth, cardHeight);
  image(bOC,width/2 - width/30, height/2, cardWidth, cardHeight);
}






function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  buttonH = windowHeight/ 15;
  buttonW = windowWidth / 15;
  buttonX = windowWidth /2;
  buttonY = windowHeight / 1.5;
}
