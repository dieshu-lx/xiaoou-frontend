import styled from '@emotion/styled';
import React from 'react';
import { NavLink } from 'react-router-dom';

export const CommonHeader = () => {
  return (
    <StyledHeaderContainer>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/about">About</NavLink>
    </StyledHeaderContainer>
  );
};

const StyledHeaderContainer = styled.div`
  height: 100px;
  width: 100%;
  display: flex;
  gap: 20px;
  justify-content: space-evenly;
`;
