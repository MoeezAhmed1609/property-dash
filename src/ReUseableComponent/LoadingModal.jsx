import React from 'react';

const LoadingModal = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <div className="bg-white p-4 rounded-lg">
        <div className="flex items-center justify-center mb-4">
          <svg className="animate-spin h-5 w-5 mr-2 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 004 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zM12 20c3.042 0 5.824-1.135 7.938-3l-2.647-3A7.962 7.962 0 0012 16v4zm5.291-14A7.962 7.962 0 0012 4V0c3.042 0 5.824 1.135 7.938 3l-2.647 3z"></path>
          </svg>
          <span className="text-blue-500 font-semibold">Loading...</span>
        </div>
        {/* You can customize the loading modal's content or add additional elements here */}
      </div>
    </div>
  );
};

export default LoadingModal;
