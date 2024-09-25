import styled from '@emotion/styled';
import React, { useState, useEffect, memo } from 'react';

interface DraggableSplitLayoutProps {
  left: React.ReactNode;
  children: React.ReactNode;
  dividerStyle?: React.CSSProperties;
  defaultWidth?: number;
}

export const DraggableSplitLayout = memo(({ left, children, dividerStyle, defaultWidth = 200 }: DraggableSplitLayoutProps) => {
  const [startX, setStartX] = useState(0);
  const [leftWidth, setLeftWidth] = useState<number>(defaultWidth);
  const [isDragging, setIsDragging] = useState(false);

  const onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    setStartX(e.clientX); // 初始位置
    setIsDragging(true);
  };

  const onDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    if (e.clientX > 0) {
      const newWidth = leftWidth! + e.clientX - startX;
      setLeftWidth(newWidth);
      localStorage.setItem('leftWidth', newWidth.toString());
    }
    setIsDragging(false);
  };

  useEffect(() => {
    const savedWidth = localStorage.getItem('leftWidth');
    if (savedWidth) {
      return setLeftWidth(parseInt(savedWidth, 10));
    }
  }, []);

  return (
    <StyledDraggableSplitLayout>
      <StyledLeftContainer style={{ width: leftWidth }}>{left}</StyledLeftContainer>
      <StyledDivider style={{ ...dividerStyle, left: leftWidth }} draggable onDragStart={onDragStart} onDragEnd={onDragEnd} isDragging={isDragging} />
      <StyledContentContainer>{children}</StyledContentContainer>
    </StyledDraggableSplitLayout>
  );
});

const StyledDraggableSplitLayout = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
`;

const StyledDivider = styled.div<{ isDragging: boolean }>`
  width: 2px;
  height: 100%;
  background-color: #000;
  cursor: col-resize;
  display: ${({ isDragging }) => (isDragging ? 'block' : 'none')};
  position: absolute;
  top: 0;

  &:hover {
    display: block !important;
  }
`;

const StyledLeftContainer = styled.div`
  height: 100%;
  background-color: blueviolet;

  &:hover {
    & + div {
      display: block !important;
    }
  }
`;

const StyledContentContainer = styled.div`
  flex: 1;
  height: 100%;
  background-color: aqua;
`;
