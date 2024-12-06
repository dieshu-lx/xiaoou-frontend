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
  width: 100%;
  height: 100%;
`;

const StyledHeaderContainer = styled.div`
  width: 100%;
`;

const StyledContentContainer = styled.div`
  width: 100%;
`;

const StyledFooterContainer = styled.div`
  width: 100%;
`;
