import { Grid } from "@mui/material";
import Timer from "./Timer";

const Header: React.FC = () => {
  return (
    <Grid container>
      <Grid size={12}>
        <Timer />
      </Grid>
    </Grid>
  );
};

export default Header;
