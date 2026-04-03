import React from "react";

const OrderDetailsModal = ({ order, isOpen, onClose }) => {
  if (!isOpen || !order) return null;

  const items =
    typeof order.items === "string" ? JSON.parse(order.items) : order.items;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-background-dark rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-[#181113] dark:text-white">
              Order Details
            </h2>
            <p className="text-sm text-gray-500 font-mono mt-1">
              #{order.order_id_alias || order.id}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
          >
            <span className="material-symbols-outlined text-gray-500">
              close
            </span>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Status & Date */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">
                Status
              </span>
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
            <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">
                Date Placed
              </span>
              <span className="text-sm font-medium text-[#181113] dark:text-white">
                {new Date(order.created_at).toLocaleString()}
              </span>
            </div>
          </div>

          {/* Customer & Shipping Info */}
          <div>
            <h3 className="text-sm font-bold text-[#181113] dark:text-white mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">local_shipping</span>
              Shipping Information
            </h3>
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                <div>
                  <span className="text-xs text-gray-500 block uppercase font-bold tracking-wider mb-1">Customer Name</span>
                  <span className="text-sm font-medium text-[#181113] dark:text-white">{order.customer_name || order.user_name || "Guest"}</span>
                </div>
                <div>
                  <span className="text-xs text-gray-500 block uppercase font-bold tracking-wider mb-1">Contact Phone</span>
                  <span className="text-sm font-medium text-[#181113] dark:text-white">{order.customer_phone || "N/A"}</span>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-xs text-gray-500 block uppercase font-bold tracking-wider mb-1">Email Address</span>
                  <span className="text-sm font-medium text-[#181113] dark:text-white">{order.customer_email || "N/A"}</span>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-xs text-gray-500 block uppercase font-bold tracking-wider mb-1">Delivery Address</span>
                  <span className="text-sm font-medium text-[#181113] dark:text-white block">{order.shipping_address || "No address provided."}</span>
                  <span className="text-sm font-bold text-primary mt-1 block">{order.shipping_state ? `${order.shipping_state} State` : ""}</span>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between">
                <span className="text-sm font-bold text-gray-500">Shipping Fee Applied:</span>
                <span className="text-sm font-bold text-primary">₦{Number(order.shipping_fee || 0).toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Items */}
          <div>
            <h3 className="text-sm font-bold text-[#181113] dark:text-white mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">
                shopping_bag
              </span>
              Order Items
            </h3>
            <div className="border border-gray-100 dark:border-gray-800 rounded-xl overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 dark:bg-gray-800/50">
                  <tr>
                    <th className="p-3 font-medium text-gray-500">Product</th>
                    <th className="p-3 font-medium text-gray-500 text-center">
                      Qty
                    </th>
                    <th className="p-3 font-medium text-gray-500 text-right">
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {items.map((item, index) => (
                    <tr key={index}>
                      <td className="p-3">
                        <div className="font-medium text-[#181113] dark:text-white">
                          {item.name}
                        </div>
                        {item.selectedTexture && (
                          <div className="text-xs text-gray-500 mt-0.5">
                            Texture: {item.selectedTexture}
                          </div>
                        )}
                        {item.selectedColor && (
                          <div className="text-xs text-gray-500">
                            Color: {item.selectedColor}
                          </div>
                        )}
                      </td>
                      <td className="p-3 text-center text-gray-600 dark:text-gray-400">
                        {item.quantity}
                      </td>
                      <td className="p-3 text-right font-medium text-[#181113] dark:text-white">
                        ₦{Number(item.price).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-gray-50 dark:bg-gray-800/50">
                  <tr>
                    <td
                      colSpan="2"
                      className="p-3 text-right font-bold text-gray-600 dark:text-gray-400"
                    >
                      Total Amount
                    </td>
                    <td className="p-3 text-right font-bold text-[#181113] dark:text-white">
                      ₦{Number(order.total_amount).toLocaleString()}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Payment Info */}
          <div>
            <h3 className="text-sm font-bold text-[#181113] dark:text-white mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">
                payments
              </span>
              Payment Method
            </h3>
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 capitalize font-medium text-[#181113] dark:text-white">
              {order.payment_method?.replace("_", " ")}
            </div>
          </div>
        {/* Payment Receipt */}
          {order.receipt_url && (
            <div>
              <h3 className="text-sm font-bold text-[#181113] dark:text-white mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">receipt</span>
                Payment Proof
              </h3>
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 flex justify-center">
                <img 
                  src={order.receipt_url} 
                  alt="Payment Receipt" 
                  className="max-h-96 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 object-contain"
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/30 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
