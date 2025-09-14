import { Grid } from "@mui/material";
import Tray from "./Tray";
import Board from "./Board";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";

const Game: React.FC = () => {
  const game = useSelector((state: RootState) => state.game);
  return (
    <Grid container>
      {game.gameState === "playing" && (
        <>
          <Grid size={4}>
            <Tray />
          </Grid>
          <Grid
            size={8}
            sx={{ justifyContent: "center", margin: "auto", display: "flex" }}
          >
            <Board />
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default Game;
