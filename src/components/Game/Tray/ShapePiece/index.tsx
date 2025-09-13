import { Button } from "@mui/material";
import React, { useState } from "react";
import { setDraggingShape, type ShapePiece } from "../../../../redux/gameSlice";
import { useDispatch } from "react-redux";

const ShapePiece: React.FC<ShapePiece> = (props: ShapePiece) => {
  const { id, x, y, shape, matched } = props;
  const [drag, setDrag] = useState<boolean>(false);
  const [componentX, setX] = useState<number>(x);
  const [componentY, setY] = useState<number>(y);
  const dispatch = useDispatch();

  const size = 64;

  const handleMouseDown = (event: React.MouseEvent) => {
    dispatch(setDraggingShape({ id, x, y, shape, matched }));
    setDrag(true);
    setX(event.clientX - size / 2);
    setY(event.clientY - size / 2);

    const handleMouseMove = (moveEvent: MouseEvent) => {
      setX(moveEvent.clientX - size / 2);
      setY(moveEvent.clientY - size / 2);
    };

    const handleMouseUp = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      setDrag(false);
      dispatch(setDraggingShape(undefined));
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <Button
      sx={{
        position: "fixed",
        top: componentY,
        left: componentX,
        height: size,
        width: size,
        background: "grey",
        pointerEvents: !drag ? "all" : "none",
      }}
      onMouseDown={handleMouseDown}
      disabled={matched}
    >{matched && "Matched"}</Button>
  );
};

export default ShapePiece;
