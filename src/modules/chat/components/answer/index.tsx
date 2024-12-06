import styled from '@emotion/styled';
import { Avatar, Image } from 'antd';
import React from 'react';
import Markdown from 'react-markdown';

import { IfElse } from '@/base-components/IfElse';

interface IProps {
  answer: string;
  type: 'text' | 'image';
}

export const Answer = ({ answer, type }: IProps) => {
  return (
    <StyledAnswer>
      <Avatar>🤖</Avatar>
      <StyledContent>
        <IfElse condition={type === 'image'} else={<StyledMarkdown>{answer}</StyledMarkdown>}>
          <StyledImage src={answer} />
        </IfElse>
      </StyledContent>
    </StyledAnswer>
  );
};

const StyledAnswer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  max-width: calc(100vw - 100px);
`;

const StyledContent = styled.div`
  flex: 1;
  font-size: 16px;
  word-break: break-word;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f5f5f5;
`;

const StyledImage = styled(Image)`
  width: 400px !important;
  height: 400px !important;
`;

const StyledMarkdown = styled(Markdown)`
  font-size: 16px;
  padding: 16px;

  p {
    margin: 0;
  }

  .quote {
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
  }

  .markdown-body p {
    word-break: break-all;
  }

  .corner {
    display: inline-flex;
    min-width: 16px;
    min-height: 16px;
    padding: 0px 4px;
    justify-content: center;
    align-items: center;
    border-radius: 16px;
    background: #e2e4e9;
    color: #353a46;
    text-align: center;
    font-size: 10px;
    line-height: 16px;
    cursor: pointer;
    margin: 0 2px;
    transform: translateY(-1px);

    &:hover {
      background: var(--Brand7, #5b57d2);
      color: #fff;
    }
  }
`;
