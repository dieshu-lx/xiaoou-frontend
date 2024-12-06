import { LeftOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const CommonHeader = () => {
  const navigate = useNavigate();
  return (
    <StyledCommonHeader>
      <StyledBack onClick={() => navigate('/')}>
        <LeftOutlined style={{ fontSize: 18 }} />
        <span style={{ marginLeft: 8 }}>返回主页</span>
      </StyledBack>
    </StyledCommonHeader>
  );
};

const StyledCommonHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
`;

const StyledBack = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 16px;
`;
