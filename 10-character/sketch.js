// Rectangular Grid 2d Array Demo

const CELL_SIZE = 100;
const OPEN_TILE = 0;
const IMPASSIBLE = 1;
const PLAYER = 9;

let grid;
let rows;
let cols;
let thePlayer = {
  x: 0,
  y: 0,
};

function preload(){
  nalinda = loadImage('nalinda.jpg');
  dimal = loadImage('dimal.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  rows = Math.floor(height/CELL_SIZE);
  cols = Math.floor(width/CELL_SIZE);
  grid = generateRandomGrid(cols, rows);

  grid[thePlayer.y][thePlayer.x] = PLAYER;
}



function draw() {
  displayGrid();
}

function mousePressed() {
  let x = Math.floor(mouseX/CELL_SIZE);
  let y = Math.floor(mouseY/CELL_SIZE);

  //self
  toggleCell(x, y);
}

function keyPressed() {
  if (key === "r") {
    grid = generateRandomGrid(cols, rows);
    grid[thePlayer.y][thePlayer.x] = PLAYER;
  }
  if (key === "e") {
    grid = generateEmptyGrid(cols, rows);
    grid[thePlayer.y][thePlayer.x] = PLAYER;
  }
  if (key === 's'){
    movePlayer(thePlayer.x, thePlayer.y+1);
  }
  if (key === 'w'){
    movePlayer(thePlayer.x, thePlayer.y-1);
  }
  if (key === 'a'){
    movePlayer(thePlayer.x - 1, thePlayer.y);
  }
  if (key === 'd'){
    movePlayer(thePlayer.x + 1, thePlayer.y);
  }
}

function movePlayer(x,y){
  if (x >= 0 && x < cols && y >= 0 && y < rows && grid[y][x] === OPEN_TILE){
    let oldX = thePlayer.x;
    let oldY = thePlayer.y;


    thePlayer.x = x;
    thePlayer.y = y;

    grid[thePlayer.y][thePlayer.x] = PLAYER;

    grid[oldY][oldX] = OPEN_TILE;
  }
}

function toggleCell(x, y) {
  //make sure the cell actually exists!
  if (x >= 0 && x < cols && y >= 0 && y < rows) {
    if (grid[y][x] === IMPASSIBLE) {
      grid[y][x] = OPEN_TILE;
    }
    else if (grid[y][x] === OPEN_TILE) {
      grid[y][x] = IMPASSIBLE;
    }
  }
}

function displayGrid() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (grid[y][x] === OPEN_TILE) {
        fill("white");
      }
      if (grid[y][x] === IMPASSIBLE) {
        fill("black");
        dimal.resize(CELL_SIZE, CELL_SIZE);
        image(dimal, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE);
      }
      else if (grid[y][x] === 9){
        fill('red');
        nalinda.resize(CELL_SIZE, CELL_SIZE);
        image(nalinda, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE);
      }
      else{
        square(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE);
      }
    }
  }
}

function generateRandomGrid(cols, rows) {
  let newGrid = [];
  for (let y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      if (random(100) < 50) {
        newGrid[y].push(IMPASSIBLE);
      }
      else {
        newGrid[y].push(OPEN_TILE);
      }
    }
  }
  return newGrid;
}

function generateEmptyGrid(cols, rows) {
  let newGrid = [];
  for (let y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      newGrid[y].push(0);
    }
  }
  return newGrid;
}