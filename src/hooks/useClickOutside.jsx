import React, { useEffect } from "react";

/**
 * Custom hook that manages the closing of a component when a user clicks outside
 * of it or presses the "Escape" key.
 *
 * @param {Object} params - Parameters for the hook.
 * @param {Function} params.setState - Function to update the component's
 * visibility state. It is called with `false` when a click outside is detected
 * or "Escape" key is pressed.
 */

export default function useClickOutside({ setState }) {
  useEffect(() => {
    const handleGlobalKey = (e) => {
      if (e.key === "Escape") {
        setState(false);
        e.stopPropagation();
      }
    };
    window.addEventListener("keydown", handleGlobalKey);
    return () => window.removeEventListener("keydown", handleGlobalKey);
  }, [setState]);

  useEffect(() => {
    const clickOutside = () => setState(false);

    document.addEventListener("click", clickOutside);

    return () => document.removeEventListener("click", clickOutside);
  });

  return;
}
