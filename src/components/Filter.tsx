import Button from "@mui/material/Button";
import { Container } from "./Filter.style";

// TODO: filter queries are not working so skipping this for now
export function Filter({
  setStatus,
}: {
  setStatus: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <Container>
      <Button type="button" sx={{ p: "10px" }} onClick={() => setStatus("")}>
        Filter 1
      </Button>
      <Button
        type="button"
        sx={{ p: "10px" }}
        onClick={() => setStatus("active")}
      >
        Filter 2
      </Button>
      <Button
        type="button"
        sx={{ p: "10px" }}
        onClick={() => setStatus("inactive")}
      >
        Filter 3
      </Button>
      <Button type="button" sx={{ p: "10px" }}>
        Filter 4
      </Button>
    </Container>
  );
}
