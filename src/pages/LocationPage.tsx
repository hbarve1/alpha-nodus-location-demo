import { useMutation, useQuery } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";
import CardHeader from "@mui/material/CardHeader";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Chip from "@mui/material/Chip";
import formatDistance from "date-fns/formatDistance";

import { capitaliseFirstLetterOfString } from "../utils/capitaliseFirstLetterOfString";
import { getDayMonthFormat } from "../utils/getDayMonthFormat";
import { getTimeInFormat } from "../utils/getTimeInFormat";
import { LOCATION_LIST, LOCATION_READ } from "../graphql/queries/query";
import {
  CardContentStyled,
  CardStyled,
  IconContainer,
  LastUpdated,
} from "./LocationPage.style";
import { Loading } from "../components/Loading";
import IconButton from "@mui/material/IconButton";
import { LOCATION_REMOVE } from "../graphql/queries/mutation";

function DeleteButton({ id }: { id: string }) {
  const navigation = useNavigate();
  const [locationDeleteFn, { loading, error }] = useMutation(LOCATION_REMOVE, {
    variables: {
      tenant: import.meta.env.VITE_TENANT,
      id,
    },
    refetchQueries: [LOCATION_LIST],
  });

  return (
    <IconButton
      aria-label="delete"
      onClick={async () => {
        try {
          await locationDeleteFn();
          navigation("/");
        } catch (error) {
          // @TODO: handle error
        }
      }}
      disabled={loading || Boolean(error)}
    >
      {loading ? <Loading /> : <DeleteIcon />}
    </IconButton>
  );
}

export function LocationPage() {
  const { locationId } = useParams();

  const { loading, error, data } = useQuery(LOCATION_READ, {
    variables: {
      tenant: import.meta.env.VITE_TENANT,
      id: locationId,
    },
  });

  if (loading) return <Loading />;
  if (error || !data) return <div>404 Error, File not found...</div>;

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
          <>
            {status ? (
              <Chip
                label={capitaliseFirstLetterOfString(status)}
                color={status.toLowerCase() === "active" ? "info" : "warning"}
              />
            ) : null}

            <DeleteButton id={locationId || ""} />

            <IconButton aria-label="settings">
              <EditIcon />
            </IconButton>
          </>
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
