// In frontend/src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CheckoutPage from './pages/CheckoutPage';
import PaymentResult from './pages/PaymentResult';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/payment-result" element={<PaymentResult />} />
        <Route path="/" element={<div><h1>Welcome to our Store!</h1><p>This is the homepage.</p></div>} />
      </Routes>
    </div>
  );
}

export default App;