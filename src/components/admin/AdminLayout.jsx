import React, { useState } from "react";
import Sidebar from "./Sidebar";

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-full">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <main className="flex-1 flex flex-col h-full overflow-hidden relative bg-background-light dark:bg-background-dark">
        {/* Mobile Header for Sidebar Toggle */}
        <div className="lg:hidden p-4 bg-white dark:bg-[#2d1b22] border-b border-[#e6dbdf] dark:border-[#4a2e36] flex items-center gap-4">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 text-[#89616f] hover:bg-[#f4f0f2] rounded-xl"
          >
            <span className="material-symbols-outlined">menu</span>
          </button>
          <span className="font-bold text-[#181113] dark:text-white">
            Admin Panel
          </span>
        </div>
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
