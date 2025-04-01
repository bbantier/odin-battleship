import { Ship } from "./ship.js";

class Gameboard {
  constructor() {
    this.ships = [];
    this.missedShots = new Set();
    this.attacks = new Set();
    this.board = Array(10)
      .fill(null)
      .map(() => Array(10));
  }

  placeShip(x, y) {}

  receiveAttack() {}

  getBoard() {
    return this.board;
  }
}

const board = new Gameboard();

console.log(board.getBoard());
