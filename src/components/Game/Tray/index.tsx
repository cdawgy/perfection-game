import { Box } from "@mui/material";
import ShapePiece from "./ShapePiece";

const Tray: React.FC = () => {
  return <Box
  sx={{
    background: 'blue',
    width: '100%',
    height: '100%',
    borderRadius: 2
  }}
  >
    <ShapePiece />
  </Box>;
};

export default Tray;
