import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';

const Modal = ({ isOpen, onClose, children ,style}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 bg-gray-900" style={style}>
      <div className="bg-white rounded-lg p-6">
        <div className="flex justify-end">
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <AiOutlineClose size={20} />
          </button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
