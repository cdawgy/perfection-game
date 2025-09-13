import { createSlice } from "@reduxjs/toolkit";

type GameState = "paused" | "playing";

export type Shape = "square" | "rectangle" | undefined;

// TODO: Add extra shape types
export type TileShape = {
  isOccupied: boolean;
  shape: Shape;
};

interface GameSliceState {
  gameState: GameState;
  board: TileShape[][];
  draggingShape: Shape;
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

const initialState: GameSliceState = {
  gameState: "paused",
  board: generateRandomBoard(),
  draggingShape: undefined,
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
    setDraggingShape: (state, action: { payload: Shape }) => {
      state.draggingShape = action.payload;
    },
  },
});

export const { togglePaused, setPaused, setPlaying, setDraggingShape } = gameSlice.actions;
export default gameSlice.reducer;
