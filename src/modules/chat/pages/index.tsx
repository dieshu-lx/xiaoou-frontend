import styled from '@emotion/styled';
import { Input, Select } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';

import { IfElse } from '@/base-components/IfElse';
import { MainLayout } from '@/base-components/layouts/default-layout';
import { CommonHeader } from '@/components/common-header';

import { QuestionInput } from '../components';
import { Answer } from '../components/answer';
import { Question } from '../components/question';
import { chatStore } from '../store';

export const ChatPage = observer(() => {
  const { messages, sendMessage, mode, setMode, loading } = chatStore;
  const [token, setToken] = useState<string>('');

  const options = [
    { label: '对话', value: 'text' },
    { label: '图片', value: 'image' },
  ];

  const onModeChange = (value: 'text' | 'image') => {
    setMode(value);
  };

  const initContent = (
    <StyledContent>
      <StyledTitle>欢迎来到小欧问答</StyledTitle>
      <StyledDesc>我可以回答你的各种问题，也可以生成图片</StyledDesc>
    </StyledContent>
  );

  return (
    <MainLayout header={<CommonHeader />}>
      <StyledChat>
        <StyledMessages>
          <IfElse condition={!!messages.length} else={initContent}>
            {messages.map((message) => {
              if (message.role === 'user') {
                return (
                  <StyledMessage key={message.id} role={message.role}>
                    <Question question={message.content} />
                  </StyledMessage>
                );
              }
              return (
                <StyledMessage key={message.id} role={message.role}>
                  <Answer answer={message.content} type={message.type} />
                </StyledMessage>
              );
            })}
            {loading && (
              <StyledMessage role="assistant">
                <Answer answer="获取答案中，请稍后..." type="text" />
              </StyledMessage>
            )}
          </IfElse>
        </StyledMessages>
        <StyledFooter>
          <div style={{ display: 'flex', gap: 16 }}>
            <StyledSelect value={mode} options={options} onChange={(value) => onModeChange(value as 'text' | 'image')} />
            <StyledInput value={token} onChange={(e) => setToken(e.target.value)} placeholder="输入你的token（可选）" />
          </div>
          <QuestionInput onSend={(question: string) => sendMessage(question, token)} />
        </StyledFooter>
      </StyledChat>
    </MainLayout>
  );
});

const StyledChat = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  gap: 16px;
  padding: 16px;
`;

const StyledMessages = styled.div`
  flex: 1;
  overflow-y: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px 0;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const StyledMessage = styled.div<{ role: 'user' | 'assistant' }>`
  width: 100%;
  display: flex;
  justify-content: ${({ role }) => (role === 'user' ? 'flex-end' : 'flex-start')};
`;

const StyledFooter = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StyledSelect = styled(Select)`
  width: 200px;
`;

const StyledContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const StyledTitle = styled.div`
  font-size: 32px;
  color: #333;
  font-weight: 500;
`;

const StyledDesc = styled.div`
  color: #999;
  font-size: 24px;
`;

const StyledInput = styled(Input)``;
