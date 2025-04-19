import React, { useState, useEffect } from 'react';
import { PaymentElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// Replace with your actual publishable key
const stripePromise = loadStripe('YOUR_TEST_PUBLISHABLE_KEY');

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
  const [clientSecret, setClientSecret] = useState(null);

  useEffect(() => {
    // Fetch the clientSecret when the component mounts
    const fetchClientSecret = async () => {
      try {
        const response = await fetch('https://serene-lotus-threads-backend.onrender.com/api/create-payment-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ amount: 10000, currency: 'usd' }),
        });
        const data = await response.json();
        if (data?.clientSecret) {
          setClientSecret(data.clientSecret);
        } else {
          setError(data?.error || 'Failed to fetch client secret.');
        }
      } catch (e) {
        setError(e.message);
      }
    };

    fetchClientSecret();
  }, []);

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

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        billing_details: {
          name: shippingInfo.name,
          address: { line1: shippingInfo.address, city: shippingInfo.city, postal_code: shippingInfo.postalCode, country: shippingInfo.country },
        },
      },
      redirect: 'if_required',
    });

    setIsProcessing(false);

    if (error) {
      setError(error.message || 'An unexpected error occurred.');
    } else {
      console.log('Payment successful!');
      alert('Payment successful!');
    }
  };

  return (
    <div>
      <h1>Checkout</h1>
      {clientSecret ? (
        <form onSubmit={handleSubmit}>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <div>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" value={shippingInfo.name} onChange={handleChange} required />
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
      ) : (
        <p>{error || 'Loading payment information...'}</p>
      )}
    </div>
  );
}

export default CheckoutPage;