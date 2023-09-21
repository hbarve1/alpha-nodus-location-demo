import { TypeLocation } from "../types";
import { LocationCard } from "./LocationCard";

type PropTypes = {
  list: TypeLocation[];
};

export function LocationList({ list }: PropTypes) {
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "center",
      }}
    >
      {list?.map((item) => {
        return <LocationCard key={item.id} {...item} />;
      })}
    </div>
  );
}
