import {
  Box,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import Clock from "./Clock";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { AppDispatch, RootState } from "../../../redux/store";
import { togglePaused } from "../../../redux/gameSlice";

type Difficulties = "easy" | "medium" | "hard";

const Timer: React.FC = () => {
  const gameState = useSelector((state: RootState) => state.game.gameState);
  const dispatch = useDispatch<AppDispatch>();
  const [difficulty, setDifficulty] = useState<Difficulties>("easy");
  const [gameTimeInSeconds, setGameTimeInSeconds] = useState<number>(120);

  const determineGameTimeInSeconds = (): number => {
    switch (difficulty) {
      case "easy":
        return 120;
      case "medium":
        return 90;
      case "hard":
        return 60;
      default:
        return 120;
    }
  };

  useEffect(() => {
    setGameTimeInSeconds(determineGameTimeInSeconds());
  }, [difficulty]);

  return (
    <Box>
      <Clock size={50} gameTimeInSeconds={gameTimeInSeconds} />
      <RadioGroup
        row
        value={difficulty}
        onChange={(event) => setDifficulty(event.target.value as Difficulties)}
      >
        <FormControlLabel
          value="easy"
          control={<Radio />}
          label="Easy"
          labelPlacement="end"
        />
        <FormControlLabel
          value="medium"
          control={<Radio />}
          label="Medium"
          labelPlacement="end"
        />
        <FormControlLabel
          value="hard"
          control={<Radio />}
          label="Hard"
          labelPlacement="end"
        />
      </RadioGroup>
      <Button onClick={() => dispatch(togglePaused())} variant="contained">
        {gameState === "paused" ? "Play" : "Pause"}
      </Button>
    </Box>
  );
};

export default Timer;
