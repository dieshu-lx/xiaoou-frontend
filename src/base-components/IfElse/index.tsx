import React from 'react';

interface IIfElseProps {
  condition: boolean;
  children: React.ReactNode;
  else?: React.ReactNode;
}

export const IfElse = ({ condition, children, else: Else }: IIfElseProps) => {
  return condition ? children : Else;
};
