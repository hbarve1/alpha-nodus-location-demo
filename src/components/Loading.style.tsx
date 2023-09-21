import RotateRightIcon from "@mui/icons-material/RotateRight";
import { styled } from "@mui/system";
import { keyframes } from "@emotion/react";

export const SpinKeyframe = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`;

export const Container = styled("div")({
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
});

export const Icon = styled(RotateRightIcon)({
  animation: `${SpinKeyframe} 1s linear infinite`,
});
