import React, { useState } from "react";
import { useToast } from "../context/ToastContext";

const NIGERIAN_STATES = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno",
  "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT", "Gombe", "Imo",
  "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos",
  "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto",
  "Taraba", "Yobe", "Zamfara"
];

const CheckoutModal = ({ isOpen, onClose, onSelectPayment }) => {
  const { showToast } = useToast();
  const [step, setStep] = useState(1);
  const [shippingDetails, setShippingDetails] = useState({
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    shipping_address: "",
    shipping_state: ""
  });

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleNextStep = () => {
    const { customer_name, customer_email, customer_phone, shipping_address, shipping_state } = shippingDetails;
    if (!customer_name || !customer_email || !customer_phone || !shipping_address || !shipping_state) {
      showToast("Please fill all shipping fields to continue.", "error");
      return;
    }
    setStep(2);
  };

  const calculateShippingFee = () => {
    if (!shippingDetails.shipping_state) return 0;
    const cleanState = shippingDetails.shipping_state.toLowerCase();
    return cleanState === "lagos" ? 3000 : 5000;
  };

  const resetAndClose = () => {
    setStep(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={resetAndClose}
      ></div>

      {/* modal Content */}
      <div className="relative w-full max-w-md bg-white dark:bg-[#221016] rounded-3xl p-6 shadow-2xl transform transition-all scale-100 dark:text-white border border-gray-100 dark:border-gray-800">
        
        {/* header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-[#181113] dark:text-white flex items-center gap-2">
            {step === 1 ? (
              <>
                <span className="material-symbols-outlined text-primary">local_shipping</span>
                Shipping Details
              </>
            ) : (
              <>
                <button onClick={() => setStep(1)} className="hover:text-primary transition-colors flex items-center">
                   <span className="material-symbols-outlined mr-1">arrow_back</span>
                </button>
                Choose Payment Method
              </>
            )}
          </h3>
          <button
            onClick={resetAndClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <span className="material-symbols-outlined text-gray-500">
              close
            </span>
          </button>
        </div>

        {/* Step 1: Shipping Form */}
        {step === 1 && (
          <div className="flex flex-col gap-4 animate-fade-in">
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Full Name</label>
              <input type="text" name="customer_name" value={shippingDetails.customer_name} onChange={handleInputChange} className="w-full mt-1 p-3 bg-gray-50 dark:bg-[#181113] border border-gray-200 dark:border-gray-800 rounded-xl focus:outline-none focus:border-primary transition-colors" placeholder="Jane Doe" required />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Email</label>
                <input type="email" name="customer_email" value={shippingDetails.customer_email} onChange={handleInputChange} className="w-full mt-1 p-3 bg-gray-50 dark:bg-[#181113] border border-gray-200 dark:border-gray-800 rounded-xl focus:outline-none focus:border-primary transition-colors" placeholder="jane@example.com" required />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Phone</label>
                <input type="tel" name="customer_phone" value={shippingDetails.customer_phone} onChange={handleInputChange} className="w-full mt-1 p-3 bg-gray-50 dark:bg-[#181113] border border-gray-200 dark:border-gray-800 rounded-xl focus:outline-none focus:border-primary transition-colors" placeholder="+234..." required />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Street Address</label>
              <input type="text" name="shipping_address" value={shippingDetails.shipping_address} onChange={handleInputChange} className="w-full mt-1 p-3 bg-gray-50 dark:bg-[#181113] border border-gray-200 dark:border-gray-800 rounded-xl focus:outline-none focus:border-primary transition-colors" placeholder="123 Example Street" required />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">State</label>
              <select name="shipping_state" value={shippingDetails.shipping_state} onChange={handleInputChange} className="w-full mt-1 p-3 bg-gray-50 dark:bg-[#181113] border border-gray-200 dark:border-gray-800 rounded-xl focus:outline-none focus:border-primary transition-colors appearance-none" required>
                <option value="" disabled>Select a State</option>
                {NIGERIAN_STATES.map(state => (
                   <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>

            <button
              onClick={handleNextStep}
              className="mt-4 w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-full shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
            >
              Continue to Payment
            </button>
          </div>
        )}

        {/* Step 2: Payment Methods */}
        {step === 2 && (
          <div className="flex flex-col gap-4 animate-fade-in-up">
            
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-800/30 mb-2">
               <div className="flex justify-between items-center text-sm font-bold text-[#181113] dark:text-gray-300">
                  <span>Shipping Fee ({shippingDetails.shipping_state}):</span>
                  {calculateShippingFee() === 0 ? <span>Free</span> : <span className="text-primary">₦{calculateShippingFee().toLocaleString()}</span>}
               </div>
            </div>

            <button
              onClick={() => onSelectPayment("paystack", shippingDetails)}
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
              onClick={() => onSelectPayment("bank_transfer", shippingDetails)}
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
            
            {/* footer info */}
            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400">
              <span className="material-symbols-outlined text-sm">lock</span>
              <span>Payments are secure and encrypted</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
export default CheckoutModal;
