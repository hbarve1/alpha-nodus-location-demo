// import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
// import { styled } from "@mui/material/styles";
import { Outlet } from "react-router-dom";

import { LeftLocationNav } from "../components/LeftLocationNav";
import { Header } from "../components/Header";

export function HomePage() {
  return (
    <>
      <Header />
      <Grid container spacing={2} style={{ padding: "4px" }}>
        <Grid item xs={4}>
          <LeftLocationNav />
        </Grid>

        <Grid item xs={8}>
          <Outlet />
        </Grid>
      </Grid>
    </>
  );
}
