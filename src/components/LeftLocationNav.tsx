import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import CachedIcon from "@mui/icons-material/Cached";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
// import debounce from "lodash/debounce";

import { Search } from "./Search";
import { Filter } from "./Filter";
import { LocationList } from "./LocationList";
import { LOCATION_LIST } from "../graphql/queries/query";

export function LeftLocationNav() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [status, setStatus] = useState("");

  const { loading, error, data, refetch, fetchMore } = useQuery(LOCATION_LIST, {
    variables: {
      tenant: import.meta.env.VITE_TENANT,
      name: searchText,
      status,
    },
  });

  const handleClickAddButton = () => {
    navigate(`/locations/new`);
  };

  useEffect(() => {
    // debounce(refetch, 500);
    refetch();
  }, [searchText, refetch, status]);

  // console.log(status);

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

        <Button onClick={handleClickAddButton}>
          <AddIcon />
        </Button>
      </div>

      <div>
        <Search {...{ searchText, setSearchText }} />
      </div>

      <div>
        <Filter {...{ status, setStatus }} />
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
