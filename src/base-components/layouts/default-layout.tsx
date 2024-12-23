import styled from '@emotion/styled';
import React, { memo } from 'react';

interface IMainLayoutProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

export const MainLayout = memo(({ header, children, footer }: IMainLayoutProps) => {
  return (
    <StyledMainLayout>
      {header && <StyledHeaderContainer>{header}</StyledHeaderContainer>}
      <StyledContentContainer>{children}</StyledContentContainer>
      {footer && <StyledFooterContainer>{footer}</StyledFooterContainer>}
    </StyledMainLayout>
  );
});

const StyledMainLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
`;

const StyledHeaderContainer = styled.div`
  flex-shrink: 0;
  width: 100%;
`;

const StyledContentContainer = styled.div`
  flex: 1;
  width: 100%;
`;

const StyledFooterContainer = styled.div`
  width: 100%;
  flex-shrink: 0;
`;
