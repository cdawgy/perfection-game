import { Box, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../redux/store";

type ClockProps = {
  gameTimeInSeconds: number;
  size: number;
};

const Clock: React.FC<ClockProps> = (props: ClockProps) => {
  const gameState = useSelector((state: RootState) => state.game.gameState);

  const { gameTimeInSeconds, size } = props;

  const [timeLeft, setTimeLeft] = useState<number>(gameTimeInSeconds);
  const [timerValue, setTimerValue] = useState<number>(100);

  useEffect(() => {
    if (timeLeft <= 0 || gameState === "paused") return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
      setTimerValue((timeLeft / gameTimeInSeconds) * 100);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, gameState, gameTimeInSeconds]);

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
