let board1 = document.getElementsByClassName("player-square");
let board2 = document.getElementsByClassName("opponent-square");

let player_gameboard = document.getElementById("player-gameboard");
let computer_gameboard = document.getElementById("opponent-gameboard");
player_gameboard.style.gridTemplateColumns = `repeat(${10},1fr)`;
player_gameboard.style.gridTemplateRows = `repeat(${10},1fr)`;
computer_gameboard.style.gridTemplateColumns = `repeat(${10},1fr)`;
computer_gameboard.style.gridTemplateRows = `repeat(${10},1fr)`;
function buildGameboards() {
  for (let i = 0; i <= 9; i++) {
    for (let j = 0; j <= 9; j++) {
      let square = document.createElement("div");
      square.setAttribute("x", j);
      square.setAttribute("y", i);
      square.classList.add("player-square");
      player_gameboard.appendChild(square);
    }
  }
  for (let z = 0; z <= 9; z++) {
    for (let x = 0; x <= 9; x++) {
      let square = document.createElement("div");
      square.setAttribute("x", x);
      square.setAttribute("y", z);
      square.classList.add("opponent-square");
      computer_gameboard.appendChild(square);
    }
  }
}

buildGameboards();

export { board1, board2 };
