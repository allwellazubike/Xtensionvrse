import React, { useState, useEffect } from "react";
import axios from "axios";
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
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isDeclined, setIsDeclined] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [receiptImage, setReceiptImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const [isChecking, setIsChecking] = useState(false);

  // Manual status check replaces aggressive DB polling
  const checkStatus = async () => {
    setIsChecking(true);
    try {
      const res = await axios.get(
        (import.meta.env.VITE_API_URL || "http://localhost:3000") + `/api/orders/${orderId}`
      );
      if (res.data.status === "confirmed" || res.data.status === "shipped") {
        setIsConfirmed(true);
        setIsPaid(true);
        showToast("Payment has been confirmed!");
      } else if (res.data.status === "declined" || res.data.status === "expired") {
        setIsDeclined(true);
        showToast("Order was declined.");
      } else {
        showToast("Still verifying. Please check again shortly.");
      }
    } catch (error) {
      console.error("Status check error", error);
      showToast("Could not fetch latest status.");
    } finally {
      setIsChecking(false);
    }
  };

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

  const handleUploadReceipt = async () => {
    if (!receiptImage) return showToast("Please select a receipt image first");
    
    setIsUploading(true);
    const formData = new FormData();
    formData.append("receiptImage", receiptImage);
    
    try {
      await axios.put(
        (import.meta.env.VITE_API_URL || "http://localhost:3000") + `/api/orders/${orderId}/receipt`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setIsPaid(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Upload error:", error);
      showToast("Failed to upload receipt. Please try again.");
    } finally {
      setIsUploading(false);
    }
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
          <div className={`h-0.5 w-10 ${isPaid ? "bg-green-300" : "bg-gray-200 dark:bg-gray-700"} transition-colors duration-500`}></div>
          <div className={`flex items-center gap-2 ${isPaid ? "text-green-600" : "text-primary"}`}>
            <span className={`flex items-center justify-center size-6 rounded-full ${isPaid ? "bg-green-100 dark:bg-green-900 border border-current" : "bg-primary text-white"}`}>
              {isPaid
                ? <span className="material-symbols-outlined text-sm">check</span>
                : <span>2</span>
              }
            </span>
            <span>Payment</span>
          </div>
          <div className={`h-0.5 w-10 ${isConfirmed ? "bg-green-300" : "bg-gray-200 dark:bg-gray-700"} transition-colors duration-500`}></div>
          <div className={`flex items-center gap-2 ${isConfirmed ? "text-green-600" : "text-gray-400"}`}>
            <span className={`flex items-center justify-center size-6 rounded-full ${isConfirmed ? "bg-green-100 dark:bg-green-900 border border-current" : "border border-gray-300 dark:border-gray-600"}`}>
              {isConfirmed
                ? <span className="material-symbols-outlined text-sm">check</span>
                : <span>3</span>
              }
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

        {isDeclined ? (
          <div className="text-center py-6 animate-fade-in-up">
            <div className="size-20 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-4xl">cancel</span>
            </div>
            <h2 className="text-2xl font-bold text-[#181113] dark:text-white mb-2">
              Order Declined
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-sm mx-auto">
              Unfortunately, your payment could not be verified or your order
              was rejected by the admin. Please contact support.
            </p>
            <a
              href={generateWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#25D366] text-white px-8 py-3 rounded-full font-bold hover:bg-[#20bd5a] transition-colors shadow-lg shadow-green-500/20"
            >
              Contact Support
            </a>
            <div className="mt-4">
              <Link
                to="/"
                className="text-gray-400 hover:text-[#181113] dark:hover:text-white text-sm font-semibold"
              >
                Return to Home
              </Link>
            </div>
          </div>
        ) : isConfirmed ? (
          <div className="text-center py-6 animate-fade-in-up">
            <div className="size-20 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-4xl">
                check_circle
              </span>
            </div>
            <h2 className="text-2xl font-bold text-[#181113] dark:text-white mb-2">
              Payment Confirmed!
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-xs mx-auto">
              Your payment has been verified and your order is being processed.
            </p>
            <Link
              to="/"
              className="inline-block bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
            >
              Continue Shopping
            </Link>
          </div>
        ) : !isPaid ? (
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

            {/* Receipt Upload Dropzone */}
            <div className="mb-6">
              <label className="block text-sm font-bold text-[#181113] dark:text-white mb-2">Upload Transfer Receipt</label>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-6 text-center hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer relative">
                <input
                  key={receiptImage ? receiptImage.name : 'empty'}
                  type="file"
                  accept="image/*"
                  onChange={(e) => setReceiptImage(e.target.files[0])}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                  disabled={isUploading}
                />
                <div className="text-gray-500 flex flex-col items-center relative z-10 pointer-events-none">
                  <span className="material-symbols-outlined text-4xl mb-2 text-gray-400">cloud_upload</span>
                  {receiptImage ? (
                    <>
                      <span className="font-bold text-primary truncate max-w-full mb-1">{receiptImage.name}</span>
                      <span className="text-xs font-semibold text-gray-400 bg-gray-50 dark:bg-gray-800 px-2 py-1 rounded-full">Tap to select a different image</span>
                    </>
                  ) : (
                    <>
                      <span className="font-bold text-[#181113] dark:text-white">Click to upload</span>
                      <span className="text-xs mt-1">JPEG, PNG, JPG (max. 5MB)</span>
                    </>
                  )}
                </div>
              </div>
              
              {receiptImage && !isUploading && (
                <button 
                  onClick={() => setReceiptImage(null)}
                  className="mt-3 text-sm text-red-500 font-bold hover:text-red-600 flex items-center justify-center w-full transition-colors"
                >
                  <span className="material-symbols-outlined text-sm mr-1">close</span>
                  Remove Image
                </button>
              )}
            </div>

            <button
              onClick={handleUploadReceipt}
              disabled={isUploading || !receiptImage}
              className="w-full bg-primary hover:bg-primary/90 disabled:opacity-50 text-white py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-primary/30 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
              {isUploading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Uploading Receipt...
                </>
              ) : (
                "Submit Receipt"
              )}
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
              We have securely received your payment receipt! Our team is verifying your transfer right now.
            </p>

            <div className="flex flex-col items-center gap-4">
              <button
                onClick={checkStatus}
                disabled={isChecking}
                className="inline-flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-[#181113] dark:text-white px-8 py-3 w-fit rounded-full font-bold transition-all disabled:opacity-50"
              >
                {isChecking ? (
                  <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <span className="material-symbols-outlined text-lg">refresh</span>
                )}
                <span>Check Status</span>
              </button>

              <Link
                to="/"
                className="text-gray-400 hover:text-[#181113] dark:hover:text-white text-sm font-semibold"
              >
                Return to Home
              </Link>
            </div>
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
