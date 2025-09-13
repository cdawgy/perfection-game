import { Grid } from "@mui/material";
import Tray from "./Tray";
import Board from "./Board";

const Game: React.FC = () => {
  return (
    <Grid container>
      <Grid size={2}>
        <Tray />
      </Grid>
      <Grid size={8}>
        <Board />
      </Grid>
      <Grid size={2}>
        <Tray />
      </Grid>
    </Grid>
  );
};

export default Game;
