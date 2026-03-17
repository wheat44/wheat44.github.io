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
let key;
let cards = [
  {value: "", suit: "",key:""},
  {value: "", suit: "",key:""},
  {value: "", suit: "",key:""},
  {value: "", suit: "",key:""}
];



let buttonX;
let buttonY;
let buttonH;
let buttonW;
let cardWidth;
let cardHeight;
let cardX;
let cardY;


let playStage = 0;

let bet = 0;
let playerMoney = 5000;
let choice;


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
  cardHeight = windowHeight/8;
  cardWidth = windowWidth/16;
  cardX = width / 3;
  cardY = height / 2.5;
}

function draw() {
  displayBG();
  displayButtons();
  displayBet();
  displayCardValue();
  decideCardValue();
  calcResult();
  console.log(state);
}

function displayBG(){
  imageMode(CORNER);
  if (state === 'menu'){
    image(menu,0,0, windowWidth, windowHeight);
  }
  else if (state === 'main' || state === 'play' || state ==='redo'){
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
  else if (state === 'main' || state === 'redo') {
    if (mouseX > (buttonX - 1/2 * buttonW) && mouseX < (buttonX + 1/2 * buttonW) && mouseY > (buttonY - 1/2 *buttonH) && mouseY < (buttonY + 1/2 *buttonH )){
      state = 'play'; 
    }
  }
  ///red pressed
  if (state === 'play') {
    if (mouseX > (buttonX - 1/2 * buttonW - (width/20)) && mouseX < (buttonX + 1/2 * buttonW - (width/20)) && mouseY > (buttonY - 1/2 *buttonH) && mouseY < (buttonY + 1/2 *buttonH )){
      choice = 'red';
      console.log("button worked red");
      if (cards[playStage].suit === 'Hearts' || cards[playStage].suit === 'Diamonds'){
        playStage ++;
      }  
      else{
        state = 'redo';
        console.log("wrong");
      }  
    }
  }
  ///black pressed
  if (state === 'play') {
    if (mouseX > (buttonX - 1/2 * buttonW + (width/20)) && mouseX < (buttonX + 1/2 * buttonW + (width/20)) && mouseY > (buttonY - 1/2 *buttonH) && mouseY < (buttonY + 1/2 *buttonH )){
      choice = 'black';
      console.log("button worked black");
      if (cards[playStage].suit === 'Spades' || cards[playStage].suit === 'Clubs'){
        playStage ++;
      }  
      else{
        state = 'redo';
        console.log("wrong");
      }  
    }
  }
}

function keyPressed(){
  /// r to reset and space to deal cards
  if (key === "r" ) {
    state = "menu";
  }
  if (keyCode === 32 && state === 'main'){
    state = 'play';

  }
  if (keyCode === 38 && state === 'play' && playStage < 4){
    playStage ++;

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
  else if (state === 'instructions'){
    textFont('Courier New');
    textSize(20);
    fill(0,222,41);
    rectMode(CENTER);
    textAlign(CENTER);
    rect(buttonX, buttonY, buttonW, buttonH);
    fill('black');
    text('OKAY!',buttonX, buttonY);
  }
  else if (state === 'main'){
    textFont('Courier New');
    textSize(20);
    fill(0,222,41);
    rectMode(CENTER);
    textAlign(CENTER);
    rect(buttonX, buttonY, buttonW, buttonH);
    fill('black');
    text('Deal!',buttonX, buttonY);
  }

  if (state === 'play'){
    textFont('Courier New');
    textSize(20);
    fill("red");
    rectMode(CENTER);
    textAlign(CENTER);
    rect(buttonX - (width/20), buttonY, buttonW, buttonH);
    fill('white');
    text('red',buttonX - (width/20), buttonY);
  }
  if (state === 'play'){
    textFont('Courier New');
    textSize(20);
    fill("black");
    rectMode(CENTER);
    textAlign(CENTER);
    rect(buttonX + (width/20), buttonY, buttonW, buttonH);
    fill('white');
    text('Black',buttonX + (width/20), buttonY);
  }
}

function mouseWheel(event) {
  ///scrolling down
  if (event.delta > 0 && bet > 0 && state === 'main' && bet <= playerMoney){
    bet -= 25;
  }
  ///scrolling up
  else if(event.delta < 0 && bet < 1000  && state === 'main' && bet <= playerMoney){
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

function displayCardValue(){
  if (state === 'play'){
    for (let i = 0; i < 4; i++){
      if (state === 'play'){
        if (playStage < 1){
          image(bOC, cardX + i * (width/10), cardY, cardWidth, cardHeight);
        }
        else if (playStage === 1){
          if (i >= 1){
            image(bOC, cardX + i * (width/10), cardY, cardWidth, cardHeight);
          }
          else {
            image(cardImages[cards[i].key], cardX + i * (width/10), cardY, cardWidth, cardHeight);
          }
        }
        else if (playStage === 2){
          if (i >= 2){
            image(bOC, cardX + i * (width/10), cardY, cardWidth, cardHeight);
          }
          else {
            image(cardImages[cards[i].key], cardX + i * (width/10), cardY, cardWidth, cardHeight);
          }
        }
        else if (playStage === 3){
          if (i >= 3){
            image(bOC, cardX + i * (width/10), cardY, cardWidth, cardHeight);
          }
          else {
            image(cardImages[cards[i].key], cardX + i * (width/10), cardY, cardWidth, cardHeight);
          }
        }
        else if (playStage === 4){
          image(cardImages[cards[i].key], cardX + i * (width/10), cardY, cardWidth, cardHeight);
        }
      }
    }
  }
}

function decideCardValue(){
  if (state !== 'play'){
    for (let i = 0; i < 4; i++){

      let valueIndex = floor(random(0, 13));
      let suitIndex = floor(random(0, 4));
        

      cards[i].value = values[valueIndex];
      cards[i].suit = suits[suitIndex];
      key = cards[i].value + '_' + cards[i].suit;
      cards[i].key = key;
      
    }
  } 
}

function playButtons(){


}

function calcResult(){
  if (playStage === 4){
    state = 'redo';
    playStage = 0;

  }

}



function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  buttonH = windowHeight/ 15;
  buttonW = windowWidth / 15;
  buttonX = windowWidth /2;
  buttonY = windowHeight / 1.5;
  cardWidth = windowWidth / 8;
  cardHeight = windowHeight/16;
  cardX = windowWidth / 4 ;
  cardY = windowHeight / 2.5;
}