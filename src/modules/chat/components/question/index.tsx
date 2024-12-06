import styled from '@emotion/styled';
import { Avatar } from 'antd';
import React from 'react';

interface IProps {
  question: string;
}

export const Question = ({ question }: IProps) => {
  return (
    <StyledQuestion>
      <StyledContent>{question}</StyledContent>
      <Avatar>👤</Avatar>
    </StyledQuestion>
  );
};

const StyledQuestion = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  max-width: calc(100vw - 300px);
`;

const StyledContent = styled.div`
  font-size: 16px;
  word-break: break-word;
`;
