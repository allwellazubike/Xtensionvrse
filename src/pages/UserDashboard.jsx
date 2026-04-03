import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import OrderDetailsModal from "../components/admin/OrderDetailsModal";

const UserDashboard = ({ toggleDarkMode, darkMode }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in (simulated with localStorage for now or simple check)
    // In a real app, you'd use a Context or Redux store
    const storedUser = localStorage.getItem("user"); // Assuming you store user info on login

    // For now, if no user API is hooked up for "me", we might need to rely on what was saved during login
    // Or redirect if not found.
    // Let's assume for this MVP we stored a simple user object or ID.
    // If not, we might need to mock or fetch.

    // TEMPORARY: If no user in local storage, redirect to auth
    if (!storedUser) {
      navigate("/auth");
    } else {
      setUser(JSON.parse(storedUser));
    }

    fetchOrders();
  }, [navigate]);

  const fetchOrders = async () => {
    try {
      // In a real app, user ID would come from the auth token/context
      // For this implementation, we'll try to get it from localStorage or use a fallback/placeholder
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const userId = storedUser?.id || 1; // Fallback to ID 1 for testing if not found

      const response = await axios.get(
        (import.meta.env.VITE_API_URL || "http://localhost:3000") + `/api/orders/user/${userId}`,
      );
      setOrders(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user orders:", error);
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? "dark" : ""}`}>
      <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} />

      <main className="flex-1 bg-gray-50 dark:bg-background-dark py-12 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-[#181113] dark:text-white mb-2">
                My Account
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                Welcome back, {user?.name || "Guest"}!
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-sm font-medium transition-colors text-gray-700 dark:text-gray-300 flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">logout</span>
              Sign Out
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Orders Section */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-xl font-bold text-[#181113] dark:text-white flex items-center gap-2">
                <span className="material-symbols-outlined">shopping_bag</span>
                Recent Orders
              </h2>

              {loading ? (
                <div className="text-center py-12 text-gray-500">
                  Loading orders...
                </div>
              ) : orders.length === 0 ? (
                <div className="bg-white dark:bg-[#2d1b22] rounded-2xl p-12 text-center border border-gray-100 dark:border-gray-800 shadow-sm">
                  <div className="bg-gray-50 dark:bg-gray-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="material-symbols-outlined text-3xl text-gray-400">
                      shopping_cart_off
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#181113] dark:text-white mb-2">
                    No orders yet
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Looks like you haven't placed any orders yet.
                  </p>
                  <Link
                    to="/products"
                    className="inline-flex items-center px-6 py-3 bg-[#89616f] hover:bg-[#89616f]/90 text-white rounded-full font-bold transition-all"
                  >
                    Start Shopping
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="bg-white dark:bg-[#2d1b22] p-5 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => setSelectedOrder(order)}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-mono text-sm font-medium text-gray-500">
                              #{order.order_id_alias || order.id}
                            </span>
                            <span className="text-xs text-gray-400">
                              •{" "}
                              {new Date(order.created_at).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="font-bold text-lg text-[#181113] dark:text-white">
                            ₦{Number(order.total_amount).toLocaleString()}
                          </div>
                        </div>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            order.status === "confirmed"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                              : order.status === "declined"
                                ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                                : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                        <div className="text-sm text-gray-500">
                          {/* Show first item name + more count if needed */}
                          {(() => {
                            const items =
                              typeof order.items === "string"
                                ? JSON.parse(order.items)
                                : order.items;
                            const firstItem = items[0];
                            const moreCount = items.length - 1;
                            return (
                              <span>
                                {firstItem.name}{" "}
                                {moreCount > 0 && `+ ${moreCount} more`}
                              </span>
                            );
                          })()}
                        </div>
                        <button className="text-sm font-bold text-primary hover:underline">
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Profile Sidebar (Optional/Skeleton for now) */}
            <div className="space-y-6">
              <div className="bg-white dark:bg-[#2d1b22] p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                <h2 className="text-lg font-bold text-[#181113] dark:text-white mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined">person</span>
                  Profile Details
                </h2>
                <div className="space-y-4">
                  <div>
                    <span className="text-xs text-gray-500 uppercase tracking-wider block mb-1">
                      Email
                    </span>
                    <div className="text-sm font-medium text-[#181113] dark:text-white">
                      {user?.email || "Not available"}
                    </div>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 uppercase tracking-wider block mb-1">
                      Phone
                    </span>
                    <div className="text-sm font-medium text-[#181113] dark:text-white">
                      {user?.phone || "Not available"}
                    </div>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 uppercase tracking-wider block mb-1">
                      Member Since
                    </span>
                    <div className="text-sm font-medium text-[#181113] dark:text-white">
                      {user?.created_at
                        ? new Date(user.created_at).toLocaleDateString()
                        : "N/A"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <OrderDetailsModal
        order={selectedOrder}
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />

      <Footer />
    </div>
  );
};

export default UserDashboard;
