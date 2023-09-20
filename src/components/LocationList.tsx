import { TypeLocation } from "../types";
import { LocationCard } from "./LocationCard";

type PropTypes = {
  list: TypeLocation[];
  fetchMore?: () => void;
};

export function LocationList({ list }: PropTypes) {
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        overflowY: "scroll",
        height: "600px",
      }}
    >
      {list?.map((item) => {
        return <LocationCard key={item.id} {...item} />;
      })}
    </div>
  );
}
