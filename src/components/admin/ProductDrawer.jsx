import React from "react";
import AddProductForm from "./AddProductForm";

const ProductDrawer = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Mobile/Tablet Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-10 2xl:hidden"
          onClick={onClose}
        />
      )}

      <div
        className={`
        w-full max-w-4xl shrink-0 flex flex-col bg-white dark:bg-[#2d1b22] border-l border-[#e6dbdf] dark:border-[#4a2e36] shadow-xl shadow-pink-500/5 overflow-hidden 
        fixed top-0 right-0 h-full z-20 2xl:static 2xl:flex 2xl:h-full transition-transform duration-300
        ${isOpen ? "translate-x-0" : "translate-x-full 2xl:translate-x-0"}
      `}
      >
        <div className="px-6 py-4 border-b border-[#e6dbdf] dark:border-[#4a2e36] flex items-center justify-between bg-[#fbf9fa] dark:bg-white/5">
          <h2 className="text-lg font-bold text-[#181113] dark:text-white">
            Add New Product
          </h2>
          <button
            onClick={onClose}
            className="text-[#89616f] hover:text-[#181113] dark:text-white/50 dark:hover:text-white"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6 bg-background-light dark:bg-background-dark">
          <AddProductForm />
        </div>
      </div>
    </>
  );
};

export default ProductDrawer;
