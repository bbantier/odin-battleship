import { Ship } from "./ship.js";

export class Gameboard {
  constructor() {
    this.board = [];
    this.fleet = [
      new Ship("patrol", 2),
      new Ship("submarine", 3),
      new Ship("destroyer", 3),
      new Ship("battleship", 4),
      new Ship("carrier", 5),
    ];
    this.attacks = new Set();
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
    const string = [x, y].toString();

    if (!this.attacks.has(string)) {
      this.attacks.add(string);

      this.board.forEach((ship) => {
        ship.places.forEach((place) => {
          const [row, col] = place;

          if (x === row && y === col) {
            ship.hit();

            if (ship.isSunk()) {
              console.log("Sunk!");
            } else {
              console.log("Hit!");
            }
          }
        });
      });
    } else {
      throw new Error("These coordinates have already been hit!");
    }
  }

  allSunk() {
    return (
      this.board.filter((ship) => ship.isSunk()).length === this.board.length
    );
  }
}