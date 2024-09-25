import styled from '@emotion/styled';
import React from 'react';

import { InfiniteScrollContainer } from '@/base-components/InfiniteScrollContainer';
import { useRequestList } from '@/hooks/use-request-list';

export const HomePage = () => {
  const mockRequest = async () => {
    return await new Promise<{ data: string[]; total: number }>((resolve) => {
      resolve({ data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'], total: 1000 });
    });
  };

  const { data, getNextPage } = useRequestList<{ data: string[]; total: number }>(mockRequest, { perPage: 10 });

  return (
    <StyledHomeContainer>
      <InfiniteScrollContainer
        renderItem={() => <div>123</div>}
        hasMore={!!data && data.data.length < data.total}
        loadMore={getNextPage}
        dataSource={data?.data ?? []}
      />
      {/* <StyledText>
        This is&nbsp;
        <span style={{ color: '#2f2a44' }}>Home</span>
        &nbsp;page !
      </StyledText> */}
    </StyledHomeContainer>
  );
};

const StyledHomeContainer = styled.div`
  width: 200px;
  height: 200px;
  text-align: center;
`;
