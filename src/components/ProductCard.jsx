import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ productz }) => {
  const navigate = useNavigate();
  const isOutOfStock = productz.stock === 0;

  return (
    <div
      onClick={() => !isOutOfStock && navigate(`/product/${productz.id}`)}
      className={`group relative flex flex-col bg-white dark:bg-[#221016] rounded-2xl overflow-hidden transition-all duration-500 border border-gray-100 dark:border-gray-800 ${
        isOutOfStock
          ? "opacity-70 cursor-not-allowed"
          : "cursor-pointer hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(238,43,108,0.15)] dark:hover:shadow-[0_20px_40px_-15px_rgba(238,43,108,0.15)]"
      }`}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-[#f8f6f6] dark:bg-gray-800">
        {/* Badges: Out of Stock takes priority over Sale/New */}
        {isOutOfStock ? (
          <div className="absolute top-3 left-3 bg-gray-900/80 backdrop-blur-md text-white text-[10px] uppercase tracking-wider font-bold px-3 py-1.5 rounded-full z-10 shadow-sm">
            Sold Out
          </div>
        ) : productz.sale ? (
          <div className="absolute top-3 left-3 bg-red-500/90 backdrop-blur-md text-white text-[10px] uppercase tracking-wider font-bold px-3 py-1.5 rounded-full z-10 shadow-sm">
            Sale
          </div>
        ) : (
          <div className="absolute top-3 left-3 bg-white/90 dark:bg-black/80 backdrop-blur-md text-[#181113] dark:text-white text-[10px] uppercase tracking-wider font-bold px-3 py-1.5 rounded-full z-10 shadow-sm">
            New
          </div>
        )}

        {/* Favorite Button with Hover State */}
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevents navigating to the product page when clicking favorite
            // Add favorite logic here
          }}
          className="absolute top-3 right-3 bg-white/70 dark:bg-black/50 backdrop-blur-md p-2 rounded-full text-gray-500 dark:text-gray-300 opacity-0 lg:opacity-100 lg:-translate-y-2 group-hover:translate-y-0 group-hover:opacity-100 hover:text-primary hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 z-10 shadow-sm"
        >
          <span className="material-symbols-outlined text-[18px] block">
            favorite
          </span>
        </button>

        {/* Product Image */}
        <img
          src={productz.image}
          alt={productz.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Slide-up Quick Add Button — hidden when out of stock */}
        {!isOutOfStock && (
          <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-10">
            <button
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="w-full bg-white/95 dark:bg-[#221016]/95 backdrop-blur-sm text-[#181113] dark:text-white py-2.5 rounded-xl font-bold text-sm shadow-lg hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors"
            >
              Quick Add
            </button>
          </div>
        )}
      </div>

      {/* Product Details Section */}
      <div className="p-4 flex flex-col gap-1.5">
        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 line-clamp-1 group-hover:text-primary transition-colors">
          {productz.name}
        </h3>

        <div className="flex items-center gap-1.5 mt-0.5">
          <div className="flex items-center text-yellow-500">
            <span
              className="material-symbols-outlined text-[14px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              star
            </span>
          </div>
          <span className="text-gray-500 dark:text-gray-400 text-xs font-medium">
            {productz.rating}
          </span>
        </div>

        <div className="flex items-center justify-between mt-2">
          <span className="text-lg font-bold text-[#181113] dark:text-white">
            ₦{productz.price.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
