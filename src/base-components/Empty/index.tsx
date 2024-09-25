import styled from '@emotion/styled';
import React from 'react';

import emptyImg from '@/assets/images/empty.jpg';

interface IEmptyProps {
  imgUrl?: string;
  description?: string;
  extra?: React.ReactNode;
}

export const Empty = ({ imgUrl, description, extra }: IEmptyProps) => {
  return (
    <StyledEmpty>
      <StyledEmptyImage src={imgUrl ?? emptyImg} />
      <StyledEmptyDescription>{description ?? '暂无数据'}</StyledEmptyDescription>
      {extra}
    </StyledEmpty>
  );
};

const StyledEmpty = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledEmptyImage = styled.img`
  width: 100%;
  flex: 1;
`;

const StyledEmptyDescription = styled.div`
  font-size: 14px;
  line-height: 18px;
  height: 18px;
  color: #999;
`;
