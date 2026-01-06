import React from "react";
import { Link } from "react-router-dom";

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 bg-surface-light dark:bg-surface-dark p-4 rounded-2xl shadow-sm border border-transparent dark:border-gray-800">
      <div className="relative shrink-0">
        <Link to={`/product/${item.id}`}>
          <div
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-xl w-full sm:w-[100px] h-[100px]"
            style={{ backgroundImage: `url("${item.image}")` }}
          ></div>
        </Link>
      </div>
      <div className="flex flex-1 flex-col justify-between">
        <div className="flex justify-between items-start">
          <div>
            <Link to={`/product/${item.id}`}>
              <h3 className="text-[#181113] dark:text-white text-lg font-bold leading-snug hover:text-primary transition-colors">
                {item.name}
              </h3>
            </Link>
            <p className="text-primary font-bold text-lg mt-1">
              ₦{item.price.toLocaleString()}
            </p>
            {/* Keeping placeholder for options if not in data yet, or removing/making conditional */}
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
              Quantity: {item.quantity}
            </p>
          </div>
          <button
            onClick={() => onRemove(item.id)}
            className="text-gray-400 hover:text-primary transition-colors p-2 -mr-2"
          >
            <span className="material-symbols-outlined">delete</span>
          </button>
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-1 bg-[#f4f0f2] dark:bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => onUpdateQuantity(item.id, -1)}
              className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-white dark:hover:bg-gray-700 shadow-sm transition-all text-[#181113] dark:text-white cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">remove</span>
            </button>
            <input
              className="w-8 p-0 text-center bg-transparent border-none text-sm font-bold text-[#181113] dark:text-white focus:ring-0"
              readOnly
              type="number"
              value={item.quantity}
            />
            <button
              onClick={() => onUpdateQuantity(item.id, 1)}
              className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-white dark:hover:bg-gray-700 shadow-sm transition-all text-[#181113] dark:text-white cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">add</span>
            </button>
          </div>
          <span className="text-sm text-green-600 font-medium">In Stock</span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
