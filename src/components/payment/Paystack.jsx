import PaystackPop from '@paystack/inline-js';

export const usePaystack = () => {
  const startPayment = ({ email, amount, metadata, onSuccess, onCancel }) => {
    const paystack = new PaystackPop();
    
    paystack.newTransaction({
      key: "sk_test_784b09ba35adfb996811e6e647b94b942bbc0200", // Use env variable in production
      email,
      amount: amount * 100, // Convert Naira to Kobo
      metadata, // Store Cart IDs here for backend verification
      onSuccess: (transaction) => onSuccess(transaction),
      onCancel: () => onCancel?.(),
    });
  };

  return { startPayment };
};