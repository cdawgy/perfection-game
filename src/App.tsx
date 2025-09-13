import { Box, Container, Grid } from "@mui/material";
import Header from "./components/Header";
import Game from "./components/Game";

const App = () => {
  return (
    <Box sx={{ p: 1 }}>
      <Header />
      <Game />
    </Box>
  );
};

export default App;
