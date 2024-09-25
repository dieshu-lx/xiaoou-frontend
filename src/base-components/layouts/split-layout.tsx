import styled from '@emotion/styled';
import React, { memo } from 'react';

interface SplitLayoutProps {
  leftSide?: React.ReactNode;
  rightSide?: React.ReactNode;
  children: React.ReactNode;
  leftStyle?: React.CSSProperties;
  rightStyle?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
}

export const SplitLayout = memo(({ leftSide, rightSide, children, leftStyle, rightStyle, contentStyle }: SplitLayoutProps) => {
  return (
    <StyledSplitLayout>
      {leftSide && <StyledLeftContainer style={leftStyle}>{leftSide}</StyledLeftContainer>}
      <StyledContentContainer style={contentStyle}>{children}</StyledContentContainer>
      {rightSide && <StyledRightContainer style={rightStyle}>{rightSide}</StyledRightContainer>}
    </StyledSplitLayout>
  );
});

const StyledSplitLayout = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;
  height: 100%;
`;

const StyledLeftContainer = styled.div`
  width: 200px;
  height: 100%;
`;

const StyledRightContainer = styled.div`
  width: 200px;
  height: 100%;
`;

const StyledContentContainer = styled.div`
  flex: 1;
  height: 100%;
`;
