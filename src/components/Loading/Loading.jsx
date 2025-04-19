import React from "react";

const Loading = () => {
  return (
    <div
      className="flex items-center justify-center min-h-[200px]"
      data-test="loading-spinner"
      role="status"
      aria-live="polite"
      aria-label="Loading content"
    >
      <div className="relative">
        <div className="w-12 h-12 rounded-full absolute border-4 border-solid border-gray-200"></div>
        <div
          className="w-12 h-12 rounded-full animate-spin absolute border-4 border-solid border-blue-500 border-t-transparent"
          aria-hidden="true"
        ></div>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default React.memo(Loading);
