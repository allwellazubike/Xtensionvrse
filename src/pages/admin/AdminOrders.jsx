import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
import OrderDetailsModal from "../../components/admin/OrderDetailsModal";
import ConfirmationModal from "../../components/admin/ConfirmationModal";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal states
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [confirmation, setConfirmation] = useState({
    isOpen: false,
    type: null, // "confirm", "decline", or "ship"
    orderId: null,
  });

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

  const handleConfirmOrder = async () => {
    try {
      await axios.put(
        (import.meta.env.VITE_API_URL || "http://localhost:3000") + `/api/orders/${confirmation.orderId}/confirm`,
      );
      fetchOrders(); // Refresh list
      closeConfirmation();
    } catch (error) {
      console.error("Error confirming order:", error);
      alert("Failed to confirm order");
    }
  };

  const handleDeclineOrder = async () => {
    try {
      await axios.put(
        (import.meta.env.VITE_API_URL || "http://localhost:3000") + `/api/orders/${confirmation.orderId}/decline`,
      );
      fetchOrders(); // Refresh list
      closeConfirmation();
    } catch (error) {
      console.error("Error declining order:", error);
      alert("Failed to decline order");
    }
  };

  const handleShipOrder = async () => {
    try {
      await axios.put(
        (import.meta.env.VITE_API_URL || "http://localhost:3000") + `/api/orders/${confirmation.orderId}/ship`,
      );
      fetchOrders(); // Refresh list
      closeConfirmation();
    } catch (error) {
      console.error("Error marking order as shipped:", error);
      alert("Failed to mark order as shipped");
    }
  };

  const openConfirmation = (type, orderId) => {
    setConfirmation({
      isOpen: true,
      type,
      orderId,
    });
  };

  const closeConfirmation = () => {
    setConfirmation({
      isOpen: false,
      type: null,
      orderId: null,
    });
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
                      Customer
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
                      <td className="p-4 font-medium text-gray-700 dark:text-gray-300">
                        {order.user_name || "Guest"}
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
                              : order.status === "declined"
                                ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                                : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-gray-500">
                        {new Date(order.created_at).toLocaleDateString()}
                      </td>
                      <td className="p-4 flex gap-2">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50 p-2 rounded-full transition-colors"
                          title="View Details"
                        >
                          <span className="material-symbols-outlined text-sm">
                            visibility
                          </span>
                        </button>

                        {(order.status === "pending" || order.status === "payment_pending") && (
                          <>
                            <button
                              onClick={() =>
                                openConfirmation("confirm", order.id)
                              }
                              className="bg-green-50 text-green-600 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/50 p-2 rounded-full transition-colors"
                              title="Confirm Order"
                            >
                              <span className="material-symbols-outlined text-sm">
                                check
                              </span>
                            </button>
                            <button
                              onClick={() =>
                                openConfirmation("decline", order.id)
                              }
                              className="bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50 p-2 rounded-full transition-colors"
                              title="Decline Order"
                            >
                              <span className="material-symbols-outlined text-sm">
                                close
                              </span>
                            </button>
                          </>
                        )}
                        {order.status === "confirmed" && (
                          <button
                            onClick={() =>
                              openConfirmation("ship", order.id)
                            }
                            className="bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50 p-2 rounded-full transition-colors"
                            title="Mark as Shipped"
                          >
                            <span className="material-symbols-outlined text-sm">
                              local_shipping
                            </span>
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                  {orders.length === 0 && (
                    <tr>
                      <td colSpan="7" className="p-8 text-center text-gray-500">
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

      {/* Order Details Modal */}
      <OrderDetailsModal
        order={selectedOrder}
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={confirmation.isOpen}
        onClose={closeConfirmation}
        onConfirm={
          confirmation.type === "confirm"
            ? handleConfirmOrder
            : confirmation.type === "ship"
              ? handleShipOrder
              : handleDeclineOrder
        }
        title={
          confirmation.type === "confirm" ? "Confirm Order" 
          : confirmation.type === "ship" ? "Mark as Shipped"
          : "Decline Order"
        }
        message={
          confirmation.type === "confirm"
            ? "Are you sure you want to confirm this order? This will mark it as paid."
            : confirmation.type === "ship"
              ? "Are you sure you want to mark this order as shipped? This confirms the item is on its way to the customer."
              : "Are you sure you want to decline this order? This action cannot be undone."
        }
        actionLabel={
          confirmation.type === "confirm" ? "Confirm" 
          : confirmation.type === "ship" ? "Ship Order"
          : "Decline"
        }
        isDestructive={confirmation.type === "decline"}
      />
    </AdminLayout>
  );
};

export default AdminOrders;
