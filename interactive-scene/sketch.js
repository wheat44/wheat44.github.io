/// Assign Gamestate
state = "menu";

/// Assign global variables and define terms
/// dont forget to make all of the button varibles based on screen height/width so it can resize

/// create arrays for suits, values, images, and player cards
let suits = ["Spades", "Hearts", "Diamonds", "Clubs"];
let values = [ "ace","2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king"];
let cardImages = {};
let playerCards = [];


///button locations and dimensions
let buttonX = 50;
let buttonY = 50;
let buttonR = 75;
let hButtonX = 50;
let hButtonY = 150;
let hButtonR = 75;
let sButtonX = 50;
let sButtonY = 250;
let sButtonR = 75;

///game substates
let button = false;
let hit = false;
let deal = false;
let stand = false;


///numerical game variables 
let bet = 100
let playerMoney = 5000
let score = 0;

///define card object for testing purposes, will be used to store card info when dealing cards to player
let card = {
  cardValue: values[12],
  cardSuite: suits[2]
};



/// preload
function preload() {
  ///load background and meny images
  bg = loadImage("Assets/BG/background.webp");
  menu = loadImage("Assets/BG/blackjack bg.png");
  instructionsImg  = loadImage("Assets/instructions.png");

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
  ///define canvas size based on window size
  let canvasH = windowHeight;
  let canvasW = windowWidth;
  createCanvas(canvasW, canvasH);
}

function draw() {
  // console.log(deal);
  displayBg();
  startButton();
  // console.log(state);
  instructions();
  displayBet();
  dealCards();
  calcScore();
  console.log(score);
  displayResult();
}


function displayBg() {
  if (state === "main" || state === 'play') {
    image(bg, 0, 0, width, height);
  }
  if (state === "menu") {
    image(menu, 0, 0, width, height);
  }
}

function startButton() {
  ///display start button when in menu state
  if (state === "menu") {
    fill(0);
    circle(buttonX, buttonY, buttonR);
    fill(255);
    text("start", buttonX, buttonY);
  }
  ///display hit button when in play state
  if (state === "play") {
    fill(0);
    circle(hButtonX, hButtonY, hButtonR);
    fill(255);
    text("hit", hButtonX, hButtonY);
  }
  if (state === "play") {
    ///display stand button when in play state
    fill(0);
    circle(sButtonX, sButtonY, sButtonR);
    fill(255);
    text("stand", sButtonX, sButtonY);
  }
}

///button mousepressed controls
function mousePressed() {

  /// if in menu do start button control
  if (state === 'menu') {
    let buttonDist = dist(mouseX, mouseY, buttonX, buttonY);

    if (buttonDist < buttonR / 2) {
      state = 'main';
    }
  }

  /// if in main do the instructions button contorl
  else if (state === 'main') {
    let buttonDist = dist(mouseX, mouseY, buttonX, buttonY);

    if (buttonDist < buttonR / 2) {
      state = 'play';
    }
  }

  /// if in play do the hit and stand button contorl
  else if (state === 'play') {

    let hButtonDist = dist(mouseX, mouseY, hButtonX, hButtonY);
    let sButtonDist = dist(mouseX, mouseY, sButtonX, sButtonY);

    if (hButtonDist < hButtonR / 2) {
      hit = true;
    }

    if (sButtonDist < sButtonR / 2) {
      stand = true;
    }
  }
}

/// display instructions when game starts
function instructions(){
  if(state === 'main'){
    textSize(80);
    text('space to deal cards',width/2-200,height-200);
    image(instructionsImg,40,40,200,200)
    let buttonDist = dist(mouseX, mouseY, buttonX, buttonY);
    fill(0)
    circle(buttonX,buttonY,buttonR)
    fill(255)
    textSize(20);
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
    
function dealCards() {

/// when new deal is called reset all varaibles
  if (deal === true) {

    playerCards = []; // clear old cards
    hit = false; // reset hit
    stand = false; // reset stand
    score = 0; // reset score

/// deal the first 2 cards, evenly scaped out using index variable
    for (let index = 0; index < 2; index++) {
      playerCards.push({
        suit: floor(random(0,4)),
        value: floor(random(0,13))
      });
    }

    deal = false;
  }

/// hit button adds card to player hand
  if (hit === true && score < 21) {
    playerCards.push({
      suit: floor(random(0,4)),
      value: floor(random(0,13))
    });

    hit = false;
  }

///draw the cards
  if (state === 'play') {

    for (let index = 0; index < playerCards.length; index++) {

      let card = playerCards[index];

      let key = values[card.value] + '_' + suits[card.suit];

      image(cardImages[key], 400 + index * 250, 600, 200, 200);
    }
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
    textSize(20);
    let amount = bet
    text("bet amount: " + amount, 80,80)
    let money = playerMoney
    text("money: " + money, 80,60)
    
  }
}



function calcScore(){
   if (state !== 'play' || playerCards.length === 0) return; /// if not in play state or no cards dealt return to avoid errors

    score = 0;
    let aceCount = 0; /// track number of aces for ace adjustment
    

    for (let index = 0; index < playerCards.length; index++) {/// loop through player cards and calculate score
      let value = playerCards[index].value;


      if (value === 0) { /// if card is an ace
        aceCount++;
        score += 11; /// count ace as 11
      }

      else if (value >= 10) { /// if card is a face card
        score += 10;
      }

      else { /// for cards 2-10
        score += value + 1; /// add 1 because card values are 0 indexed
    }
    

    // Ace adjustment
      while (score > 21 && aceCount > 0) {
        score -= 10;
        aceCount--;
      }

    

    //calulate for bust
    if (score > 21){
      textSize(50);
      fill('black')
      text("BUST!", width/2, height/2);
    }
    score = score;   
    }
}

function getCardValue(index){
  /// Determine the value of the card based on its index in the values array

  if (index === 0) return 11; // Ace

  if (index >= 10) return 10; // Jack, Queen, King

  return index + 1; // because 2 is index 1, 3 is index 2, etc.
}

function displayResult(){
  if (state === 'play'){ /// if not in play dont display score
    textSize(20);
    fill(255);
    text("score: " + score, 80,100);
  }
  
}

/// if window is resized, resize the canvas
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}