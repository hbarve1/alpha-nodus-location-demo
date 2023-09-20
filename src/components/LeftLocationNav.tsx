import Button from "@mui/material/Button";
import CachedIcon from "@mui/icons-material/Cached";
import AddIcon from "@mui/icons-material/Add";
// import { Box } from "@mui/material";
import { Search } from "./Search";
import { Filter } from "./Filter";
import { LocationList } from "./LocationList";
import { LOCATION_LIST } from "../graphql/queries/query";
import { useQuery } from "@apollo/client";
import RotateRightIcon from "@mui/icons-material/RotateRight";

export function LeftLocationNav() {
  const { loading, error, data, refetch, fetchMore } = useQuery(LOCATION_LIST, {
    variables: {
      tenant: import.meta.env.VITE_TENANT,
    },
  });

  console.log({ data });

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "4px",
        }}
      >
        <Button onClick={() => refetch()}>
          <CachedIcon />
        </Button>

        <h2 style={{ margin: 0 }}>Locations</h2>

        <Button>
          <AddIcon />
        </Button>
      </div>

      <div>
        <Search />
      </div>
      <div>
        <Filter />
      </div>

      {loading && <RotateRightIcon />}
      {error && <div>Error</div>}

      {data && (
        <LocationList
          list={data?.locationList?.resources || []}
          fetchMore={fetchMore}
        />
      )}
    </div>
  );
}
