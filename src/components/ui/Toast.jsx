import React, { useEffect } from "react";

const Toast = ({ message, type = "info", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColors = {
    success:
      "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200",
    error:
      "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200",
    info: "bg-stone-50 dark:bg-stone-900/20 border-primary/20 text-primary dark:text-stone-200",
  };

  const icons = {
    success: "check_circle",
    error: "error",
    info: "info",
  };

  return (
    <div
      className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-6 py-4 rounded-xl border shadow-lg shadow-black/5 animate-in slide-in-from-top-full duration-300 ${bgColors[type]}`}
    >
      <span className="material-symbols-outlined text-[20px]">
        {icons[type]}
      </span>
      <p className="text-sm font-medium">{message}</p>
      <button
        onClick={onClose}
        className="ml-2 opacity-50 hover:opacity-100 transition-opacity"
      >
        <span className="material-symbols-outlined text-[18px]">close</span>
      </button>
    </div>
  );
};

export default Toast;
