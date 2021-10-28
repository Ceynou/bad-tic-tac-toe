let turn = "X";
let winner = "";

let gridArray = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

function setup() {
  createCanvas(900, 900);
  gridCaseSize = width / 3;
  graphicalGrid = new GraphicalGrid();
  logicalGrid = new LogicalGrid();
  winning = new Winning();
}

function draw() {
  background(220);
  winning.isWinning();
  if (winner === "") {
    mouseCasePosition();

    if (mouseIsPressed) {
      logicalGrid.placing();
    }

    graphicalGrid.grid();
    graphicalGrid.caseHover();
    graphicalGrid.placing();
  } else {
    winning.display();
  }
}

function mouseCasePosition() {
  x = Math.floor(mouseX / gridCaseSize);
  y = Math.floor(mouseY / gridCaseSize);
}

function GraphicalGrid() {
  this.grid = function () {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        fill(255);
        rect((j * width) / 3, (i * height) / 3, gridCaseSize, gridCaseSize);
      }
    }
  };

  this.caseHover = function () {
    // if x turn or o turn fill:
    fill(100, 100, 100, 200);
    rect(x * gridCaseSize, y * gridCaseSize, gridCaseSize, gridCaseSize);
  };

  this.placing = function () {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        textAlign(LEFT, TOP);
        textSize(gridCaseSize);
        text(gridArray[i][j], i * gridCaseSize, j * gridCaseSize);
      }
    }
  };
}

function LogicalGrid() {
  //called when mouse is being clicked
  this.placing = function () {
    if (gridArray[x][y] == "") {
      gridArray[x][y] = turn;
      if (turn == "X") {
        turn = "O";
      } else {
        turn = "X";
      }
    }
  };
}

function Winning() {
  this.isWinning = function () {
    for (let i = 0; i < 3; i++) {
      if (
        gridArray[i][0] != "" &&
        gridArray[i][0] == gridArray[i][1] &&
        gridArray[i][0] == gridArray[i][2]
      ) {
        winner = gridArray[i][0];
        console.log("test");
      }
      if (
        gridArray[0][i] != "" &&
        gridArray[0][i] == gridArray[1][i] &&
        gridArray[0][i] == gridArray[2][i]
      ) {
        winner = gridArray[0][i];
        console.log("test2");
      }
    }
    if (
      (gridArray[1][1] != "" &&
        gridArray[1][1] == gridArray[0][0] &&
        gridArray[1][1] == gridArray[2][2]) ||
      (gridArray[1][1] == gridArray[2][0] && gridArray[1][1] == gridArray[0][2])
    ) {
      winner = gridArray[1][1];
      console.log("test3");
    }
  };

  this.display = function () {
    textAlign(LEFT, TOP);
    textSize(200);
    text("winner:\n " + winner, 100, 100);
  };
}
