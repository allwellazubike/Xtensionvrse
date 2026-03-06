import React from "react";

const OverviewTab = ({ userInfo, orders }) => {
  return (
    <div className="animate-fade-in-up">
      <h2 className="text-2xl font-bold text-[#181113] dark:text-white mb-6">
        Welcome back, {userInfo?.name?.split(" ")[0] || "Guest"}!
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-[#181113] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="size-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-4">
            <span className="material-symbols-outlined">shopping_bag</span>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm font-bold uppercase tracking-widest mb-1">
            Total Orders
          </p>
          <h3 className="text-3xl font-bold text-[#181113] dark:text-white">
            {orders.length}
          </h3>
        </div>
      </div>
      <h3 className="text-xl font-bold text-[#181113] dark:text-white mb-4">
        Recent Activity
      </h3>
      <div className="bg-white dark:bg-[#181113] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 text-center text-gray-500">
        {orders.length > 0
          ? `You placed your last order on ${new Date(orders[0].created_at).toLocaleDateString()}`
          : "No recent activity right now."}
      </div>
    </div>
  );
};

export default OverviewTab;
