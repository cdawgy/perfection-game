import { useSelector } from "react-redux";
import type { RootState } from "../../../redux/store";

const Board: React.FC = () => {
  const gameState = useSelector((state: RootState) => state.game.gameState);

  return <p>The game is {gameState}</p>;
};

export default Board;
