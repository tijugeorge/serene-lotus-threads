import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Import BrowserRouter as well
import CheckoutPage from './pages/CheckoutPage';
import PaymentResult from './pages/PaymentResult';

function App() {
  return (
    <BrowserRouter> {/* Wrap your Routes with BrowserRouter */}
      <div className="App">
        <Routes>
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/payment-result" element={<PaymentResult />} />
          <Route path="/" element={<div><h1>Welcome to our Store!</h1><p>This is the homepage.</p></div>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;