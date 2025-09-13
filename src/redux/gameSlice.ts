import { createSlice } from "@reduxjs/toolkit";

type GameState = "paused" | "playing";

export type Shape =
  | "square"
  | "rectangle"
  | "triangle"
  | "circle"
  | "pentagon"
  | "hexagon"
  | "heptagon"
  | "octagon"
  | "nonagon"
  | "decagon"
  | "star"
  | "diamond"
  | "heart"
  | "arrow"
  | "cross"
  | "moon"
  | "sun"
  | "cloud"
  | "leaf"
  | "teardrop"
  | "crescent"
  | "ellipse"
  | "parallelogram"
  | "trapezoid"
  | "kite";

const allShapes: Shape[] = [
  "square",
  "rectangle",
  "triangle",
  "circle",
  "pentagon",
  "hexagon",
  "heptagon",
  "octagon",
  "nonagon",
  "decagon",
  "star",
  "diamond",
  "heart",
  "arrow",
  "cross",
  "moon",
  "sun",
  "cloud",
  "leaf",
  "teardrop",
  "crescent",
  "ellipse",
  "parallelogram",
  "trapezoid",
  "kite",
];

// TODO: Add extra shape types
export type TileShape = {
  isOccupied: boolean;
  shape: Shape;
};

export type ShapePiece = {
  id: string;
  x: number;
  y: number;
  shape: Shape;
  matched: boolean;
};

export type TrayBoundaries = {
  x: number;
  y: number;
  height: number;
  width: number;
};

interface GameSliceState {
  gameState: GameState;
  board: TileShape[][];
  draggingShape: ShapePiece | undefined;
  shapePieces: Record<string, ShapePiece>;
  trayBoundaries: TrayBoundaries;
}

const ROW_WIDTH = 5;
const ROW_COUNT = 5;

const generateRandomRow = (parentIndex: number): TileShape[] => {
  let tileRow: TileShape[] = [];
  for (let index = 0; index < ROW_WIDTH; index++) {
    const rowShapeIndex = parentIndex * ROW_COUNT + index;
    tileRow.push({
      isOccupied: false,
      shape: allShapes[rowShapeIndex],
    });
  }
  return tileRow;
};

const generateRandomBoard = (): TileShape[][] => {
  let board: TileShape[][] = [];
  for (let index = 0; index < ROW_COUNT; index++) {
    board.push(generateRandomRow(index));
  }
  return board;
};

const generateShapePieces = (): Record<string, ShapePiece> => {
  let pieces: Record<string, ShapePiece> = {};
  for (let index = 0; index < ROW_COUNT * ROW_WIDTH; index++) {
    const key = `shape-${index}`;
    const piece: ShapePiece = {
      id: key,
      x: 0,
      y: 0,
      shape: allShapes[index],
      matched: false,
    };
    pieces[key] = piece;
  }

  return pieces;
};

const initialState: GameSliceState = {
  gameState: "paused",
  board: generateRandomBoard(),
  draggingShape: undefined,
  shapePieces: generateShapePieces(),
  trayBoundaries: {
    y: 0,
    x: 0,
    height: 0,
    width: 0,
  },
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    togglePaused: (state) => {
      state.gameState = state.gameState === "paused" ? "playing" : "paused";
    },
    setPaused: (state) => {
      state.gameState = "paused";
    },
    setPlaying: (state) => {
      state.gameState = "playing";
    },
    setDraggingShape: (state, action: { payload: ShapePiece | undefined }) => {
      state.draggingShape = action.payload;
    },
    updateShapePieceState: (state, action: { payload: ShapePiece }) => {
      const key = action.payload.id;
      const newShape = action.payload;
      state.shapePieces[key] = newShape;
    },
    initialiseTray: (state, action: { payload: TrayBoundaries }) => {
      state.trayBoundaries = action.payload;
    },
  },
});

export const {
  togglePaused,
  setPaused,
  setPlaying,
  setDraggingShape,
  updateShapePieceState,
  initialiseTray,
} = gameSlice.actions;
export default gameSlice.reducer;
