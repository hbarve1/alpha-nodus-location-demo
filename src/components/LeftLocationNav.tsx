import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import CachedIcon from "@mui/icons-material/Cached";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";

import { Search } from "./Search";
import { Filter } from "./Filter";
import { LocationList } from "./LocationList";
import { LOCATION_LIST } from "../graphql/queries/query";
import { TypeLocation } from "../types";

export function LeftLocationNav() {
  const listInnerRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef(0);
  const totalPageRef = useRef(0);
  const [list, setList] = useState<TypeLocation[]>([]);
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [status, setStatus] = useState("");
  const LIMIT = 5;

  const [locationListFn, { loading, error, data, refetch, fetchMore }] =
    useLazyQuery(LOCATION_LIST);

  const handleClickAddButton = () => {
    navigate(`/locations/new`);
  };

  const handleFetchMore = async () => {
    if (pageRef.current >= totalPageRef.current) return;

    const res = await fetchMore({
      variables: {
        tenant: import.meta.env.VITE_TENANT,
        name: searchText,
        status,
        page: pageRef.current + 1,
        limit: LIMIT,
      },
    });
    pageRef.current = pageRef.current + 1;

    setList((prev) => [...prev, ...(res?.data?.locationList?.resources || [])]);
  };

  const onScroll = () => {
    if (!listInnerRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
    const isNearBottom = scrollTop + clientHeight >= scrollHeight;

    if (!isNearBottom) return;

    handleFetchMore();
  };

  useEffect(() => {
    refetch();
  }, [searchText, refetch, status]);

  useEffect(() => {
    (async () => {
      const res = await locationListFn({
        variables: {
          tenant: import.meta.env.VITE_TENANT,
          name: searchText,
          status,
          page: pageRef.current + 1,
          limit: LIMIT,
        },
      });
      setList(res?.data?.locationList?.resources || []);
      totalPageRef.current = res?.data?.locationList?.pages || 0;
      pageRef.current = pageRef.current + 1;
    })();
  }, []);

  useEffect(() => {
    const listInnerElement = listInnerRef.current;

    if (listInnerElement) {
      listInnerElement.addEventListener("scroll", onScroll);

      return () => {
        listInnerElement.removeEventListener("scroll", onScroll);
      };
    }
  }, []);

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        height: "calc(100vh - 80px)",
        overflowY: "scroll",
      }}
      ref={listInnerRef}
    >
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

      {data && <LocationList list={list} />}
    </div>
  );
}
