import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import CardHeader from "@mui/material/CardHeader";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Chip from "@mui/material/Chip";
import formatDistance from "date-fns/formatDistance";

import { capitaliseFirstLetterOfString } from "../utils/capitaliseFirstLetterOfString";
import { getDayMonthFormat } from "../utils/getDayMonthFormat";
import { getTimeInFormat } from "../utils/getTimeInFormat";
import { LOCATION_READ } from "../graphql/queries/query";
import {
  CardContentStyled,
  CardStyled,
  IconContainer,
  LastUpdated,
} from "./LocationPage.style";
import { Loading } from "../components/Loading";

export function LocationPage() {
  const { locationId } = useParams();

  const { loading, error, data } = useQuery(LOCATION_READ, {
    variables: {
      tenant: import.meta.env.VITE_TENANT,
      id: locationId,
    },
  });

  if (loading) return <Loading />;
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
    <CardStyled variant="outlined">
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
