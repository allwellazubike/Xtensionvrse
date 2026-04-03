import React from "react";
import AddProductForm from "./AddProductForm";

const ProductDrawer = ({ isOpen, onClose, productToEdit, onProductSaved }) => {
  return (
    <>
      {/* Mobile/Tablet Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 2xl:hidden backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />
      )}

      <div
        className={`
        w-full max-w-2xl shrink-0 flex flex-col bg-white dark:bg-[#2d1b22] border-l border-[#e6dbdf] dark:border-[#4a2e36] shadow-2xl overflow-hidden 
        fixed top-0 right-0 h-full z-50 2xl:static 2xl:flex 2xl:h-full transition-transform duration-300
        ${isOpen ? "translate-x-0" : "translate-x-full 2xl:translate-x-0"}
      `}
      >
        <div className="px-6 py-5 border-b border-[#e6dbdf] dark:border-[#4a2e36] flex items-center justify-between bg-[#fbf9fa] dark:bg-[#221016]">
          <h2 className="text-xl font-bold text-[#181113] dark:text-white flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">{productToEdit ? "edit" : "add_circle"}</span>
            {productToEdit ? "Edit Product" : "Add New Product"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-full text-[#89616f] hover:text-[#181113] dark:text-white/70 dark:hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6 bg-background-light dark:bg-background-dark custom-scrollbar">
          <AddProductForm 
            initialProduct={productToEdit} 
            onCancel={onClose} 
            onSuccess={() => {
              if (onProductSaved) onProductSaved();
              onClose();
            }} 
          />
        </div>
      </div>
    </>
  );
};

export default ProductDrawer;
