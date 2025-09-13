import SquareFoot from "@mui/icons-material/SquareFoot";
import CropSquare from "@mui/icons-material/CropSquare";
import ChangeHistory from "@mui/icons-material/ChangeHistory";
import Circle from "@mui/icons-material/Circle";
import Star from "@mui/icons-material/Star";
import Diamond from "@mui/icons-material/Diamond";
import Favorite from "@mui/icons-material/Favorite";
import ArrowForward from "@mui/icons-material/ArrowForward";
import Add from "@mui/icons-material/Add";
import Brightness3 from "@mui/icons-material/Brightness3";
import WbSunny from "@mui/icons-material/WbSunny";
import Cloud from "@mui/icons-material/Cloud";
import Opacity from "@mui/icons-material/Opacity";
import Category from "@mui/icons-material/Category";
import Stop from "@mui/icons-material/Stop";

import type { Shape } from "../../../../redux/gameSlice";

export const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const determinePieceIcon = (shape: Shape) => {
  switch (shape) {
    case "square":
      return <CropSquare />;
    case "rectangle":
      return <SquareFoot />;
    case "triangle":
      return <ChangeHistory />;
    case "circle":
      return <Circle />;
    case "pentagon":
      return <Category />; // closest generic polygon
    case "hexagon":
      return <Category />;
    case "heptagon":
      return <Category />;
    case "octagon":
      return <Stop />;
    case "nonagon":
      return <Category />;
    case "decagon":
      return <Category />;
    case "star":
      return <Star />;
    case "diamond":
      return <Diamond />;
    case "heart":
      return <Favorite />;
    case "arrow":
      return <ArrowForward />;
    case "cross":
      return <Add />; // plus sign as cross
    case "moon":
      return <Brightness3 />;
    case "sun":
      return <WbSunny />;
    case "cloud":
      return <Cloud />;
    case "leaf":
      return <Cloud />;
    case "teardrop":
      return <Opacity />;
    case "crescent":
      return <Brightness3 />;
    case "ellipse":
      return <Cloud />;
    case "parallelogram":
      return <Category />; // closest generic shape
    case "trapezoid":
      return <Category />;
    case "kite":
      return <ChangeHistory />;
    default:
      return null;
  }
};
