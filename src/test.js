const file = require("./index");

describe("testing ship placement", () => {
  test("ship placed at x=3 and y=7", () => {
    let gameboard = file.gameBoard();
    let randomShip = file.ship(3);
    expect(gameboard.placeShip(3, 7, randomShip)).toEqual({
      x: 3,
      y: 7,
    });
  });
});
describe("testing get coordinates function", () => {
  let gameboard = file.gameBoard();
  let randomShip = file.ship(5);
  beforeEach(() => {
    gameboard.placeShip(10, 20, randomShip);
  });
  test("getting ship coordinates", () => {
    expect(gameboard.getCoordinates(randomShip)).toEqual({
      x: 10,
      y: 20,
    });
  });
});
