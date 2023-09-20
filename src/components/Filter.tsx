import Button from "@mui/material/Button";

export function Filter() {
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
      <Button type="button" sx={{ p: "10px" }}>
        Filter 1
      </Button>
      <Button type="button" sx={{ p: "10px" }}>
        Filter 2
      </Button>
      <Button type="button" sx={{ p: "10px" }}>
        Filter 3
      </Button>
      <Button type="button" sx={{ p: "10px" }}>
        Filter 4
      </Button>
    </div>
  );
}
