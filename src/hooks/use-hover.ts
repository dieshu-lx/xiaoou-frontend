import { useState, useEffect } from 'react';

export const useHover = (target: React.RefObject<HTMLElement>) => {
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const element = target.current;
    if (element) {
      element.addEventListener('mouseenter', () => setIsHovering(true));
      element.addEventListener('mouseleave', () => setIsHovering(false));
    }

    return () => {
      if (element) {
        element.removeEventListener('mouseenter', () => setIsHovering(true));
        element.removeEventListener('mouseleave', () => setIsHovering(false));
      }
    };
  }, [target]);

  return { isHovering };
};
