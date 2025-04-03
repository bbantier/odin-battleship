import { Ship } from "./ship.js";

class Gameboard {
  constructor() {
    this.board = [];
    this.fleet = [
      new Ship("patrol", 2),
      new Ship("submarine", 3),
      new Ship("destroyer", 3),
      new Ship("battleship", 4),
      new Ship("carrier", 5),
    ];
  }

  placeShip(ship, x, y, orientation = "h") {
    const shipToPlace = this.fleet.splice(ship, 1)[0];

    for (let i = x; i < shipToPlace.length + x; i++) {
      if (orientation === "h") {
        shipToPlace.places.push([x, i]);
      } else {
        shipToPlace.places.push([i, y]);
      }
    }

    this.board.push(shipToPlace);
  }

  receiveAttack(x, y) {

  }
}