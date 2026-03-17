import PaystackPop from '@paystack/inline-js';

export const usePaystack = () => {
  const startPayment = ({ email, amount, metadata, onSuccess, onCancel }) => {
    const paystack = new PaystackPop();
    
    paystack.newTransaction({
      key: "pk_test_281c8c9fe122d86f7dd21779a2f1235355d6552b", // Use env variable in production
      email,
      amount: amount * 100, // Convert Naira to Kobo
      metadata, // Store Cart IDs here for backend verification
      onSuccess: (transaction) => onSuccess(transaction),
      onCancel: () => onCancel?.(),
    });
  };

  return { startPayment };
};