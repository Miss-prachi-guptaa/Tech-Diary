import { useState, useEffect } from 'react';

/**
 * Delays updating a value until user stops changing it
 * 
 * Example:
 * user types fast → "docker"
 * value only updates after 300ms of no typing
 * prevents API call on every single keystroke
 */
export function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // set a timer every time value changes
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // cancel previous timer if value changes again before delay
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}