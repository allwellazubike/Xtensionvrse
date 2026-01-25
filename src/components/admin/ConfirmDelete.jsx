import React from "react";

const ConfirmDelete = ({ isOpen, onClose, onConfirm, itemName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-all animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-white dark:bg-[#2d1b22] rounded-2xl shadow-xl border border-[#e6dbdf] dark:border-[#4a2e36] transform transition-all scale-100 animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="p-6">
          <div className="flex items-center justify-center size-12 mx-auto bg-red-100 dark:bg-red-900/30 rounded-full mb-4">
            <span className="material-symbols-outlined text-red-600 dark:text-red-400 text-2xl">
              warning
            </span>
          </div>

          <div className="text-center">
            <h3
              id="modal-title"
              className="text-lg font-bold text-[#181113] dark:text-white mb-2"
            >
              Delete Product
            </h3>
            <p className="text-sm text-[#89616f] dark:text-white/60 mb-6">
              Are you sure you want to delete{" "}
              {itemName ? (
                <span className="font-semibold text-[#181113] dark:text-white">
                  "{itemName}"
                </span>
              ) : (
                "this item"
              )}
              ? This action cannot be undone.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 bg-white dark:bg-white/5 border border-[#e6dbdf] dark:border-[#4a2e36] text-[#5d4a51] dark:text-white/80 rounded-xl text-sm font-medium hover:bg-[#f4f0f2] dark:hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-4 py-2.5 bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-500 text-white rounded-xl text-sm font-medium shadow-sm transition-all hover:shadow-md focus:outline-none focus:ring-2 focus:ring-red-500/20"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDelete;
