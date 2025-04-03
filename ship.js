export class Ship {
  constructor(name, length) {
    this.name = name;
    this.length = length;
    this.hits = 0;
    this.places = [];
    this.isSunk = this.hits === this.length;
  }

  hit() {
    this.hits++;
  }
}