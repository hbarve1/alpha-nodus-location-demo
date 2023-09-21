import { styled } from "@mui/material/styles";

export const Container = styled("div")(() => ({
  position: "sticky",
  top: 0,
  height: "calc(100vh - 80px)",
  overflowY: "scroll",
}));
export const HeaderRow = styled("div")(() => ({
  display: "flex",
  justifyContent: "space-between",
  margin: "4px",
}));
export const H2 = styled("h2")(() => ({
  margin: 0,
}));

export const SearchRow = styled("div")(() => ({}));
export const FilterRow = styled("div")(() => ({}));
