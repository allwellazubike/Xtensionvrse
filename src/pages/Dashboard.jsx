import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import OrderDetailsModal from "../components/admin/OrderDetailsModal";

// Sub-components
import OverviewTab from "../components/dashboard/OverviewTab";
import OrdersTab from "../components/dashboard/OrdersTab";
import SettingsTab from "../components/dashboard/SettingsTab";
import DashboardSidebar from "../components/dashboard/DashboardSidebar";

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

  return (
    <div
      className={`min-h-screen flex flex-col font-display bg-background-light dark:bg-background-dark ${darkMode ? "dark" : ""}`}
    >
      <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} />

      <div className="flex-1 w-full max-w-7xl mx-auto px-4 lg:px-8 py-8 flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 shrink-0">
          <DashboardSidebar
            userInfo={userInfo}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            handleLogout={handleLogout}
          />
        </aside>

        <main className="flex-1 min-w-0">
          {activeTab === "overview" && (
            <OverviewTab userInfo={userInfo} orders={orders} />
          )}
          {activeTab === "orders" && (
            <OrdersTab
              orders={orders}
              fetchingOrders={fetchingOrders}
              setSelectedOrder={setSelectedOrder}
            />
          )}
          {activeTab === "settings" && <SettingsTab userInfo={userInfo} />}
        </main>
      </div>

      <Footer />

      <OrderDetailsModal
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        order={selectedOrder}
      />
    </div>
  );
};

export default Dashboard;
