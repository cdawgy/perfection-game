import { Button } from "@mui/material";
import React, { useState } from "react";
import { setDraggingShape, type Shape } from "../../../../redux/gameSlice";
import { useDispatch } from "react-redux";

const ShapePiece: React.FC = () => {
  const [drag, setDrag] = useState<boolean>(false);
  const [x, setX] = useState<number>();
  const [y, setY] = useState<number>();
  const dispatch = useDispatch();

  const size = 64;

  const handleMouseDown = (event: React.MouseEvent) => {
    dispatch(setDraggingShape("rectangle"));
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
        top: y,
        left: x,
        height: size,
        width: size,
        background: "grey",
        pointerEvents: !drag ? "all" : "none",
      }}
      onMouseDown={handleMouseDown}
    ></Button>
  );
};

export default ShapePiece;
