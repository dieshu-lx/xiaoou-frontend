import styled from '@emotion/styled';
import React from 'react';

import { Tab } from '@/base-components/tab';

export const HomePage = () => {
  return (
    <StyledHomeContainer>
      <Tab
        defaultActive="tab1"
        tabs={[
          { label: 'Tab1', value: 'tab1' },
          { label: 'Tab2', value: 'tab2' },
        ]}
      />
    </StyledHomeContainer>
  );
};

const StyledHomeContainer = styled.div`
  width: 200px;
  height: 200px;
  text-align: center;
`;
