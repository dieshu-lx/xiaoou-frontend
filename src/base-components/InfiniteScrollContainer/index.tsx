import styled from '@emotion/styled';
import React, { useCallback, useEffect, useState } from 'react';

import { useThrottleFn } from '@/hooks/use-throttle-fn';

import { Empty } from '../Empty';

interface InfiniteScrollContainerProps<T> {
  renderItem: (item: T) => React.ReactNode;
  hasMore: boolean;
  loadMore: () => void;
  dataSource: T[];
  style?: React.CSSProperties;
}

export const InfiniteScrollContainer = <T,>({ renderItem, hasMore, loadMore, dataSource, style }: InfiniteScrollContainerProps<T>) => {
  const [items, setItems] = useState<T[]>([]);

  const { throttleFn: throttledLoadMore } = useThrottleFn(loadMore, 200);

  const onScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
      if (scrollTop + clientHeight >= scrollHeight - 20 && hasMore) {
        throttledLoadMore();
      }
    },
    [hasMore, throttledLoadMore],
  );

  useEffect(() => {
    setItems((prevItems) => [...prevItems, ...dataSource]);
  }, [dataSource]);

  if (items.length === 0) {
    return <Empty />;
  }

  return (
    <StyledInfiniteScrollContainer style={{ ...style }} onScroll={onScroll}>
      {items.map((item, index) => (
        <div key={index}>{renderItem(item)}</div>
      ))}
    </StyledInfiniteScrollContainer>
  );
};

const StyledInfiniteScrollContainer = styled.div`
  overflow-y: auto;
  height: 100%;
`;
