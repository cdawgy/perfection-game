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

export type Difficulties = "easy" | "medium" | "hard";

export type Difficulty = {
  rowWidth: number;
  rowCount: number;
  timeInSeconds: number;
};

const EASY: Difficulty = {
  rowCount: 1,
  rowWidth: 3,
  timeInSeconds: 30,
};

const MEDIUM: Difficulty = {
  rowCount: 3,
  rowWidth: 4,
  timeInSeconds: 60,
};

const HARD: Difficulty = {
  rowCount: 5,
  rowWidth: 5,
  timeInSeconds: 45,
};

const difficultySettings: Record<Difficulties, Difficulty> = {
  easy: EASY,
  medium: MEDIUM,
  hard: HARD,
};

interface GameSliceState {
  gameState: GameState;
  board: TileShape[][];
  draggingShape: ShapePiece | undefined;
  shapePieces: Record<string, ShapePiece>;
  trayBoundaries: TrayBoundaries;
  difficulty: Difficulty;
  timeLeft: number;
}

const ROW_WIDTH = 5;
const ROW_COUNT = 5;

const generateRandomRow = (
  parentIndex: number,
  rowWidth?: number
): TileShape[] => {
  let tileRow: TileShape[] = [];
  for (let index = 0; index < (rowWidth || ROW_WIDTH); index++) {
    const rowShapeIndex = parentIndex * ROW_COUNT + index;
    tileRow.push({
      isOccupied: false,
      shape: allShapes[rowShapeIndex],
    });
  }
  return tileRow;
};

const generateRandomBoard = (
  rowCount?: number,
  rowWidth?: number
): TileShape[][] => {
  let board: TileShape[][] = [];
  for (let index = 0; index < (rowCount || ROW_COUNT); index++) {
    board.push(generateRandomRow(index, rowWidth));
  }
  return board;
};

const generateShapePieces = (
  rowCount?: number,
  rowWidth?: number
): Record<string, ShapePiece> => {
  let pieces: Record<string, ShapePiece> = {};
  for (
    let index = 0;
    index < (rowCount || ROW_COUNT) * (rowWidth || ROW_WIDTH);
    index++
  ) {
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
  difficulty: EASY,
  timeLeft: EASY.timeInSeconds,
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
    setGameDifficulty: (state, action: { payload: Difficulties }) => {
      state.difficulty = difficultySettings[action.payload];
      const { rowCount, rowWidth } = state.difficulty;
      state.board = generateRandomBoard(rowCount, rowWidth);
      state.shapePieces = generateShapePieces(rowCount, rowWidth);
      state.timeLeft = state.difficulty.timeInSeconds;
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
  setGameDifficulty,
} = gameSlice.actions;
export default gameSlice.reducer;
