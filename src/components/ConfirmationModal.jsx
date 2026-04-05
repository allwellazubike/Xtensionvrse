import React from "react";

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  actionLabel = "Confirm",
  isDestructive = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-background-dark rounded-xl shadow-xl w-full max-w-sm overflow-hidden transform transition-all scale-100 opacity-100">
        <div className="p-6 text-center">
          <div
            className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full mb-4 ${
              isDestructive
                ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                : "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
            }`}
          >
            <span className="material-symbols-outlined text-2xl">
              {isDestructive ? "warning" : "check"}
            </span>
          </div>
          <h3 className="text-lg font-bold text-[#181113] dark:text-white mb-2">
            {title}
          </h3>
          <p className="text-sm text-gray-500 mb-6">{message}</p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className={`px-4 py-2 rounded-lg text-sm font-bold text-white shadow-sm transition-colors ${
                isDestructive
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {actionLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
