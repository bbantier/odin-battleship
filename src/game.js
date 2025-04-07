import "./game.css";
import { Player } from "./modules/player";

const game = (() => {
  const playerOne = new Player("Player 1");
  const playerTwo = new Player("Computer");

  playerOne.board.render();
})();