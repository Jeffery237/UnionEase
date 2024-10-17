import React from "react";
import ReactDOM from "react-dom";

// Modal component that accepts `children` as content and `onClose` as a prop to close the modal
function Modal({ children, onClose }) {
  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2 relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ✖
        </button>
        <div className="modal-content">{children}</div>
      </div>
    </div>,
    document.getElementById("modal-root") // Portal the modal to an element with the id `modal-root`
  );
}

export default Modal;
