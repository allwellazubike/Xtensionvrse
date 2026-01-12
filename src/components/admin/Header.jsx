import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white dark:bg-[#2d1b22] border-b border-[#e6dbdf] dark:border-[#4a2e36] px-8 py-5 shrink-0 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Link
          className="hidden md:flex items-center justify-center size-10 rounded-xl border border-[#e6dbdf] dark:border-[#4a2e36] text-[#89616f] hover:text-primary hover:border-primary transition-all bg-white dark:bg-white/5 group shadow-sm"
          to="/admin/products"
        >
          <span className="material-symbols-outlined group-hover:-translate-x-0.5 transition-transform">
            arrow_back
          </span>
        </Link>
        <div className="flex flex-col gap-1">
          {/* <div className="flex items-center gap-2 text-sm text-[#89616f] dark:text-white/50">
            <Link
              className="hover:text-primary transition-colors"
              to="/admin/products"
            >
              Products
            </Link>
            <span className="material-symbols-outlined text-[12px]">
              chevron_right
            </span>
            <span className="text-[#181113] dark:text-white font-medium">
              Create New
            </span>
          </div> */}
          <h1 className="text-2xl font-bold text-[#181113] dark:text-white tracking-tight">
            Add New Product
          </h1>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-xl text-[#89616f] hover:bg-[#f4f0f2] dark:text-white/60 dark:hover:bg-white/5 transition-colors">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-2 right-2 size-2 bg-primary rounded-full border-2 border-white dark:border-[#2d1b22]"></span>
        </button>
      </div>
    </header>
  );
};

export default Header;
