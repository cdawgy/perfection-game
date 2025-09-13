import { Box } from "@mui/material";
import ShapePiece from "./ShapePiece";
import { useSelector } from "react-redux";
import type { RootState } from "../../../redux/store";

const Tray: React.FC = () => {
  const game = useSelector((state: RootState) => state.game);

  return (
    <Box
      sx={{
        background: "blue",
        width: "100%",
        height: "100%",
        borderRadius: 2,
      }}
    >
      {Object.values(game.shapePieces).map((shapePiece) => (
        <ShapePiece
          id={shapePiece.id}
          x={shapePiece.x}
          y={shapePiece.y}
          shape={shapePiece.shape}
          matched={shapePiece.matched}
        />
      ))}
    </Box>
  );
};

export default Tray;
