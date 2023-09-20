import "./App.css";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import { LeftLocationNav } from "./components/LeftLocationNav";
import { Header } from "./components/Header";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function App() {
  return (
    <div>
      <Header />
      <Grid container spacing={2} style={{ padding: "4px" }}>
        <Grid item xs={4}>
          <LeftLocationNav />
        </Grid>

        <Grid item xs={8}>
          <Item>xs=4</Item>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
