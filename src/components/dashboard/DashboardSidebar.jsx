import React from "react";

const DashboardSidebar = ({
  userInfo,
  activeTab,
  setActiveTab,
  handleLogout,
}) => {
  return (
    <div className="bg-white dark:bg-[#181113] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden sticky top-28">
      <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center gap-4">
        <div className="size-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xl">
          {userInfo?.name?.charAt(0) || "U"}
        </div>
        <div>
          <h3 className="font-bold text-[#181113] dark:text-white line-clamp-1">
            {userInfo?.name || "User"}
          </h3>
          <p className="text-xs text-gray-500">Customer</p>
        </div>
      </div>
      <nav className="p-2 flex flex-col gap-1">
        <button
          onClick={() => setActiveTab("overview")}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors ${
            activeTab === "overview"
              ? "bg-primary/10 text-primary font-bold"
              : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 font-medium"
          }`}
        >
          <span className="material-symbols-outlined">dashboard</span>
          Overview
        </button>
        <button
          onClick={() => setActiveTab("orders")}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors ${
            activeTab === "orders"
              ? "bg-primary/10 text-primary font-bold"
              : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 font-medium"
          }`}
        >
          <span className="material-symbols-outlined">shopping_bag</span>
          My Orders
        </button>
        <button
          onClick={() => setActiveTab("settings")}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors ${
            activeTab === "settings"
              ? "bg-primary/10 text-primary font-bold"
              : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 font-medium"
          }`}
        >
          <span className="material-symbols-outlined">settings</span>
          Account Settings
        </button>
        <div className="h-px bg-gray-100 dark:bg-gray-800 my-2"></div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-left text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 font-medium transition-colors"
        >
          <span className="material-symbols-outlined">logout</span>
          Sign Out
        </button>
      </nav>
    </div>
  );
};

export default DashboardSidebar;
