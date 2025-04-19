import { useCallback, useMemo, useRef, useEffect, useState } from "react";

/**
 * Custom hook for performance optimization
 *
 * @param {Function} callback - The callback function to optimize
 * @param {Array} dependencies - The dependencies array for the callback
 * @returns {Function} - The memoized callback function
 */
export const useOptimizedCallback = (callback, dependencies) => {
  return useCallback(callback, dependencies);
};

/**
 * Custom hook for memoizing expensive computations
 *
 * @param {Function} factory - The factory function that returns the computed value
 * @param {Array} dependencies - The dependencies array for the factory
 * @returns {any} - The memoized value
 */
export const useOptimizedMemo = (factory, dependencies) => {
  return useMemo(factory, dependencies);
};

/**
 * Custom hook for debouncing function calls
 *
 * @param {Function} callback - The callback function to debounce
 * @param {number} delay - The delay in milliseconds
 * @returns {Function} - The debounced callback function
 */
export const useDebounce = (callback, delay) => {
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (...args) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};

/**
 * Custom hook for throttling function calls
 *
 * @param {Function} callback - The callback function to throttle
 * @param {number} limit - The time limit in milliseconds
 * @returns {Function} - The throttled callback function
 */
export const useThrottle = (callback, limit) => {
  const inThrottle = useRef(false);

  useEffect(() => {
    return () => {
      inThrottle.current = false;
    };
  }, []);

  return (...args) => {
    if (!inThrottle.current) {
      callback(...args);
      inThrottle.current = true;
      setTimeout(() => {
        inThrottle.current = false;
      }, limit);
    }
  };
};

/**
 * Custom hook for lazy loading images
 *
 * @param {string} src - The image source URL
 * @param {string} [placeholder] - The placeholder image URL
 * @returns {Object} - An object containing the image source and loading state
 */
export const useLazyImage = (
  src,
  placeholder = "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
) => {
  const [imgSrc, setImgSrc] = useState(placeholder);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImgSrc(src);
      setIsLoaded(true);
    };
  }, [src]);

  return { imgSrc, isLoaded };
};
