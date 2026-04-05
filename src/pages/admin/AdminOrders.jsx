import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminLayout from "../../components/admin/AdminLayout";
import OrderDetailsModal from "../../components/admin/OrderDetailsModal";
import ConfirmationModal from "../../components/ConfirmationModal";

const API = import.meta.env.VITE_API_URL || "http://localhost:3000";

// Which statuses belong to each tab
const TAB_STATUSES = {
  active: ["pending", "payment_pending", "confirmed"],
  archived: ["shipped", "declined", "expired"],
  all: null, // null = show everything
};

const STATUS_COLORS = {
  confirmed:      "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300",
  shipped:        "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300",
  declined:       "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300",
  expired:        "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
  pending:        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300",
  payment_pending:"bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300",
};

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter / search / sort state
  const [activeTab, setActiveTab] = useState("active");
  const [search, setSearch] = useState("");
  const [sortDir, setSortDir] = useState("desc"); // desc = newest first

  // Modal states
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [confirmation, setConfirmation] = useState({
    isOpen: false,
    type: null,
    orderId: null,
  });

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${API}/api/orders`);
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  // ── Filtering & sorting (client-side, no extra API calls) ──────────────
  const visibleOrders = orders
    .filter((order) => {
      // Tab filter
      const allowed = TAB_STATUSES[activeTab];
      if (allowed && !allowed.includes(order.status)) return false;

      // Search: match order alias/id or customer name/email
      if (search.trim()) {
        const q = search.toLowerCase();
        const id = (order.order_id_alias || `ORDER-${order.id}`).toLowerCase();
        const name = (order.customer_name || order.user_name || "").toLowerCase();
        const email = (order.customer_email || "").toLowerCase();
        if (!id.includes(q) && !name.includes(q) && !email.includes(q)) return false;
      }

      return true;
    })
    .sort((a, b) =>
      sortDir === "desc" ? b.id - a.id : a.id - b.id
    );

  // ── Action handlers ────────────────────────────────────────────────────
  const handleConfirmOrder = async () => {
    try {
      await axios.put(`${API}/api/orders/${confirmation.orderId}/confirm`);
      fetchOrders();
      closeConfirmation();
    } catch { alert("Failed to confirm order"); }
  };

  const handleDeclineOrder = async () => {
    try {
      await axios.put(`${API}/api/orders/${confirmation.orderId}/decline`);
      fetchOrders();
      closeConfirmation();
    } catch { alert("Failed to decline order"); }
  };

  const handleShipOrder = async () => {
    try {
      await axios.put(`${API}/api/orders/${confirmation.orderId}/ship`);
      fetchOrders();
      closeConfirmation();
    } catch { alert("Failed to mark order as shipped"); }
  };

  const openConfirmation = (type, orderId) =>
    setConfirmation({ isOpen: true, type, orderId });

  const closeConfirmation = () =>
    setConfirmation({ isOpen: false, type: null, orderId: null });

  // ── Counts for tab badges ──────────────────────────────────────────────
  const countFor = (tab) => {
    const allowed = TAB_STATUSES[tab];
    if (!allowed) return orders.length;
    return orders.filter((o) => allowed.includes(o.status)).length;
  };

  if (loading)
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-full">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </AdminLayout>
    );

  return (
    <AdminLayout>
      <div className="flex-1 overflow-auto p-6 md:p-8">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-[#181113] dark:text-white">
              Manage Orders
            </h1>
            <button
              onClick={fetchOrders}
              className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">refresh</span>
              Refresh
            </button>
          </div>

          {/* Search + Sort bar */}
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <div className="relative flex-1">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[20px]">
                search
              </span>
              <input
                type="text"
                placeholder="Search by order ID, customer name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-[#181113] dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
            <button
              onClick={() => setSortDir((d) => (d === "desc" ? "asc" : "desc"))}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm font-medium text-gray-600 dark:text-gray-300 hover:border-primary hover:text-primary transition-all whitespace-nowrap"
            >
              <span className="material-symbols-outlined text-[18px]">
                {sortDir === "desc" ? "arrow_downward" : "arrow_upward"}
              </span>
              ID: {sortDir === "desc" ? "Newest first" : "Oldest first"}
            </button>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-xl mb-4 w-fit">
            {[
              { key: "active", label: "Active" },
              { key: "archived", label: "Archived" },
              { key: "all", label: "All" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  activeTab === tab.key
                    ? "bg-white dark:bg-gray-700 text-primary shadow-sm"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                }`}
              >
                {tab.label}
                <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${
                  activeTab === tab.key
                    ? "bg-primary/10 text-primary"
                    : "bg-gray-200 dark:bg-gray-600 text-gray-500 dark:text-gray-300"
                }`}>
                  {countFor(tab.key)}
                </span>
              </button>
            ))}
          </div>

          {/* Orders Table */}
          <div className="bg-white dark:bg-background-dark rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
                  <tr>
                    <th className="p-4 font-bold text-sm text-gray-500 uppercase">Order ID</th>
                    <th className="p-4 font-bold text-sm text-gray-500 uppercase">Customer</th>
                    <th className="p-4 font-bold text-sm text-gray-500 uppercase">Amount</th>
                    <th className="p-4 font-bold text-sm text-gray-500 uppercase">Method</th>
                    <th className="p-4 font-bold text-sm text-gray-500 uppercase">Status</th>
                    <th className="p-4 font-bold text-sm text-gray-500 uppercase">Date</th>
                    <th className="p-4 font-bold text-sm text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {visibleOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                    >
                      <td className="p-4 font-mono font-medium text-sm">
                        {order.order_id_alias || `ORDER-${order.id}`}
                      </td>
                      <td className="p-4 font-medium text-gray-700 dark:text-gray-300">
                        <div>{order.customer_name || order.user_name || "Guest"}</div>
                        {order.customer_email && (
                          <div className="text-xs text-gray-400">{order.customer_email}</div>
                        )}
                      </td>
                      <td className="p-4 font-bold">
                        ₦{Number(order.total_amount).toLocaleString()}
                      </td>
                      <td className="p-4 capitalize text-sm">
                        {order.payment_method?.replace("_", " ")}
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${STATUS_COLORS[order.status] || "bg-gray-100 text-gray-600"}`}>
                          {order.status?.replace("_", " ")}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-gray-500">
                        {order.created_at ? new Date(order.created_at).toLocaleDateString() : "Pending Date"}
                      </td>
                      <td className="p-4 flex gap-2">
                        {/* View */}
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="w-8 h-8 flex items-center justify-center bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 rounded-full transition-colors"
                          title="View Details"
                        >
                          <span className="material-symbols-outlined text-sm">visibility</span>
                        </button>

                        {/* Confirm / Decline (pending states only) */}
                        {(order.status === "pending" || order.status === "payment_pending") && (
                          <>
                            <button
                              onClick={() => openConfirmation("confirm", order.id)}
                              className="w-8 h-8 flex items-center justify-center bg-green-50 text-green-600 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400 rounded-full transition-colors"
                              title="Confirm Order"
                            >
                              <span className="material-symbols-outlined text-sm">check</span>
                            </button>
                            <button
                              onClick={() => openConfirmation("decline", order.id)}
                              className="w-8 h-8 flex items-center justify-center bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-400 rounded-full transition-colors"
                              title="Decline Order"
                            >
                              <span className="material-symbols-outlined text-sm">close</span>
                            </button>
                          </>
                        )}

                        {/* Ship */}
                        {order.status === "confirmed" && (
                          <button
                            onClick={() => openConfirmation("ship", order.id)}
                            className="w-8 h-8 flex items-center justify-center bg-purple-50 text-purple-600 hover:bg-purple-100 dark:bg-purple-900/30 dark:text-purple-400 rounded-full transition-colors"
                            title="Mark as Shipped"
                          >
                            <span className="material-symbols-outlined text-sm">local_shipping</span>
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                  {visibleOrders.length === 0 && (
                    <tr>
                      <td colSpan="7" className="p-12 text-center text-gray-400">
                        <span className="material-symbols-outlined text-4xl block mb-2">inbox</span>
                        {search ? `No orders match "${search}"` : `No ${activeTab} orders.`}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Result count */}
          <p className="text-xs text-gray-400 mt-3 text-right">
            Showing {visibleOrders.length} of {orders.length} orders
          </p>
        </div>
      </div>

      <OrderDetailsModal
        order={selectedOrder}
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />

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
              ? "Are you sure you want to mark this order as shipped?"
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
