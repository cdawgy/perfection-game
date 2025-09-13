import { Grid } from "@mui/material";
import Tray from "./Tray";
import Board from "./Board";

const Game: React.FC = () => {
  return (
    <Grid container>
      <Grid size={4}>
        <Tray />
      </Grid>
      <Grid
        size={8}
        sx={{ justifyContent: "center", margin: "auto", display: "flex" }}
      >
        <Board />
      </Grid>
    </Grid>
  );
};

export default Game;
