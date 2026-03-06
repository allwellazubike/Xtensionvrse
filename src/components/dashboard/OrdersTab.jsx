import React from "react";

const OrdersTab = ({ orders, fetchingOrders, setSelectedOrder }) => {
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
};

export default OrdersTab;
