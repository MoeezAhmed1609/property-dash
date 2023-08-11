import React from 'react';

const LoadingModal1 = ({ isLoading }) => {
  return (
    <div
      className={`${
        isLoading ? 'fixed inset-0 flex items-center justify-center' : 'hidden'
      } bg-black bg-opacity-50`}
    >
      <div className="bg-white p-4 rounded-lg">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        <p className="mt-4">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingModal1;
