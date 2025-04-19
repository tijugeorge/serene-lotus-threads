import React, { useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

function CheckoutPage() {
  const stripe = useStripe();
  const elements = useElements();
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setShippingInfo(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js is loaded.
      return;
    }

    setIsProcessing(true);
    setError(null);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to collect billing details if required by your Stripe account
        billing_details: {
          name: shippingInfo.name,
          address: {
            line1: shippingInfo.address,
            city: shippingInfo.city,
            postal_code: shippingInfo.postalCode,
            country: shippingInfo.country,
          },
        },
      },
      redirect: 'if_required', // Handle SCA redirects
    });

    setIsProcessing(false);

    if (error) {
      setError(error.message || 'An unexpected error occurred.');
    } else {
      // Payment is successful!
      console.log('Payment successful!');
      alert('Payment successful!');
      // Here you would typically send order details to your backend
    }
  };

  return (
    <div>
      <h1>Checkout</h1>
      <form onSubmit={handleSubmit}>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={shippingInfo.name}
            onChange={handleChange}
            required
          />
        </div>
        {/* ... other shipping fields ... */}
        <div>
          <h2>Payment Information</h2>
          <PaymentElement />
        </div>
        <button type="submit" disabled={isProcessing || !stripe || !elements}>
          {isProcessing ? 'Processing...' : 'Place Order'}
        </button>
      </form>
    </div>
  );
}

export default CheckoutPage;