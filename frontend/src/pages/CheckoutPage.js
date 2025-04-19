import React, { useState } from 'react';

function CheckoutPage() {
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });
  const [paymentIntentClientSecret, setPaymentIntentClientSecret] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setShippingInfo(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCheckout = async () => {
    setError(null);
    try {
      const response = await fetch('https://serene-lotus-threads-backend.onrender.com/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: 10000, // Sample amount (in cents for USD, adjust for AED if needed later)
          currency: 'usd', // Sample currency, change to 'aed' later if that's your primary
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorData?.error || 'Unknown error'}`);
      }

      const data = await response.json();
      setPaymentIntentClientSecret(data.clientSecret);
      console.log('PaymentIntent Client Secret:', data.clientSecret);
      alert('PaymentIntent created successfully! (Check console for client secret)');

      // In a real integration, you would now use the clientSecret
      // to confirm the payment with Stripe using Stripe's SDK.

    } catch (e) {
      setError(e.message);
      console.error('Error creating PaymentIntent:', e);
      alert(`Failed to initiate checkout: ${e.message}`);
    }
  };

  return (
    <div>
      <h1>Checkout</h1>
      <form onSubmit={(e) => { e.preventDefault(); handleCheckout(); }}>
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
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
        {/* ... other shipping fields ... */}
        <div>
          <h2>Payment Information</h2>
          {/* Placeholder for Stripe Payment Element will go here later */}
          <p>Payment details will be integrated here (Stripe skipped for now)</p>
        </div>
        <button type="submit">Place Order</button>
      </form>
      {paymentIntentClientSecret && (
        <p>Client Secret: {paymentIntentClientSecret}</p>
      )}
    </div>
  );
}

export default CheckoutPage;