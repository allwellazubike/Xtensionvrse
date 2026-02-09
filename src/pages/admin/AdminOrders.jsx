import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      // In real app, add auth headers
      const response = await axios.get("http://localhost:3000/api/orders");
      setOrders(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setLoading(false);
    }
  };

  const confirmOrder = async (id) => {
    if (!window.confirm("Are you sure you want to confirm this payment?"))
      return;
    try {
      await axios.put(`http://localhost:3000/api/orders/${id}/confirm`);
      fetchOrders(); // Refresh list
    } catch (error) {
      console.error("Error confirming order:", error);
      alert("Failed to confirm order");
    }
  };

  if (loading)
    return (
      <AdminLayout>
        <div className="p-10 text-center text-[#181113] dark:text-white">
          Loading orders...
        </div>
      </AdminLayout>
    );

  return (
    <AdminLayout>
      <div className="flex-1 overflow-auto p-6 md:p-8 relative">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-[#181113] dark:text-white">
              Manage Orders
            </h1>
            <Link to="/" className="text-primary hover:underline font-bold">
              Back to Home
            </Link>
          </div>

          <div className="bg-white dark:bg-background-dark rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
                  <tr>
                    <th className="p-4 font-bold text-sm text-gray-500 uppercase">
                      Order ID
                    </th>
                    <th className="p-4 font-bold text-sm text-gray-500 uppercase">
                      Amount
                    </th>
                    <th className="p-4 font-bold text-sm text-gray-500 uppercase">
                      Method
                    </th>
                    <th className="p-4 font-bold text-sm text-gray-500 uppercase">
                      Status
                    </th>
                    <th className="p-4 font-bold text-sm text-gray-500 uppercase">
                      Date
                    </th>
                    <th className="p-4 font-bold text-sm text-gray-500 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {orders.map((order) => (
                    <tr
                      key={order.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                    >
                      <td className="p-4 font-mono font-medium">
                        {order.order_id_alias || `ORDER-${order.id}`}
                      </td>
                      <td className="p-4 font-bold">
                        ₦{Number(order.total_amount).toLocaleString()}
                      </td>
                      <td className="p-4 capitalize">
                        {order.payment_method?.replace("_", " ")}
                      </td>
                      <td className="p-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            order.status === "confirmed"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-gray-500">
                        {new Date(order.created_at).toLocaleDateString()}
                      </td>
                      <td className="p-4">
                        {order.status === "pending" && (
                          <button
                            onClick={() => confirmOrder(order.id)}
                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-lg text-sm font-bold shadow-sm transition-all flex items-center gap-2"
                          >
                            <span className="material-symbols-outlined text-sm">
                              check
                            </span>
                            Confirm
                          </button>
                        )}
                        {order.status === "confirmed" && (
                          <span className="text-green-600 flex items-center gap-1 font-bold text-sm">
                            <span className="material-symbols-outlined text-sm">
                              check_circle
                            </span>
                            Paid
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                  {orders.length === 0 && (
                    <tr>
                      <td colSpan="6" className="p-8 text-center text-gray-500">
                        No orders found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminOrders;
