import { Box, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../redux/store";

type ClockProps = {
  size: number;
};

const Clock: React.FC<ClockProps> = (props: ClockProps) => {
  const game = useSelector((state: RootState) => state.game);

  const { size } = props;

  const [timeLeft, setTimeLeft] = useState<number>(
    game.difficulty.timeInSeconds
  );
  const [timerValue, setTimerValue] = useState<number>(100);

  useEffect(() => {
    // setTimeLeft(game.difficulty.timeInSeconds);
    if (timeLeft <= 0 || game.gameState === "paused") return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
      setTimerValue((timeLeft / game.difficulty.timeInSeconds) * 100);
    }, 1000);

    if (
      Object.values(game.shapePieces).filter((shapePiece) => shapePiece.matched)
        .length === Object.values(game.shapePieces).length &&
      timeLeft > 0
    ) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timeLeft, game.gameState, game.difficulty]);

  return (
    <Box
      sx={{
        position: "relative",
        display: "inline-flex",
        width: size,
        height: size,
      }}
    >
      <CircularProgress size={size} variant="determinate" value={timerValue} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography>{timeLeft}</Typography>
      </Box>
    </Box>
  );
};

export default Clock;
