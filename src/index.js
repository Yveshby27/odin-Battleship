import { board1, board2 } from "./dom";
let start = document.getElementById("start");
let endPage = document.getElementById("endPage");
let result = document.getElementById("result");
let gameStatus = document.querySelector("h3");
start.disabled = true;
endPage.style.display = "none";
const ship = () => {
  let x = 0;
  let y = 0;

  return {
    x,
    y,
  };
};

function setRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

const gameBoard = () => {
  let ships = [ship(), ship(), ship(), ship(), ship()];
  function placeShip(x, y, ship) {
    ship.x = x;
    ship.y = y;
    return {
      x,
      y,
    };
  }
  function populateBoards(x, y, board) {
    for (let i = 0; i < board.length; i++) {
      if (board[i].getAttribute("x") == x && board[i].getAttribute("y") == y) {
        board[i].style.backgroundColor = "black";
      }
    }
  }
  function getCoordinates(ship) {
    let x = ship.x;
    let y = ship.y;
    return {
      x,
      y,
    };
  }

  return {
    ships,
    placeShip,
    getCoordinates,
    populateBoards,
  };
};

const player = (name) => {
  let gameboard = gameBoard();
  let shipPlacements = [];
  function populate() {
    for (let i = 0; i < gameboard.ships.length; i++) {
      let x = setRandom(0, 9);
      let y = setRandom(0, 9);
      for (let j = 1; j < shipPlacements.length; j++) {
        if (x == shipPlacements[j].x && y == shipPlacements[j].y) {
          x = setRandom(0, 9);
          y = setRandom(0, 9);
        }
      }
      shipPlacements.push({ x, y });
      gameboard.placeShip(x, y, gameboard.ships[i]);
    }
  }

  return { name, gameboard, populate };
};
const game = () => {
  let player1 = player("You");
  let player2 = player("Computer");
  player2.populate();
  let computerAttacks = [];
  function computerAttack() {
    let x = setRandom(0, 9);
    let y = setRandom(0, 9);

    for (let z = 1; z < computerAttacks.length; z++) {
      if (x == computerAttacks[z].x && y == computerAttacks[z].y) {
        x = setRandom(0, 9);
        y = setRandom(0, 9);
      }
      computerAttacks.push({ x, y });
    }
    for (let i = 0; i < board1.length; i++) {
      if (
        board1[i].getAttribute("x") == x &&
        board1[i].getAttribute("y") == y
      ) {
        for (let j = 0; j < player1.gameboard.ships.length; j++) {
          if (
            board1[i].getAttribute("x") ==
              player1.gameboard.getCoordinates(player1.gameboard.ships[j]).x &&
            board1[i].getAttribute("y") ==
              player1.gameboard.getCoordinates(player1.gameboard.ships[j]).y
          ) {
            board1[i].style.backgroundColor = "red";
            player2Hits++;
            return;
          }
        }
        board1[i].style.backgroundColor = "blue";
      }
    }
  }

  let player1Hits = 0;
  let player2Hits = 0;

  function enableAttacks() {
    for (let i = 0; i < board2.length; i++) {
      board2[i].addEventListener("click", cellClick);
    }
  }
  let playerAttacks = [];
  function cellClick(e) {
    let x = e.target.getAttribute("x");
    let y = e.target.getAttribute("y");

    for (let i = 1; i < playerAttacks.length; i++) {
      if (x == playerAttacks[i].x && y == playerAttacks[i].y) {
        console.log("Cannot hit the same field more than once");
        return;
      }
    }
    playerAttacks.push({ x, y });
    e.target.removeEventListener("click", cellClick);
    for (let j = 0; j < player2.gameboard.ships.length; j++) {
      let selectedx = e.target.getAttribute("x");
      let selectedy = e.target.getAttribute("y");
      if (
        player2.gameboard.getCoordinates(player2.gameboard.ships[j]).x ==
          selectedx &&
        player2.gameboard.getCoordinates(player2.gameboard.ships[j]).y ==
          selectedy
      ) {
        e.target.style.backgroundColor = "red";
        player1Hits++;
        break;
      } else e.target.style.backgroundColor = "blue";
    }
    setTimeout(computerAttack, 50);
    enableAttacks();

    if (player1Hits === 5) {
      result.textContent = "You win";
      endPage.style.display = "block";
    } else if (player2Hits === 5) {
      result.textContent = "Computer wins";
      endPage.style.display = "block";
    }
  }

  let player1Clicks = 0;
  for (let i = 0; i < board1.length; i++) {
    board1[i].addEventListener("click", locationClick);
  }
  function locationClick(e) {
    e.target.removeEventListener("click", locationClick);
    let x = e.target.getAttribute("x");
    let y = e.target.getAttribute("y");

    if (player1Clicks <= 4) {
      player1.gameboard.placeShip(x, y, player1.gameboard.ships[player1Clicks]);
      player1.gameboard.populateBoards(x, y, board1);
      player1Clicks++;
    }
    if (player1Clicks >= 5) {
      start.disabled = false;
      for (let i = 0; i < board1.length; i++) {
        board1[i].removeEventListener("click", locationClick);
      }
      return;
    }
  }
  start.addEventListener("click", () => {
    clearBoard(board1);
    enableAttacks();
    start.disabled = true;
    gameStatus.textContent = "Play!";
  });
  function clearBoard(board) {
    for (let i = 0; i < board.length; i++) {
      board[i].style.backgroundColor = "white";
    }
  }
};
let Game = game();
