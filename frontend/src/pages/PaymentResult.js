import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function PaymentResult() {
  const location = useLocation();
  const [message, setMessage] = useState('');

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const clientSecret = queryParams.get('payment_intent_client_secret');

    if (clientSecret) {
      setMessage('Payment successful! Thank you for your order.');
      // In a real application, you might want to:
      // 1. Verify the payment intent status with your backend.
      // 2. Update your local state or store.
      // 3. Show order details.
    } else if (queryParams.get('redirect_status') === 'succeeded') {
      setMessage('Payment successful! Thank you for your order (via redirect).');
    } else if (queryParams.get('redirect_status') === 'failed') {
      setMessage('Payment failed. Please try again.');
      // In a real application, you might want to:
      // 1. Display the error message from Stripe (if available).
      // 2. Allow the user to retry payment.
    } else {
      setMessage('Waiting for payment confirmation...');
    }
  }, [location]);

  return (
    <div>
      <h1>Payment Status</h1>
      <p>{message}</p>
      {message.includes('successful') && <button onClick={() => window.location.href = '/'}>Go to Homepage</button>}
      {message.includes('failed') && <button onClick={() => { window.location.href = '/checkout'; }}>Retry Checkout</button>}
    </div>
  );
}

export default PaymentResult;