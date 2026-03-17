import { usePaystack } from './Paystack';

const CheckoutPage = ({ cartTotal, userEmail }) => {
  const { startPayment } = usePaystack();

  const handleCheckout = () => {
    startPayment({
      email: userEmail,
      amount: cartTotal,
      metadata: { custom_fields: [{ display_name: "Cart ID", value: "12345" }] },
      onSuccess: (res) => {
        // STEP 1: Show a loading spinner
        // STEP 2: Send res.reference to YOUR backend for verification
        console.log("Success! Reference:", res.reference);
      },
    });
  };

  return <button 
  
  className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider w-fit"
  onClick={handleCheckout}>Checkout Now</button>;
};

export default CheckoutPage;