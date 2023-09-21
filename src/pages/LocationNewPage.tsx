import { useState } from "react";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useMutation } from "@apollo/client";
import { LOCATION_CREATE } from "../graphql/queries/mutation";

export function LocationNewPage() {
  const [name, setName] = useState("");
  const [locationCreateFn, { loading, error }] = useMutation(LOCATION_CREATE);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await locationCreateFn({
      variables: {
        requestBody: {
          name,
        },
        tenant: import.meta.env.VITE_TENANT,
      },
    });

    setName("");
  };

  return (
    <Paper
      style={{
        padding: "2px 4px",
        display: "flex",
        alignItems: "right",
        flexDirection: "column",
        height: "100%",
        justifyContent: "center",
      }}
      component="form"
      onSubmit={handleSubmit}
    >
      <TextField
        id="name-base"
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{
          marginBottom: "10px",
          width: "60%",
        }}
      />
      <Button
        type="submit"
        disabled={loading}
        variant="contained"
        color="primary"
      >
        Submit
      </Button>

      {error && <div>Error</div>}
    </Paper>
  );
}
