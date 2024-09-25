import { useRef } from 'react';

export const useDebounceFn = <T>(fn: (...args: T[]) => void, delay: number) => {
  const timer = useRef<NodeJS.Timeout | null>(null);

  const _fn = (...args: T[]) => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      fn(...args);
    }, delay);
  };

  return _fn;
};
