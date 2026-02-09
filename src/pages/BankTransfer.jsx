import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const BankTransfer = ({ toggleDarkMode, darkMode }) => {
  const location = useLocation();
  const { total, orderId } = location.state || {
    total: 0,
    orderId: "XV-" + Math.floor(1000 + Math.random() * 9000),
  };

  const [isPaid, setIsPaid] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const bankDetails = {
    bankName: "Kuda Microfinance Bank",
    accountNumber: "2012345678",
    accountName: "Xtensionsvrse Inc",
  };

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(""), 2000);
  };
  
  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text).then(() => {
      showToast(`Copied!`);
    });
  };

  const handleConfirmTransfer = () => {
    setIsPaid(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const generateWhatsAppLink = () => {
    const message = window.encodeURIComponent(
      `Hi! I just paid for Order ${orderId}. Here is my receipt.`,
    );
    return `https://wa.me/2341234567890?text=${message}`; // Replace with actual phone number
  };

  return (
    <div
      className={`min-h-screen flex flex-col bg-background-light dark:bg-background-dark font-display antialiased ${darkMode ? "dark" : ""}`}
    >
      <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} />

      <main className="flex-1 w-full max-w-lg mx-auto px-6 py-10">
        {/* Progress Stepper */}
        <div className="flex items-center justify-between mb-10 text-sm font-bold">
          <div className="flex items-center gap-2 text-green-600">
            <span className="flex items-center justify-center size-6 rounded-full bg-green-100 dark:bg-green-900 border border-current">
              <span className="material-symbols-outlined text-sm">check</span>
            </span>
            <span>Shipping</span>
          </div>
          <div className="h-0.5 w-10 bg-gray-200 dark:bg-gray-700"></div>
          <div className="flex items-center gap-2 text-primary">
            <span className="flex items-center justify-center size-6 rounded-full bg-primary text-white">
              2
            </span>
            <span>Payment</span>
          </div>
          <div className="h-0.5 w-10 bg-gray-200 dark:bg-gray-700"></div>
          <div className="flex items-center gap-2 text-gray-400">
            <span className="flex items-center justify-center size-6 rounded-full border border-gray-300 dark:border-gray-600">
              3
            </span>
            <span>Confirmed</span>
          </div>
        </div>

        {/* Order Summary Card - Collapsed/Mini */}
        <div className="bg-white dark:bg-[#181113] p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 flex justify-between items-center mb-8">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">
              Total Amount
            </p>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-[#181113] dark:text-white">
                ₦{total.toLocaleString()}
              </h2>
              <button
                onClick={() => handleCopy(total.toString(), "Amount")}
                className="text-gray-400 hover:text-primary transition-colors"
              >
                <span className="material-symbols-outlined text-base">
                  content_copy
                </span>
              </button>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">
              Order ID
            </p>
            <p className="font-mono font-bold text-[#181113] dark:text-white">
              {orderId}
            </p>
          </div>
        </div>

        {!isPaid ? (
          <>
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-[#181113] dark:text-white mb-2">
                Final Step
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Transfer the exact amount to the account below.
              </p>
            </div>

            {/* Bank Details Card */}
            <div className="bg-white dark:bg-[#181113] rounded-2xl p-6 shadow-md border border-gray-100 dark:border-gray-800 space-y-6 mb-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>

              {/* Bank Name */}
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase mb-1">
                  Bank Name
                </p>
                <p className="text-lg font-bold text-[#181113] dark:text-white">
                  {bankDetails.bankName}
                </p>
              </div>

              {/* Account Number */}
              <div className="bg-[#f8f6f6] dark:bg-gray-800 p-4 rounded-xl flex items-center justify-between group">
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase mb-1">
                    Account Number
                  </p>
                  <p className="text-2xl font-mono font-bold text-primary tracking-wider">
                    {bankDetails.accountNumber}
                  </p>
                </div>
                <button
                  onClick={() =>
                    handleCopy(bankDetails.accountNumber, "Account Number")
                  }
                  className="size-10 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center text-gray-500 hover:text-primary hover:bg-gray-50 transition-all shadow-sm active:scale-95"
                >
                  <span className="material-symbols-outlined">
                    content_copy
                  </span>
                </button>
              </div>

              {/* Account Name */}
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase mb-1">
                  Account Name
                </p>
                <p className="text-lg font-bold text-[#181113] dark:text-white">
                  {bankDetails.accountName}
                </p>
              </div>
            </div>

            {/* Info Note */}
            <div className="flex gap-3 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl mb-8">
              <span className="material-symbols-outlined text-blue-600 shrink-0">
                info
              </span>
              <p className="text-sm text-blue-800 dark:text-blue-200 leading-relaxed">
                Your order will be processed immediately after your payment is
                confirmed. Please try to send the exact amount.
              </p>
            </div>

            <button
              onClick={handleConfirmTransfer}
              className="w-full bg-primary hover:bg-primary/90 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-primary/30 transition-all active:scale-[0.98]"
            >
              I have made the transfer
            </button>
          </>
        ) : (
          <div className="text-center py-6 animate-fade-in-up">
            <div className="size-20 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-4xl">
                hourglass_top
              </span>
            </div>
            <h2 className="text-2xl font-bold text-[#181113] dark:text-white mb-2">
              Payment Verification
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-xs mx-auto">
              We are verifying your transfer. send us your payment receipt to
              speed up the process.
            </p>

            <a
              href={generateWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-green-500/20 transition-all transform hover:-translate-y-1 mb-4"
            >
              <i className="fa-brands fa-whatsapp text-xl"></i>{" "}
              {/* Assuming FA is available, else use SVG or substitute */}
              <span>Send Receipt via WhatsApp</span>
            </a>

            <Link
              to="/"
              className="text-gray-400 hover:text-[#181113] dark:hover:text-white text-sm font-semibold"
            >
              Return to Home
            </Link>
          </div>
        )}
      </main>

      <Footer />

      {/* Toast Notification */}
      <div
        className={`fixed bottom-10 left-1/2 -translate-x-1/2 bg-[#181113] text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 transition-all duration-300 z-50 ${toastMessage ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"}`}
      >
        <span className="material-symbols-outlined text-green-400">
          check_circle
        </span>
        <span className="font-semibold text-sm">{toastMessage}</span>
      </div>
    </div>
  );
};

export default BankTransfer;
