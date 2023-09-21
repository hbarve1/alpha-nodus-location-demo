import { useEffect, useRef } from "react";

type Props = {
  handleFetchMore: () => Promise<void>;
};

export function useOnScrollLoad({ handleFetchMore }: Props) {
  const innerDivRef = useRef<HTMLDivElement>(null);

  const onScroll = () => {
    if (!innerDivRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = innerDivRef.current;
    const isNearBottom = scrollTop + clientHeight >= scrollHeight;

    if (!isNearBottom) return;

    handleFetchMore();
  };

  useEffect(() => {
    const listInnerElement = innerDivRef.current;

    if (listInnerElement) {
      listInnerElement.addEventListener("scroll", onScroll);

      return () => {
        listInnerElement.removeEventListener("scroll", onScroll);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { innerDivRef };
}
