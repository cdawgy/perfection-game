import {
  Box,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import Clock from "./Clock";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { AppDispatch, RootState } from "../../../redux/store";
import {
  setGameDifficulty,
  togglePaused,
  type Difficulties,
} from "../../../redux/gameSlice";

const Timer: React.FC = () => {
  const game = useSelector((state: RootState) => state.game);
  const dispatch = useDispatch<AppDispatch>();
  const [difficulty, setDifficulty] = useState<Difficulties>("easy");

  useEffect(() => {
    dispatch(setGameDifficulty(difficulty));
  }, [difficulty]);

  return (
    <Box>
      <Clock size={50} />
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
        {game.gameState === "paused" ? "Play" : "Pause"}
      </Button>
      <Typography>
        {
          Object.values(game.shapePieces).filter(
            (shapePiece) => shapePiece.matched
          ).length
        }
        /{Object.values(game.shapePieces).length} Pieces matched
      </Typography>
    </Box>
  );
};

export default Timer;
