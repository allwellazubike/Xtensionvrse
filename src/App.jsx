import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";
import Home from "./pages/Home";
import Products from "./pages/Products";
import SearchResultsPage from "./pages/SearchResults";
import Login from "./pages/admin/Login";
import Access from "./pages/admin/Access";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminDashboard from "./pages/admin/AdminDashboard";

import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import ShopByTexture from "./pages/ShopByTexture";
import Authentication from "./pages/Authentication";
import BankTransfer from "./pages/BankTransfer";
import UserDashboard from "./pages/UserDashboard";
import Dashboard from "./pages/Dashboard";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  // function to toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <AuthProvider>
      <ToastProvider>
        <Routes>
          <Route
            path="/"
            element={
              <Home toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
            }
          />
          <Route
            path="/products"
            element={
              <Products toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
            }
          />
          <Route
            path="/cart"
            element={
              <Cart toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
            }
          />
          <Route
            path="/shop-by-texture"
            element={
              <ShopByTexture
                toggleDarkMode={toggleDarkMode}
                darkMode={darkMode}
              />
            }
          />
          <Route
            path="/product/:id"
            element={
              <ProductDetails
                toggleDarkMode={toggleDarkMode}
                darkMode={darkMode}
              />
            }
          />
          <Route
            path="/login"
            element={
              <Login toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
            }
          />
          <Route
            path="/access"
            element={
              <Access toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
            }
          />

          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route
            path="/admin/analytics"
            element={<Navigate to="/admin/dashboard" replace />}
          />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/orders" element={<AdminOrders />} />

          {/* adding search results route if needed in future */}
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/auth" element={<Authentication />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/checkout/bank-transfer"
            element={
              <BankTransfer
                toggleDarkMode={toggleDarkMode}
                darkMode={darkMode}
              />
            }
          />
        </Routes>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
