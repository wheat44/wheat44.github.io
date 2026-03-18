// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let grid = [[0,0,1,0],
            [1,0,1,0],
            [0,1,0,0],
            [0,1,0,1]];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  showGrid();
}

function showGrid(){
  for (let y = 0; y < 4; y ++){
    for (let x = 0; x < 4; x++){
      if (grid[y][x] === 1){
        fill('black');
      }
      if (grid[y][x] === 0){
        fill('white');
      }
      square(x * 50,y * 50, 50);
    }

  }

}
