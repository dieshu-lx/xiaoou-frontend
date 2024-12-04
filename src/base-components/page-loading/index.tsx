import styled from '@emotion/styled';
import React from 'react';

export const PageLoading = () => {
  return (
    <StyledPageLoading>
      <div className="loading-icon-container">
        <div className="loading-icon-fff" />
        <div className="loading-icon-ccc" />
        <div className="loading-icon-fff" />
      </div>
    </StyledPageLoading>
  );
};

const StyledPageLoading = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 9999;

  @keyframes spin-dot-000 {
    0%,
    100% {
      background-color: #5070ee;
      transform: scale(1);
    }
    50% {
      background-color: #fff;
      transform: scale(1.2);
    }
  }

  @keyframes spin-dot-fff {
    0%,
    100% {
      background-color: #fff;
      transform: scale(1);
    }
    50% {
      background-color: #5070ee;
      transform: scale(1.2);
    }
  }

  @keyframes spin {
    0%,
    100% {
      left: 45%;
    }
    50% {
      left: 55%;
    }
  }

  .loading-icon-container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: fit-content;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: spin 3s ease-in-out infinite;
  }

  .loading-icon-fff,
  .loading-icon-ccc {
    width: 12px;
    height: 12px;
    display: inline-block;
    margin: 0 8px;
  }

  .loading-icon-fff::after,
  .loading-icon-ccc::after {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #5070ee;
  }

  .loading-icon-fff::after {
    animation: spin-dot-000 1.5s ease-in-out infinite;
  }

  .loading-icon-ccc::after {
    animation: spin-dot-fff 1.5s ease-in-out infinite;
  }
`;
