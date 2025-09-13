import { Box, Container, Grid } from "@mui/material";
import Header from "./components/Header";
import Game from "./components/Game";

const App = () => {
  return (
    <Container>
      <Header />
      <Game />
    </Container>
  );
};

export default App;
