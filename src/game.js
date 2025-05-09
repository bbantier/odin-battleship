import "./game.css";
import { Player } from "./modules/player";

const game = (() => {
  const player = new Player("Player");
  const playerBoard = player.board;

  playerBoard.render();

  while(playerBoard.fleet.length > 0) {
    const randomNumber = () => Math.floor(Math.random() * 9);
    const randomCoord = [randomNumber(), randomNumber()];
    const randomOrientation = Math.floor(Math.random() * 2 + 1);

    playerBoard.placeShip(0, randomCoord, randomOrientation);
  }

  playerBoard.board.forEach((ship) => {
    ship.render();
  });
})();