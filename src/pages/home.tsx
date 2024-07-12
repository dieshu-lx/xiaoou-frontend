import styled from '@emotion/styled';
import React from 'react';

export const HomePage = () => {
  return (
    <StyledHomeContainer>
      <StyledText>
        This is&nbsp;
        <span style={{ color: '#e621c9' }}>Home</span>
        &nbsp;Page !
      </StyledText>
    </StyledHomeContainer>
  );
};

const StyledHomeContainer = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
`;

const StyledText = styled.span`
  font-size: 18px;
`;
