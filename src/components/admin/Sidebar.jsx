import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
        fixed inset-y-0 left-0 w-64 bg-white dark:bg-[#2d1b22] border-r border-[#e6dbdf] dark:border-[#4a2e36] flex flex-col z-40 transition-transform duration-300 transform lg:translate-x-0 lg:static lg:shrink-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div className="p-6 pb-2">
          <div className="flex items-center gap-3">
            <div
              className="bg-center bg-no-repeat bg-cover rounded-full size-10 border-2 border-primary/20"
              data-alt="Abstract pink and purple gradient logo circle"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD131XS17tEvReeU0WIpwTItz8-hql52v9bzxfakudnoeFe_DWwqC5vS55J3fJA2mesmmndaP6NkNrcOOJbnAWrOcNzZkYrRVY7KYrbeBjtZ9ZhHppkSayw3pX0gxsElXs7lCqiICmEX0xXZENDcU7mc7N0RiCBz_G3Fipdy4Bk-dR4H_PIxCo2kmJOJFj1O2tde-pjryvjOwMopqJM53lr79dCXVYMulbl_gc2Yf-YkGKQLFTdufxWD3mao5ZtKUUO4XaJxULOXlg")',
              }}
            ></div>
            <div className="flex flex-col">
              <h1 className="text-[#181113] dark:text-white text-base font-bold leading-tight">
                Xtensionsvrse
              </h1>
              <p className="text-[#89616f] dark:text-white/60 text-xs font-normal">
                Admin Panel
              </p>
            </div>
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-2">
          <Link
            className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-colors group ${isActive("/admin/dashboard") || isActive("/admin/analytics") ? "bg-primary/10 text-primary" : "hover:bg-[#f4f0f2] dark:hover:bg-white/5"}`}
            to="/admin/dashboard"
          >
            <span
              className={`material-symbols-outlined ${isActive("/admin/dashboard") || isActive("/admin/analytics") ? "fill-1" : "text-[#89616f] dark:text-white/60 group-hover:text-primary"}`}
            >
              dashboard
            </span>
            <span
              className={`text-sm ${isActive("/admin/dashboard") || isActive("/admin/analytics") ? "font-bold" : "font-medium text-[#181113] dark:text-white"}`}
            >
              Dashboard
            </span>
          </Link>
          <Link
            className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-colors group ${isActive("/admin/products") ? "bg-primary/10 text-primary" : "hover:bg-[#f4f0f2] dark:hover:bg-white/5"}`}
            to="/admin/products"
          >
            <span
              className={`material-symbols-outlined ${isActive("/admin/products") ? "fill-1" : "text-[#89616f] dark:text-white/60 group-hover:text-primary"}`}
            >
              inventory_2
            </span>
            <span
              className={`text-sm ${isActive("/admin/products") ? "font-bold" : "font-medium text-[#181113] dark:text-white"}`}
            >
              Products
            </span>
          </Link>
          <Link
            className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-colors group ${isActive("/admin/orders") ? "bg-primary/10 text-primary" : "hover:bg-[#f4f0f2] dark:hover:bg-white/5"}`}
            to="/admin/orders"
          >
            <span
              className={`material-symbols-outlined ${isActive("/admin/orders") ? "fill-1" : "text-[#89616f] dark:text-white/60 group-hover:text-primary"}`}
            >
              shopping_bag
            </span>
            <span
              className={`text-sm ${isActive("/admin/orders") ? "font-bold" : "font-medium text-[#181113] dark:text-white"}`}
            >
              Orders
            </span>
          </Link>
          <Link
            className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-[#f4f0f2] dark:hover:bg-white/5 transition-colors group"
            to="/admin/customers"
          >
            <span className="material-symbols-outlined text-[#89616f] dark:text-white/60 group-hover:text-primary">
              group
            </span>
            <span className="text-[#181113] dark:text-white text-sm font-medium">
              Customers
            </span>
          </Link>
        </nav>
        <div className="p-4 border-t border-[#e6dbdf] dark:border-[#4a2e36]">
          <Link
            className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-[#f4f0f2] dark:hover:bg-white/5 transition-colors group"
            to="/admin/settings"
          >
            <span className="material-symbols-outlined text-[#89616f] dark:text-white/60 group-hover:text-primary">
              settings
            </span>
            <span className="text-[#181113] dark:text-white text-sm font-medium">
              Settings
            </span>
          </Link>
          <div className="flex items-center gap-3 px-3 py-3 mt-2">
            <div
              className="bg-center bg-no-repeat bg-cover rounded-full size-8 bg-gray-200"
              data-alt="Profile picture of admin user"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC3uFPHGE9sLzXznGB0QtdQqjbmgnAJdK2npwlThwAyISepAiiG8xe423tTbagqaLrmRiW3goXodxjChtDcr4C-0FewsVzgGz96Mk-8ljeXc-yI1vaDfl6SEz5lQm8_O8llEUjYFAC6Kv-AuCuFEc2H32qSwrxkfnjwmpDti8oGYhxvVTbmy031yUfZUMV2unFiOPyGq7wmqZRnLPNCbJYWJSBRLEFcnsxcXO3sBiXehW4DJE8vZo10Z0LDlL7SM4r9d2WdVmJoM-U")',
              }}
            ></div>
            <div className="flex flex-col">
              <p className="text-[#181113] dark:text-white text-sm font-medium leading-none">
                Allwell
              </p>
              <p className="text-[#89616f] dark:text-white/50 text-xs mt-1">
                Logout
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
