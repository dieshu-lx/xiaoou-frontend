import styled from '@emotion/styled';
import { message } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { MainLayout } from '@/base-components/layouts/default-layout';

const navList = [
  { label: '小欧问答', value: '/chat' },
  { label: '小欧天气', value: '' },
  { label: '小欧邮件', value: '' },
  { label: '小欧秘事', value: '' },
];

export const HomePage = () => {
  const navigate = useNavigate();

  const onNavClick = (path: string) => {
    if (!path) {
      message.info('敬请期待！！！');
      return;
    }
    navigate(path);
  };

  return (
    <MainLayout header={<StyledHeader>小欧百宝箱</StyledHeader>}>
      <StyledContent>
        <StyledNav>
          {navList.map((item) => (
            <StyledNavItem key={item.value} onClick={() => onNavClick(item.value)}>
              {item.label}
            </StyledNavItem>
          ))}
        </StyledNav>
      </StyledContent>
    </MainLayout>
  );
};

const StyledHeader = styled.div`
  text-align: center;
  font-size: 32px;
  font-weight: 600;
  padding: 12px;
  border-bottom: 1px solid #e8e8e8;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  border-radius: 12px;
`;

const StyledContent = styled.div`
  padding: 12px 40px;
  max-height: 100%;
  overflow: hidden auto;
`;

const StyledNav = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  border: 1px solid #ccc;
  padding: 12px;
  border-radius: 8px;
`;

const StyledNavItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  padding: 12px;
  border-radius: 12px;
  cursor: pointer;
  font-size: 24px;
  text-align: center;
  background-color: #ccc;
  transition: all 0.5s;

  &:hover {
    background-color: antiquewhite;
    transform: translate(1px, 1px);
  }
`;
