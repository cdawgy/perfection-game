import { Box } from "@mui/material";
import {
  updateShapePieceState,
  type TileShape,
} from "../../../../redux/gameSlice";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../../redux/store";

type TileProps = {
  tile: TileShape;
  x: number;
  y: number;
};

const Tile: React.FC<TileProps> = (props: TileProps) => {
  const game = useSelector((state: RootState) => state.game);
  const dispatch = useDispatch();

  const { tile, x, y } = props;

  return (
    <Box
      onMouseUp={() => {
        if (game.draggingShape && game.draggingShape.shape === tile.shape) {
          dispatch(
            updateShapePieceState({ ...game.draggingShape, matched: true })
          );
        } else {
          console.log("WRONG!");
        }
      }}
      component="div"
      sx={{
        height: 128,
        width: 128,
        background: "red",
        border: "1px solid green",
        zIndex: 10,
      }}
    >
      <p>{`Occupied: ${tile.isOccupied}`}</p>
      <p>{`Shape: ${tile.shape}`}</p>
      <p>{`${x}, ${y}`}</p>
    </Box>
  );
};

export default Tile;
