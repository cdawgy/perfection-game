import type { Shape } from "../../../../redux/gameSlice";

type ShapePiece = {
  x: number;
  y: number;
  shape: Shape;
  matched: boolean;
};
