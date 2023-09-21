import { useNavigate } from "react-router-dom";
import CachedIcon from "@mui/icons-material/Cached";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";

import { Search } from "./Search";
import { Filter } from "./Filter";
import { LocationList } from "./LocationList";
import { useOnScrollLoad } from "../hooks/useOnScrollLoad";
import { useLocationList } from "../hooks/useLocationList";
import {
  Container,
  FilterRow,
  H2Styled,
  HeaderRow,
  SearchRow,
} from "./LeftLocationNav.style";
import { Loading } from "./Loading";

export function LeftLocationNav() {
  const navigate = useNavigate();

  const {
    searchText,
    setSearchText,
    status,
    setStatus,

    loading,
    error,
    list,

    handleFetchMore,

    refetch,
  } = useLocationList();

  const handleClickAddButton = () => {
    navigate(`/locations/new`);
  };

  const { innerDivRef } = useOnScrollLoad({ handleFetchMore });

  return (
    <Container ref={innerDivRef}>
      <HeaderRow>
        <Button onClick={() => refetch()}>
          <CachedIcon />
        </Button>

        <H2Styled>Locations</H2Styled>

        <Button onClick={handleClickAddButton}>
          <AddIcon />
        </Button>
      </HeaderRow>

      <SearchRow>
        <Search {...{ searchText, setSearchText }} />
      </SearchRow>

      <FilterRow>
        <Filter {...{ status, setStatus }} />
      </FilterRow>

      {loading && <Loading />}
      {error && <div>Error</div>}

      {list.length > 0 ? <LocationList list={list} /> : null}
    </Container>
  );
}
