import { useState, useEffect, useRef } from "react";
import { useLazyQuery } from "@apollo/client";

import { LOCATION_LIST } from "../graphql/queries/query";
import { TypeLocation } from "../types";

export function useLocationList() {
  const pageRef = useRef(0);
  const totalPageRef = useRef(0);
  const [list, setList] = useState<TypeLocation[]>([]);
  const [searchText, setSearchText] = useState("");
  const [status, setStatus] = useState("");
  const LIMIT = 5;

  const [locationListFn, { loading, error, refetch, fetchMore }] =
    useLazyQuery(LOCATION_LIST);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    // pageRef,
    // totalPageRef,

    searchText,
    setSearchText,
    status,
    setStatus,

    loading,
    error,
    list,

    refetch,
    fetchMore,

    handleFetchMore,
  };
}
