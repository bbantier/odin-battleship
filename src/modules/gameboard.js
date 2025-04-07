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

  placeShip(shipIndex, [x, y], orientation) {
    // Orientation: 1 for horizontal, 2 for vertical
    const shipToPlace = this.fleet[shipIndex];

    if (x + shipToPlace.length > 9) {
      this.placeShip(shipIndex, [x - 1, y], orientation);
      return;
    }

    if (y + shipToPlace.length > 9) {
      this.placeShip(shipIndex, [x, y - 1], orientation);
      return;
    }

    for (let i = x; i < shipToPlace.length + x; i++) {
      if (orientation === 1) {
        shipToPlace.places.push([x, i]);
      } else {
        shipToPlace.places.push([i, y]);
      }
    }

    for (const newPlace of shipToPlace.places) {
      const [newX, newY] = newPlace;
      for (const ship of this.board) {
        for (const place of ship.places) {
          const [oldX, oldY] = place;
          if (oldX === newX && oldY === newY) {
            while (shipToPlace.places > 0) shipToPlace.places.pop();
            return;
          }
        }
      }
    }

    this.board.push(shipToPlace);
    this.fleet.splice(shipIndex, 1);
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

  render() {
    const main = document.querySelector(".main");
    const boardContainer = document.createElement("div");

    boardContainer.classList = "board-container";

    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        const boardCell = document.createElement("div");

        boardCell.classList = "board-cell";
        boardCell.id = `board-cell-${x}-${y}`;
        boardContainer.appendChild(boardCell);
      }
    }

    main.appendChild(boardContainer);
  }
}
