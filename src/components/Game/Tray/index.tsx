import { Box } from "@mui/material";
import ShapePieceComponent from "./ShapePiece";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../redux/store";
import { useEffect, useRef, useState } from "react";
import { initialiseTray, type ShapePiece } from "../../../redux/gameSlice";

const Tray: React.FC = () => {
  const game = useSelector((state: RootState) => state.game);

  const trayRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const [shapePieces, setShapePieces] = useState<ShapePiece[]>([]);

  useEffect(() => {
    if (trayRef.current) {
      const { x, y, height, width } = trayRef.current.getBoundingClientRect();
      dispatch(initialiseTray({ x, y, height, width }));
    }
  }, []);

  useEffect(() => {
    setShapePieces(Object.values(game.shapePieces));
  }, [game.shapePieces]);

  return (
    <Box
      ref={trayRef}
      sx={{
        width: "100%",
        height: "100%",
      }}
    >
      {/* Dont render the pieces until the tray has initialised */}
      {trayRef &&
        shapePieces.map((shapePiece) => (
          <ShapePieceComponent
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
