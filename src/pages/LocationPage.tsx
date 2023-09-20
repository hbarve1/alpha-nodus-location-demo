// import Paper from "@mui/material/Paper";
// import InputBase from "@mui/material/InputBase";
// import IconButton from "@mui/material/IconButton";
// import SearchIcon from "@mui/icons-material/Search";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Chip from "@mui/material/Chip";
import formatDistance from "date-fns/formatDistance";
// import { useNavigate } from "react-router-dom";

import { capitaliseFirstLetterOfString } from "../utils/capitaliseFirstLetterOfString";
import { getDayMonthFormat } from "../utils/getDayMonthFormat";
import { getTimeInFormat } from "../utils/getTimeInFormat";
import { LOCATION_READ } from "../graphql/queries/query";
// import { TypeLocation } from "../types";

export function LocationPage() {
  const { locationId } = useParams();

  const { loading, error, data } = useQuery(LOCATION_READ, {
    variables: {
      tenant: import.meta.env.VITE_TENANT,
      id: locationId,
    },
  });

  if (loading) return <div>Loading...</div>;
  if (error || !data) return <div>Error...</div>;

  const {
    address,
    // alias,
    // description,
    // id,
    // managingOrganization,
    name,
    // npi,
    // partOf,
    status,
    // tag,
    // taxId,
    // telecom,
    // tenant,
    // type,
    updatedAt,
  } = data?.locationRead?.resource || {};
  const updatedAtDate = new Date(updatedAt);

  return (
    <Card
      variant="outlined"
      style={{ width: "100%", margin: "2px", minHeight: "130px" }}
    >
      <CardContent>
        <div style={{ position: "relative", marginBottom: "12px" }}>
          <Typography color="text.primary">{name}</Typography>
          {address && <Typography color="text.secondary">{address}</Typography>}

          {status && (
            <Chip
              label={capitaliseFirstLetterOfString(status)}
              color={status.toLowerCase() === "active" ? "info" : "warning"}
              style={{
                position: "absolute",
                top: "0px",
                right: "0px",
                padding: "2px",
              }}
            />
          )}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "4px",
          }}
        >
          <div
            style={{
              display: "flex",
              // justifyContent: "space-between",
              alignItems: "center",
              // marginTop: "4px",
            }}
          >
            <CalendarMonthIcon /> {getDayMonthFormat(updatedAtDate)}
          </div>
          <div
            style={{
              display: "flex",
              // justifyContent: "space-between",
              alignItems: "center",
              // marginTop: "4px",
            }}
          >
            <AccessTimeIcon /> {getTimeInFormat(updatedAtDate)}
          </div>

          <p style={{ margin: 0 }}>
            {formatDistance(new Date(updatedAt), new Date(), {
              addSuffix: true,
            })}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
