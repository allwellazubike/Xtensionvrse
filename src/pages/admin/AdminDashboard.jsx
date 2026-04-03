import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import AdminLayout from "../../components/admin/AdminLayout";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get((import.meta.env.VITE_API_URL || "http://localhost:3000") + "/api/orders");
      setOrders(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setLoading(false);
    }
  };

  // --- Data Processing for Stats ---
  const stats = useMemo(() => {
    if (!orders.length)
      return { totalRevenue: 0, totalOrders: 0, averageOrderValue: 0 };

    const confirmedOrders = orders.filter((o) => o.status === "confirmed");
    const totalRevenue = confirmedOrders.reduce(
      (sum, order) => sum + Number(order.total_amount),
      0,
    );
    const totalOrders = orders.length;
    const averageOrderValue =
      confirmedOrders.length > 0 ? totalRevenue / confirmedOrders.length : 0;

    return { totalRevenue, totalOrders, averageOrderValue };
  }, [orders]);

  // --- Data Processing for Charts ---
  const revenueData = useMemo(() => {
    // Group confirmed orders by date (last 7 days for simplicity, or just all available dates)
    const confirmedOrders = orders.filter((o) => o.status === "confirmed");

    // Create a map to accumulate revenue by date string (YYYY-MM-DD)
    const revenueByDate = {};

    confirmedOrders.forEach((order) => {
      const dateStr = new Date(order.created_at).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      if (!revenueByDate[dateStr]) {
        revenueByDate[dateStr] = 0;
      }
      revenueByDate[dateStr] += Number(order.total_amount);
    });

    // Convert to array format for Recharts
    const chartData = Object.keys(revenueByDate).map((date) => ({
      date,
      revenue: revenueByDate[date],
    }));

    // Sort by date conceptually (if they represent a real continuous timeline, we might need a better sorting approach, but string sort is okay for recent days formatted as M/D)
    // For a real app, generate the last X days and fill 0s for missing days to ensure a smooth line.
    return chartData;
  }, [orders]);

  const pieData = useMemo(() => {
    const statusCounts = { pending: 0, confirmed: 0, declined: 0 };
    orders.forEach((o) => {
      if (statusCounts[o.status] !== undefined) {
        statusCounts[o.status]++;
      }
    });

    return [
      { name: "Pending", value: statusCounts.pending, color: "#f59e0b" }, // Amber 500
      { name: "Confirmed", value: statusCounts.confirmed, color: "#10b981" }, // Emerald 500
      { name: "Declined", value: statusCounts.declined, color: "#ef4444" }, // Red 500
    ];
  }, [orders]);

  // For the custom tooltip in the Area Chart
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700">
          <p className="text-gray-500 dark:text-gray-400 text-xs mb-1">
            {label}
          </p>
          <p className="text-[#181113] dark:text-white font-bold text-sm">
            ₦{payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex-1 flex items-center justify-center p-10 text-center text-[#181113] dark:text-white">
          <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="flex-1 overflow-auto p-6 md:p-8 relative">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[#181113] dark:text-white">
                Dashboard Overview
              </h1>
              <p className="text-gray-500 dark:text-gray-400 mt-1">
                Here's what's happening with your store today.
              </p>
            </div>
          </div>

          {/* Top Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-background-dark p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <div className="size-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                  <span className="material-symbols-outlined">payments</span>
                </div>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-bold uppercase tracking-widest mb-1">
                Total Revenue
              </p>
              <h3 className="text-3xl font-bold text-[#181113] dark:text-white">
                ₦{stats.totalRevenue.toLocaleString()}
              </h3>
            </div>

            <div className="bg-white dark:bg-background-dark p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <div className="size-12 bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 rounded-xl flex items-center justify-center">
                  <span className="material-symbols-outlined">
                    shopping_cart
                  </span>
                </div>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-bold uppercase tracking-widest mb-1">
                Total Orders
              </p>
              <h3 className="text-3xl font-bold text-[#181113] dark:text-white">
                {stats.totalOrders}
              </h3>
            </div>

            <div className="bg-white dark:bg-background-dark p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <div className="size-12 bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 rounded-xl flex items-center justify-center">
                  <span className="material-symbols-outlined">analytics</span>
                </div>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-bold uppercase tracking-widest mb-1">
                Avg Order Value
              </p>
              <h3 className="text-3xl font-bold text-[#181113] dark:text-white">
                ₦{Math.round(stats.averageOrderValue).toLocaleString()}
              </h3>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Revenue Area Chart */}
            <div className="lg:col-span-2 bg-white dark:bg-background-dark p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
              <h3 className="text-lg font-bold text-[#181113] dark:text-white mb-6">
                Revenue Overview
              </h3>
              <div className="h-72 w-full">
                {revenueData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={revenueData}
                      margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient
                          id="colorRevenue"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#ab7b8c"
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="95%"
                            stopColor="#ab7b8c"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke="#e5e7eb"
                        opacity={0.5}
                      />
                      <XAxis
                        dataKey="date"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#9ca3af", fontSize: 12 }}
                        dy={10}
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#9ca3af", fontSize: 12 }}
                        tickFormatter={(value) =>
                          `₦${value >= 1000 ? (value / 1000).toFixed(0) + "k" : value}`
                        }
                        dx={-10}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke="#ab7b8c"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorRevenue)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-gray-500">
                    Not enough data to display chart.
                  </div>
                )}
              </div>
            </div>

            {/* Order Status Pie Chart */}
            <div className="bg-white dark:bg-background-dark p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
              <h3 className="text-lg font-bold text-[#181113] dark:text-white mb-6">
                Order Status
              </h3>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="45%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        borderRadius: "8px",
                        border: "none",
                        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                      }}
                      itemStyle={{ fontWeight: "bold" }}
                    />
                    <Legend
                      verticalAlign="bottom"
                      height={36}
                      iconType="circle"
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Recent Orders Table Component */}
          <div className="bg-white dark:bg-background-dark rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
            <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
              <h3 className="text-lg font-bold text-[#181113] dark:text-white">
                Recent Orders
              </h3>
              <Link
                to="/admin/orders"
                className="text-sm font-bold text-primary hover:text-primary/80 transition-colors"
              >
                View All
              </Link>
            </div>
            <div className="overflow-x-auto">
              {orders.length === 0 ? (
                <div className="p-10 text-center text-gray-500">
                  No orders found.
                </div>
              ) : (
                <table className="w-full text-left">
                  <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
                    <tr>
                      <th className="p-4 font-bold text-xs text-gray-500 uppercase tracking-wider">
                        Order ID
                      </th>
                      <th className="p-4 font-bold text-xs text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="p-4 font-bold text-xs text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="p-4 font-bold text-xs text-gray-500 uppercase tracking-wider">
                        Total
                      </th>
                      <th className="p-4 font-bold text-xs text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {orders.slice(0, 5).map((order) => (
                      <tr
                        key={order.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-800/20 transition-colors"
                      >
                        <td className="p-4 font-mono font-medium text-sm text-[#181113] dark:text-white">
                          {order.order_id_alias || `ORDER-${order.id}`}
                        </td>
                        <td className="p-4 text-sm font-medium text-[#181113] dark:text-white text-nowrap">
                          {order.user_name || "Guest"}
                        </td>
                        <td className="p-4 text-sm text-gray-500 text-nowrap">
                          {new Date(order.created_at).toLocaleDateString()}
                        </td>
                        <td className="p-4 font-bold text-[#181113] dark:text-white">
                          ₦{Number(order.total_amount).toLocaleString()}
                        </td>
                        <td className="p-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                              order.status === "pending"
                                ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                                : order.status === "confirmed"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                  : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                            }`}
                          >
                            {order.status.toUpperCase()}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
