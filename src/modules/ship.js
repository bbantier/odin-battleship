export class Ship {
  constructor(name, length) {
    this.name = name;
    this.length = length;
    this.hits = 0;
    this.places = [];
  }

  hit() {
    this.hits++;
  }

  isSunk() {
    return this.hits === this.length;
  }

  render() {
    this.places.forEach((place) => {
      const [x, y] = place;
      const cell = document.querySelector(`#board-cell-${x}-${y}`);

      cell.classList.add("has-ship");
      cell.textContent = this.length;
    })
  }
}