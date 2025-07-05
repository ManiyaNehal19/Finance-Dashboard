import React, { useEffect } from 'react';

function ErrorPopup({ message, onClose }) {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // 3 seconds

      return () => clearTimeout(timer); // Cleanup if unmounted
    }
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded shadow-lg min-w-[300px] max-w-[90%] text-center font-semibold">
      {message}
    </div>
  );
}

export default ErrorPopup;
