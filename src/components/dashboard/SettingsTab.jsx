import React from "react";

const SettingsTab = ({ userInfo }) => {
  return (
    <div className="animate-fade-in-up">
      <h2 className="text-2xl font-bold text-[#181113] dark:text-white mb-6">
        Account Settings
      </h2>
      <div className="bg-white dark:bg-[#181113] p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 max-w-2xl">
        <h3 className="text-lg font-bold text-[#181113] dark:text-white mb-4 border-b border-gray-100 dark:border-gray-800 pb-2">
          Profile Information
        </h3>
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">
              Full Name
            </label>
            <input
              type="text"
              disabled
              value={userInfo?.name || ""}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-500 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              disabled
              value={userInfo?.email || ""}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-500 cursor-not-allowed"
            />
          </div>
        </div>
        <p className="text-sm text-gray-500 text-center bg-blue-50 dark:bg-blue-900/20 p-3 rounded-xl">
          <span className="material-symbols-outlined text-sm inline-block translate-y-0.5 mr-1 text-blue-500">
            info
          </span>
          Profile updates coming soon. Contact support to change your email.
        </p>
      </div>
    </div>
  );
};

export default SettingsTab;
