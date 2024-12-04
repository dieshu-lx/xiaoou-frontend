import { useRef, useEffect } from 'react';

export const useThrottleFn = <T>(fn: (...args: T[]) => void, delay: number) => {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const throttleFn = (...args: T[]) => {
    if (timer.current) return;
    fn(...args);
    timer.current = setTimeout(() => {
      timer.current = null;
    }, delay);
  };

  const cancel = () => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  };

  useEffect(() => cancel, []);

  return { throttleFn, cancel };
};
