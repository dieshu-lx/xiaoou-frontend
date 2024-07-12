import styled from '@emotion/styled';
import React from 'react';

export const AboutPage = () => {
  return (
    <StyledAboutContainer>
      <StyledText>
        This is&nbsp;
        <span style={{ color: '#7d60ff' }}>About</span>
        &nbsp;page !
      </StyledText>
    </StyledAboutContainer>
  );
};

const StyledAboutContainer = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
`;

const StyledText = styled.span`
  font-size: 18px;
`;
