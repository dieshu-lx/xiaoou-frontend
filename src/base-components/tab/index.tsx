import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';

interface ITabItem {
  label: string;
  value: string;
}

interface ITabProps {
  style?: React.CSSProperties;
  tabs: ITabItem[];
  activeTab?: string;
  defaultActive?: string;
  onChange?: (value: string) => void;
}

export const Tab = ({ tabs, style, defaultActive, onChange }: ITabProps) => {
  const [activeTabValue, setActiveTabValue] = useState<string | undefined>(defaultActive);

  const onTabChange = (value: string) => {
    if (value === activeTabValue) return;
    setActiveTabValue(value);
    onChange?.(value);
  };

  useEffect(() => {
    if (defaultActive) {
      setActiveTabValue(defaultActive);
    }
  }, []);

  return (
    <StyledTab style={style}>
      {tabs.map((tab) => (
        <StyledTabItem key={tab.value} className={activeTabValue === tab.value ? 'tab-item-active' : ''} onClick={() => onTabChange(tab.value)}>
          {tab.label}
        </StyledTabItem>
      ))}
    </StyledTab>
  );
};

const StyledTab = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  .tab-item-active {
    ::after {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

const StyledTabItem = styled.div`
  cursor: pointer;

  ::after {
    content: '';
    display: block;
    width: 100%;
    height: 2px;
    transition:
      opacity 0.3s ease,
      transform 0.3s ease;
    opacity: 0;
    transform: translateX(20px);
    background-color: #000;
  }
`;
