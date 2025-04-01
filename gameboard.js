import { Ship } from "./ship.js";

class Gameboard {
  constructor() {
    this.board = new Array(10).fill(new Array(10));
  }

  getBoard() {
    return this.board;
  }
}

const board = new Gameboard();

console.log(board.getBoard());