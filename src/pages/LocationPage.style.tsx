import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { styled } from "@mui/material/styles";

export const CardStyled = styled(Card)({
  width: "100%",
  margin: "2px",
  minHeight: "130px",
});

export const CardContentStyled = styled(CardContent)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "4px",
});

export const IconContainer = styled("div")({
  display: "flex",
  alignItems: "center",
});

export const LastUpdated = styled("p")({
  margin: 0,
});
