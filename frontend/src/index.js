import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import './index.css';

const stripePromise = loadStripe('pk_test_51RFTiPHJUgc1OTCAj2p6obSJhSU5l0TJXCsUZPllh7CtMzDb45FePDrsCDjTNNU3QSwFBFnvrxYa60xWCL8w0Cmm00q4hgGd0z');

const root = ReactDOM.createRoot(document.getElementById('root'));

const renderApp = (clientSecret) => {
  root.render(
    <React.StrictMode>
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <App />
      </Elements>
    </React.StrictMode>
  );
};

const fetchClientSecret = async () => {
  try {
    const response = await fetch('https://serene-lotus-threads-backend.onrender.com/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: 10000, currency: 'usd' }),
    });
    const data = await response.json();
    if (data?.clientSecret) {
      renderApp(data.clientSecret);
    } else {
      console.error('Failed to fetch client secret in index.js:', data?.error || 'Unknown error');
      // Optionally render an error state here
      root.render(<div>Error loading payment information.</div>);
    }
  } catch (error) {
    console.error('Error fetching client secret in index.js:', error);
    // Optionally render an error state here
    root.render(<div>Error loading payment information.</div>);
  }
};

fetchClientSecret();