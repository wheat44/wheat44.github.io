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

function preload() {
  ///load background and meny images
  bg = loadImage("Assets/BG/background.png");
  menu = loadImage("Assets/BG/blackjack bg.png");
  instructionsImg  = loadImage("Assets/BG/Instructions_BG.png");

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
}

function draw() {
  background(220);
}
