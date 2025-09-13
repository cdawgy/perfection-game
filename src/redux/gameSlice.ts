import { createSlice } from "@reduxjs/toolkit";

type GameState = "paused" | "playing";

export type Shape = "square" | "rectangle";

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

interface GameSliceState {
  gameState: GameState;
  board: TileShape[][];
  draggingShape: ShapePiece | undefined;
  shapePieces: Record<string, ShapePiece>;
}

// TODO: Comeback and improve random logic
const generateRandomRow = (): TileShape[] => {
  let tileRow: TileShape[] = [];
  for (let index = 0; index < 5; index++) {
    tileRow.push({
      isOccupied: false,
      shape: index % 2 == 0 ? "rectangle" : "square",
    });
  }
  return tileRow;
};

const generateRandomBoard = (): TileShape[][] => {
  let board: TileShape[][] = [];
  for (let index = 0; index < 5; index++) {
    board.push(generateRandomRow());
  }
  return board;
};

const generateShapePieces = (): Record<string, ShapePiece> => {
  let pieces: Record<string, ShapePiece> = {};
  for (let index = 0; index < 1; index++) {
    const key = `shape-${index}`;
    const piece: ShapePiece = {
      id: key,
      x: 0,
      y: 0,
      shape: "square",
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
      console.log(state.shapePieces);
    },
  },
});

export const {
  togglePaused,
  setPaused,
  setPlaying,
  setDraggingShape,
  updateShapePieceState,
} = gameSlice.actions;
export default gameSlice.reducer;
