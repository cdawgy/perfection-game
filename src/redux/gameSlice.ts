import { createSlice } from "@reduxjs/toolkit";

type GameState = "paused" | "playing";

interface GameSliceState {
  gameState: GameState;
}

const initialState: GameSliceState = {
  gameState: "paused",
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
  },
});

export const { togglePaused, setPaused, setPlaying } = gameSlice.actions;
export default gameSlice.reducer;
