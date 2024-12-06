import { SendOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import { Input } from 'antd';
import React, { useState } from 'react';

import { chatStore } from '../../store';

interface IProps {
  onSend: (question: string) => void;
}

export const QuestionInput = ({ onSend }: IProps) => {
  const { loading } = chatStore;
  const [question, setQuestion] = useState('');

  const onSendMessage = () => {
    if (question) {
      onSend(question);
      setQuestion('');
    }
  };

  return (
    <StyledInput
      placeholder="请输入你的问题"
      value={question}
      onChange={(e) => setQuestion(e.target.value)}
      suffix={
        <StyledButton disabled={loading} onClick={onSendMessage}>
          <SendOutlined style={{ fontSize: 18 }} />
        </StyledButton>
      }
      onPressEnter={onSendMessage}
      disabled={loading}
    />
  );
};

const StyledInput = styled(Input)`
  width: 100%;
  height: 64px;
`;

const StyledButton = styled.div<{ disabled: boolean }>`
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ disabled }) => (disabled ? '#f5f5f5' : '#ccc')};
  border-radius: 50%;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`;
