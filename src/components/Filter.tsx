import Button from "@mui/material/Button";

export function Filter({
  setStatus,
}: {
  status: string;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div
      style={{
        // flex: 1,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        // width: "100%",
      }}
    >
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
    </div>
  );
}
