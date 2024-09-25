import { useRef } from 'react';

export const useThrottleFn = (fn: () => void, delay: number) => {
  const timer = useRef<NodeJS.Timeout | null>(null);

  const _fn = () => {
    if (timer.current) {
      return;
    }
    fn();
    timer.current = setTimeout(() => {
      timer.current = null;
    }, delay);
  };

  return _fn;
};
