import { memo } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Chip from "@mui/material/Chip";
import formatDistance from "date-fns/formatDistance";
import { useNavigate } from "react-router-dom";

import { capitaliseFirstLetterOfString } from "../utils/capitaliseFirstLetterOfString";
import { getDayMonthFormat } from "../utils/getDayMonthFormat";
import { getTimeInFormat } from "../utils/getTimeInFormat";
import { TypeLocation } from "../types";

function LocationCardComponent({
  address,
  // alias,
  // description,
  id,
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
}: TypeLocation) {
  // console.log({
  // alias,
  // description,
  // id,
  // managingOrganization,
  // npi,
  // partOf,
  // tag,
  // taxId,
  // telecom,
  // tenant,
  // type,
  // });
  const updatedAtDate = new Date(updatedAt);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/locations/${id}`);
  };

  return (
    <Card
      variant="outlined"
      style={{ width: "100%", margin: "2px", minHeight: "130px" }}
      onClick={handleClick}
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

export const LocationCard = memo(LocationCardComponent);
