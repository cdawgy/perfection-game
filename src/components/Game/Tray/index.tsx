import { Box } from "@mui/material";
import ShapePiece from "./ShapePiece";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../redux/store";
import { useEffect, useRef } from "react";
import { initialiseTray } from "../../../redux/gameSlice";

const Tray: React.FC = () => {
  const game = useSelector((state: RootState) => state.game);

  const trayRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (trayRef.current) {
      const { x, y, height, width } = trayRef.current.getBoundingClientRect();
      dispatch(initialiseTray({ x, y, height, width }));
    }
  }, []);

  return (
    <Box
      ref={trayRef}
      sx={{
        background: "blue",
        width: "100%",
        height: "100%",
        borderRadius: 2,
      }}
    >
      {/* Dont render the pieces until the tray has initialised */}
      {trayRef &&
        Object.values(game.shapePieces).map((shapePiece) => (
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
