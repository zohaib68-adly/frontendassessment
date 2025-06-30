import { useCallback, useRef } from 'react';

/**
 * Custom hook that returns a debounced version of the provided function
 * @param callback - The function to debounce
 * @param delay - The delay in milliseconds
 * @returns A debounced version of the callback function
 */
export const useDebounce = () => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedFunction = useCallback(
      ({delay, callback}: {delay: number, callback: () => void}) => {
      // Clear the previous timeout if it exists
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Set a new timeout
      timeoutRef.current = setTimeout(() => {
          callback();
      }, delay);
    },
    []
  );

  return debouncedFunction;
};

export default useDebounce;
