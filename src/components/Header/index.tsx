import { Grid } from "@mui/material";
import Timer from "./Timer";

const Header: React.FC = () => {
  return (
    <Grid container>
      <Grid size={2}></Grid>
      <Grid size={8}>
        <Timer />
      </Grid>
      <Grid size={2}></Grid>
    </Grid>
  );
};

export default Header;
