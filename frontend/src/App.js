// In frontend/src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CheckoutPage from './pages/CheckoutPage'; // Assuming CheckoutPage is in the same 'pages' directory
import PaymentResult from './pages/PaymentResult'; // Correct import path

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/payment-result" element={<PaymentResult />} />
        <Route path="/" element={/* Your homepage component */} />
      </Routes>
    </div>
  );
}

export default App;