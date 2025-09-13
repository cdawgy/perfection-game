import { useSelector } from "react-redux";
import type { RootState } from "../../../redux/store";
import { Box, Grid } from "@mui/material";
import Tile from "./Tile";

const Board: React.FC = () => {
  const game = useSelector((state: RootState) => state.game);

  return (
    <Box>
      {game.board.map((tileRow, x) => {
        return (
          <Grid container>
            {tileRow.map((tile, y) => {
              return (
                <Grid>
                  <Tile tile={tile} x={x} y={y} />
                </Grid>
              );
            })}
          </Grid>
        );
      })}
    </Box>
  );
};

export default Board;
