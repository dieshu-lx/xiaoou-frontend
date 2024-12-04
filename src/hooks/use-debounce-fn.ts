import { useRef, useEffect } from 'react';

export const useDebounceFn = <T>(fn: (...args: T[]) => void, delay: number) => {
  const timer = useRef<NodeJS.Timeout | null>(null);

  const debounceFn = (...args: T[]) => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      fn(...args);
    }, delay);
  };

  const cancel = () => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  };

  useEffect(() => {
    return () => {
      cancel();
    };
  }, []);

  return { debounceFn, cancel };
};
