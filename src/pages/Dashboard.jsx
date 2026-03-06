import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import OrderDetailsModal from "../components/admin/OrderDetailsModal";

const Dashboard = ({ toggleDarkMode, darkMode }) => {
  const { userInfo, loading, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [orders, setOrders] = useState([]);
  const [fetchingOrders, setFetchingOrders] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    if (!loading && !userInfo) {
      navigate("/auth", { replace: true });
    }
  }, [userInfo, loading, navigate]);

  useEffect(() => {
    if (userInfo?.id) {
      fetchUserOrders();
    }
  }, [userInfo]);

  const fetchUserOrders = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/orders/user/${userInfo.id}`,
      );
      setOrders(response.data);
    } catch (error) {
      console.error("Failed to fetch user orders:", error);
    } finally {
      setFetchingOrders(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/auth");
  };

  if (loading || !userInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
        <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
      </div>
    );
  }

  const renderContent = () => {
    if (activeTab === "overview") {
      return (
        <div className="animate-fade-in-up">
          <h2 className="text-2xl font-bold text-[#181113] dark:text-white mb-6">
            Welcome back, {userInfo.name?.split(" ")[0] || "Guest"}!
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
    }
    if (activeTab === "orders") {
      return (
        <div className="animate-fade-in-up">
          <h2 className="text-2xl font-bold text-[#181113] dark:text-white mb-6">
            My Orders
          </h2>
          <div className="bg-white dark:bg-[#181113] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
            <div className="overflow-x-auto">
              {fetchingOrders ? (
                <div className="p-10 text-center text-gray-500">
                  Loading orders...
                </div>
              ) : orders.length === 0 ? (
                <div className="p-10 text-center text-gray-500">
                  You haven't placed any orders yet.
                </div>
              ) : (
                <table className="w-full text-left">
                  <thead className="bg-[#f4f0f2] dark:bg-gray-800/50">
                    <tr>
                      <th className="p-4 font-bold text-xs text-gray-500 uppercase tracking-wider">
                        Order ID
                      </th>
                      <th className="p-4 font-bold text-xs text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="p-4 font-bold text-xs text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="p-4 font-bold text-xs text-gray-500 uppercase tracking-wider">
                        Total
                      </th>
                      <th className="p-4 font-bold text-xs text-gray-500 uppercase tracking-wider text-right">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {orders.map((order) => (
                      <tr
                        key={order.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-800/20 transition-colors"
                      >
                        <td className="p-4 font-mono font-medium text-sm text-[#181113] dark:text-white">
                          {order.order_id_alias || `ORDER-${order.id}`}
                        </td>
                        <td className="p-4 text-sm text-gray-500">
                          {new Date(order.created_at).toLocaleDateString()}
                        </td>
                        <td className="p-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              order.status === "confirmed"
                                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                : order.status === "declined"
                                  ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                                  : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="p-4 font-bold text-[#181113] dark:text-white">
                          ₦{Number(order.total_amount).toLocaleString()}
                        </td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="text-primary hover:text-primary/80 font-bold text-sm bg-primary/10 hover:bg-primary/20 px-3 py-1.5 rounded-full transition-colors"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      );
    }
    if (activeTab === "settings") {
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
                  value={userInfo.name}
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
                  value={userInfo.email}
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
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col font-display bg-background-light dark:bg-background-dark ${darkMode ? "dark" : ""}`}
    >
      <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} />

      <div className="flex-1 w-full max-w-7xl mx-auto px-4 lg:px-8 py-8 flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="bg-white dark:bg-[#181113] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden sticky top-28">
            <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center gap-4">
              <div className="size-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xl">
                {userInfo.name?.charAt(0) || "U"}
              </div>
              <div>
                <h3 className="font-bold text-[#181113] dark:text-white line-clamp-1">
                  {userInfo.name}
                </h3>
                <p className="text-xs text-gray-500">Customer</p>
              </div>
            </div>
            <nav className="p-2 flex flex-col gap-1">
              <button
                onClick={() => setActiveTab("overview")}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors ${activeTab === "overview" ? "bg-primary/10 text-primary font-bold" : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 font-medium"}`}
              >
                <span className="material-symbols-outlined">dashboard</span>
                Overview
              </button>
              <button
                onClick={() => setActiveTab("orders")}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors ${activeTab === "orders" ? "bg-primary/10 text-primary font-bold" : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 font-medium"}`}
              >
                <span className="material-symbols-outlined">shopping_bag</span>
                My Orders
              </button>
              <button
                onClick={() => setActiveTab("settings")}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors ${activeTab === "settings" ? "bg-primary/10 text-primary font-bold" : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 font-medium"}`}
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
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">{renderContent()}</main>
      </div>

      <Footer />

      {/* Order Details Modal */}
      <OrderDetailsModal
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        order={selectedOrder}
      />
    </div>
  );
};

export default Dashboard;
