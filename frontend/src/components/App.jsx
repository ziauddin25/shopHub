// src/App.jsx
// ─── Root app — sets up routing, providers, and layout ───────────────────────
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

import Navbar          from "./components/Navbar";
import ProtectedRoute  from "./components/ProtectedRoute";

import HomePage     from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import CartPage     from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrdersPage   from "./pages/OrdersPage";
import LoginPage    from "./pages/LoginPage";
import SignupPage   from "./pages/SignupPage";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          {/* Spacer for fixed navbar */}
          <div className="pt-[60px]">
            <Navbar />
            <Routes>
              <Route path="/"         element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/login"    element={<LoginPage />} />
              <Route path="/signup"   element={<SignupPage />} />

              {/* Protected routes — require login */}
              <Route path="/cart"     element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
              <Route path="/checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
              <Route path="/orders"   element={<ProtectedRoute><OrdersPage /></ProtectedRoute>} />
            </Routes>
          </div>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
