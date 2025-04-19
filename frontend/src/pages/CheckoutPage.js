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
    setShippingInfo(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setError(null);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        payment_method_data: {
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
        return_url: `${window.location.origin}/payment-result`,
      },
      redirect: 'if_required', // Keeping it for now, might remove if issues persist
    });

    setIsProcessing(false);

    if (error) {
      setError(error.message || 'An unexpected error occurred.');
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      console.log('Payment successful!');
      alert('Payment successful!');
      // Here you would typically send order details to your backend
    } else if (paymentIntent && paymentIntent.status === 'requires_action') {
      // This handles cases like 3D Secure where a redirect is needed
      stripe.confirmCardPayment(paymentIntent.client_secret);
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
        <div>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={shippingInfo.address}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            name="city"
            value={shippingInfo.city}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="postalCode">Postal Code:</label>
          <input
            type="text"
            id="postalCode"
            name="postalCode"
            value={shippingInfo.postalCode}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="country">Country:</label>
          <input
            type="text"
            id="country"
            name="country"
            value={shippingInfo.country}
            onChange={handleChange}
            required
          />
        </div>
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