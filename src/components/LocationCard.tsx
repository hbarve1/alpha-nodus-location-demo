import { memo } from "react";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Chip from "@mui/material/Chip";
import formatDistance from "date-fns/formatDistance";
import { useNavigate } from "react-router-dom";

import { capitaliseFirstLetterOfString } from "../utils/capitaliseFirstLetterOfString";
import { getDayMonthFormat } from "../utils/getDayMonthFormat";
import { getTimeInFormat } from "../utils/getTimeInFormat";
import { TypeLocation } from "../types";
import {
  CardContentStyled,
  CardStyled,
  IconContainer,
  LastUpdated,
} from "./LocationCard.style";
import CardHeader from "@mui/material/CardHeader";

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
  const updatedAtDate = new Date(updatedAt);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/locations/${id}`);
  };

  return (
    <CardStyled variant="outlined" onClick={handleClick}>
      <CardHeader
        title={name}
        subheader={address}
        action={
          status ? (
            <Chip
              label={capitaliseFirstLetterOfString(status)}
              color={status.toLowerCase() === "active" ? "info" : "warning"}
            />
          ) : null
        }
      />

      <CardContentStyled>
        <IconContainer>
          <CalendarMonthIcon /> {getDayMonthFormat(updatedAtDate)}
        </IconContainer>
        <IconContainer>
          <AccessTimeIcon /> {getTimeInFormat(updatedAtDate)}
        </IconContainer>

        <LastUpdated>
          {formatDistance(new Date(updatedAt), new Date(), {
            addSuffix: true,
          })}
        </LastUpdated>
      </CardContentStyled>
    </CardStyled>
  );
}

export const LocationCard = memo(LocationCardComponent);
