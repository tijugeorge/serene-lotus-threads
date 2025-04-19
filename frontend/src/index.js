import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

// Replace 'YOUR_STRIPE_PUBLISHABLE_KEY' with your actual publishable key
const stripePromise = loadStripe('YOUR_STRIPE_PUBLISHABLE_KEY');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Elements stripe={stripePromise}>
      <App />
    </Elements>
  </React.StrictMode>
);