import React from "react";

const LoadingOverlay = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="w-36 h-36 border-t-8 border-blue-500 border-solid rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingOverlay;
