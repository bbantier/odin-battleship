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
    const newShip = this.fleet[shipIndex];

    if (orientation === 1 && x + newShip.length > 9) {
      return this.placeShip(shipIndex, [x - 1, y], orientation);
    }
    if (orientation === 2 && y + newShip.length > 9) {
      return this.placeShip(shipIndex, [x, y - 1], orientation);
    }

    const tempPlaces = [];
    for (let i = 0; i < newShip.length; i++) {
      if (orientation === 1) {
        tempPlaces.push([x + i, y]);
      } else {
        tempPlaces.push([x, y + i]);
      }
    }

    for (const ship of this.board) {
      for (const oldPlace of ship.places) {
        if (
          tempPlaces.some((newPlace) => {
            return newPlace[0] === oldPlace[0] && newPlace[1] === oldPlace[1];
          })
        ) {
          const newCoords = [
            Math.floor(Math.random() * 9),
            Math.floor(Math.random() * 9),
          ];
          return this.placeShip(shipIndex, newCoords, orientation);
        }
      }
    }

    newShip.places = tempPlaces;
    this.board.push(newShip);
    this.fleet.splice(shipIndex, 1);

    if (this.board.length === 5) {
      console.log(this.board);
    }
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
