import "./game.css";
import { Player } from "./modules/player";

const game = (() => {
  const player = new Player("Player");
  const playerBoard = player.board;
  const computer = new Player("Computer");
  const computerBoard = computer.board;

  playerBoard.render();

  playerBoard.placeShip(0, 0, 0, 2);
  playerBoard.placeShip(0, 0, 1, 2);
  playerBoard.placeShip(0, 0, 2, 2);
  playerBoard.placeShip(0, 0, 3, 2);
  playerBoard.placeShip(0, 0, 4, 2);

  playerBoard.board.forEach((ship) => {
    ship.render();
  })
  
})();