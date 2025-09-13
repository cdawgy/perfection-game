import { Box, CircularProgress, Typography } from "@mui/material";

type ClockProps = {
  gameTimeInSeconds: number;
  size: number;
};

const Clock: React.FC<ClockProps> = (props: ClockProps) => {
  const { gameTimeInSeconds, size } = props;
  return (
    <Box
      sx={{
        position: "relative",
        display: "inline-flex",
        width: size,
        height: size,
      }}
    >
      <CircularProgress size={size} variant="determinate" value={100} />
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
        <Typography>{gameTimeInSeconds}</Typography>
      </Box>
    </Box>
  );
};

export default Clock;
