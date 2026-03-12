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
let cards = [
  {value: "", suit: ""},
  {value: "", suit: ""},
  {value: "", suit: ""},
  {value: "", suit: ""}
];



let buttonX;
let buttonY;
let buttonH;
let buttonW;
let cardWidth;
let cardHeight;
let cardX;
let cardY;


let inPlay = false;

let bet = 0;
let playerMoney = 5000;


function preload() {
  ///load background and meny images
  main = loadImage("Assets/BG/mainBG.jpg");
  menu = loadImage("Assets/BG/menu.png");
  instructions = loadImage('Assets/BG/instructions.png');

  ///load font
  font = loadFont('Assets/Moralana Demo.otf');

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
  cardHeight = windowHeight/20;
  cardWidth = windowWidth/20;
  cardX = width / 3;
  cardY = height / 2.5;
}

function draw() {
  displayBG();
  displayButtons();
  displayBet();
  chooseCardValue();
  console.log(state);
}

function displayBG(){
  imageMode(CORNER);
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

function mouseClicked(){
  if (state === 'menu') {
    if (mouseX > (buttonX - 1/2 * buttonW) && mouseX < (buttonX + 1/2 * buttonW) && mouseY > (buttonY - 1/2 *buttonH) && mouseY < (buttonY + 1/2 *buttonH )){
      state = 'instructions';
    }
  }
  else if (state === 'instructions') {
    if (mouseX > (buttonX - 1/2 * buttonW) && mouseX < (buttonX + 1/2 * buttonW) && mouseY > (buttonY - 1/2 *buttonH) && mouseY < (buttonY + 1/2 *buttonH )){
      state = 'main'; 
    }
  }
  else if (state === 'main') {
    if (mouseX > (buttonX - 1/2 * buttonW) && mouseX < (buttonX + 1/2 * buttonW) && mouseY > (buttonY - 1/2 *buttonH) && mouseY < (buttonY + 1/2 *buttonH )){
      state = 'play'; 
      inPlay = 'true';
    }
    
  }
}

function keyPressed(){
  /// r to reset and space to deal cards
  if (key === "r" && inPlay === false) {
    state = "menu";
  }
  if (key === "space" && state === 'main'){
    state = 'play';
    inPlay = true;
  }
}

function displayButtons(){
  if (state === 'menu'){
    textFont('Courier New');
    textSize(20);
    fill(0,222,41);
    rectMode(CENTER);
    textAlign(CENTER);
    rect(buttonX, buttonY, buttonW, buttonH);
    fill('black');
    text('START!',buttonX, buttonY);
  }
  if (state === 'instructions'){
    textFont('Courier New');
    textSize(20);
    fill(0,222,41);
    rectMode(CENTER);
    textAlign(CENTER);
    rect(buttonX, buttonY, buttonW, buttonH);
    fill('black');
    text('OKAY!',buttonX, buttonY);
  }
  if (state === 'main'){
    textFont('Courier New');
    textSize(20);
    fill(0,222,41);
    rectMode(CENTER);
    textAlign(CENTER);
    rect(buttonX, buttonY, buttonW, buttonH);
    fill('black');
    text('Deal!',buttonX, buttonY);
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
    textFont(font);
    fill(194,146,78);
    textSize(30);
    let amount = bet;
    text("Bet: $" + amount, windowWidth * 0.1, windowHeight * 0.2);
    let money = playerMoney;
    text("Money: $" + money, windowWidth * 0.1, windowHeight * 0.25);
    ellipseMode(CENTER);
    fill(196, 180,150);
    ellipse(windowWidth * 0.15, windowWidth* 0.23, 80, 40, 6);
    
  }
}

function chooseCardValue(){
  if (state === 'play'){

    for (let i = 0; i < 4; i++){

      let valueIndex = floor(random(0, 13));
      let suitIndex = floor(random(0, 4));
      

      cards[i].value = values[valueIndex];
      cards[i].suit = suits[suitIndex];
      let key = cards[i].value + '_' + cards[i].suit;
      image(cardImages[key], cardX + i * (width/10), cardY, cardWidth, cardHeight);
    }

  }
}





function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  buttonH = windowHeight/ 15;
  buttonW = windowWidth / 15;
  buttonX = windowWidth /2;
  buttonY = windowHeight / 1.5;
  cardWidth = windowWidth / 10;
  cardHeight = windowHeight/20;
  cardX = width / 4 ;
  cardY = height / 2.5;
}
