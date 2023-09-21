import { TypeLocation } from "../types";
import { LocationCard } from "./LocationCard";
import { Container } from "./LocationList.style";

type PropTypes = {
  list: TypeLocation[];
};

export function LocationList({ list }: PropTypes) {
  return (
    <Container>
      {list?.map((item) => {
        return <LocationCard key={item.id} {...item} />;
      })}
    </Container>
  );
}
