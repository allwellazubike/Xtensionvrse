import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { userInfo, loading, logout } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!loading && !userInfo) {
      navigate("/auth", { replace: true });
    }
  }, [userInfo, loading, navigate]);

  const handleLogout = async () => {
    await logout();
    navigate("/auth");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#221016]">
        <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
      </div>
    );
  }

  // Prevent flash of content before redirect triggers
  if (!userInfo) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#221016]">
      <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl max-w-md w-full text-center border border-gray-100 dark:border-gray-800">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Hello {userInfo?.name || "User"}! 👋
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
          Welcome to your demo dashboard. If you are seeing this page, your
          sign-in was completely successful!
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate("/")}
            className="w-full py-3 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/30 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all"
          >
            Go to Home
          </button>
          <button
            onClick={handleLogout}
            className="w-full py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-bold rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
