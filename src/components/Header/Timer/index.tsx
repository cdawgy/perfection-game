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
  const [difficulty, setDifficulty] = useState<Difficulties>("hard");

  useEffect(() => {
    dispatch(setGameDifficulty(difficulty));
  }, [difficulty]);

  const hasAllMatchesBeenFound = (): boolean => {
    return (
      Object.values(game.shapePieces).filter((shapePiece) => shapePiece.matched)
        .length == Object.values(game.shapePieces).length
    );
  };

  return (
    <Box
      sx={{
        mb: 2,
      }}
    >
      <Box display="flex" sx={{ pb: 1 }}>
        <Clock size={50} />
        <RadioGroup
          sx={{ pl: 1 }}
          row
          value={difficulty}
          onChange={(event) =>
            setDifficulty(event.target.value as Difficulties)
          }
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
      </Box>
      <Box
        display="flex"
        sx={{ pb: 1, alignContent: "center", alignItems: "center" }}
      >
        <Button
          sx={{ mr: 1 }}
          onClick={() => dispatch(togglePaused())}
          variant="contained"
        >
          {game.gameState === "paused" ? "Play" : "Pause"}
        </Button>
        <Typography>
          {
            Object.values(game.shapePieces).filter(
              (shapePiece) => shapePiece.matched
            ).length
          }
          /{Object.values(game.shapePieces).length} Pieces matched{" "}
          {hasAllMatchesBeenFound() ? `- You win!` : ""}
        </Typography>
      </Box>
    </Box>
  );
};

export default Timer;
