import React from "react";

const CheckoutModal = ({ isOpen, onClose, onSelectPayment }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* modal Content */}
      <div className="relative w-full max-w-md bg-white dark:bg-[#221016] rounded-3xl p-6 shadow-2xl transform transition-all scale-100 dark:text-white border border-gray-100 dark:border-gray-800">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-[#181113] dark:text-white">
            Choose Payment Method
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <span className="material-symbols-outlined text-gray-500">
              close
            </span>
          </button>
        </div>

        {/* Options */}
        <div className="flex flex-col gap-4">
          <button
            onClick={() => onSelectPayment("paystack")}
            className="group flex items-center justify-between p-4 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-primary hover:bg-primary/5 transition-all text-left"
          >
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                <span className="material-symbols-outlined">credit_card</span>
              </div>
              <div>
                <h4 className="font-bold text-[#181113] dark:text-white group-hover:text-primary transition-colors">
                  Paystack Checkout
                </h4>
                <p className="text-sm text-gray-500">
                  Instant Payment: Card, USSD, QR & Bank Transfer
                </p>
              </div>
            </div>
            <span className="material-symbols-outlined text-gray-400 group-hover:text-primary">
              chevron_right
            </span>
          </button>

          <button
            onClick={() => onSelectPayment("bank_transfer")}
            className="group flex items-center justify-between p-4 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-primary hover:bg-primary/5 transition-all text-left"
          >
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-xl bg-green-50 flex items-center justify-center text-green-600">
                <span className="material-symbols-outlined">
                  account_balance
                </span>
              </div>
              <div>
                <h4 className="font-bold text-[#181113] dark:text-white group-hover:text-primary transition-colors">
                  Direct Bank Transfer
                </h4>
                <p className="text-sm text-gray-500">
                  Send money directly to our account
                </p>
              </div>
            </div>
            <span className="material-symbols-outlined text-gray-400 group-hover:text-primary">
              chevron_right
            </span>
          </button>
        </div>

        {/* Footer info */}
        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400">
          <span className="material-symbols-outlined text-sm">lock</span>
          <span>Payments are secure and encrypted</span>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
