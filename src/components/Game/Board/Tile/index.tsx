import { Box } from "@mui/material";
import {
  updateShapePieceState,
  type TileShape,
} from "../../../../redux/gameSlice";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../../redux/store";
import { determinePieceIcon } from "../../Tray/ShapePiece/shapePieceUtils";

type TileProps = {
  tile: TileShape;
};

const Tile: React.FC<TileProps> = (props: TileProps) => {
  const game = useSelector((state: RootState) => state.game);
  const dispatch = useDispatch();

  const { tile } = props;

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
        border: "1px solid green",
        zIndex: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {determinePieceIcon(tile.shape)}
    </Box>
  );
};

export default Tile;
