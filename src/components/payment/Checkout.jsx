import { useState } from 'react';
import { usePaystack } from './Paystack';

const CheckoutPage = () => {
  const { startPayment } = usePaystack();
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleCheckout = (e) => {
    e.preventDefault();
    if (!email || !amount) {
      alert("Please enter both email and amount");
      return;
    }

    startPayment({
      email: email,
      amount: parseFloat(amount),
      metadata: { 
        custom_fields: [
          { display_name: "Cart ID", value: "test-cart-123" },
          { display_name: "First Name", value: firstName },
          { display_name: "Last Name", value: lastName }
        ] 
      },
      onSuccess: (res) => {
        console.log("Success! Reference:", res.reference);
        alert(`Payment successful! Reference: ${res.reference}`);
      },
      onCancel: () => {
        console.log("Payment canceled");
      }
    });
  };

  return (
    <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 max-w-sm mt-6">
      <h3 className="text-xl font-bold text-[#181113] dark:text-white mb-4">Test Paystack Checkout</h3>
      <form onSubmit={handleCheckout} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <input 
            type="text" 
            placeholder="First Name" 
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full px-4 py-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-[#181113] dark:text-white text-sm"
          />
          <input 
            type="text" 
            placeholder="Last Name" 
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full px-4 py-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-[#181113] dark:text-white text-sm"
          />
        </div>
        <input 
          type="email" 
          placeholder="Email Address *" 
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-[#181113] dark:text-white text-sm"
        />
        <input 
          type="number" 
          placeholder="Amount (NGN) *" 
          required
          min="100"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full px-4 py-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-[#181113] dark:text-white text-sm"
        />
        <button 
          type="submit"
          className="w-full py-3 rounded-xl bg-primary text-white font-bold tracking-wider hover:bg-primary/90 transition-colors shadow-lg"
        >
          Pay Now
        </button>
      </form>
    </div>
  );
};

export default CheckoutPage;