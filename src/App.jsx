import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import SearchResultsPage from "./pages/SearchResults";
import Login from "./pages/admin/Login";
import Access from "./pages/admin/Access";
// import AddProduct from "./pages/admin/AddProduct";
import AdminProducts from "./pages/admin/AdminProducts";

import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import ShopByTexture from "./pages/ShopByTexture";
import Authentication from "./pages/Authentication";
import BankTransfer from "./pages/BankTransfer";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  // function to toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Home toggleDarkMode={toggleDarkMode} darkMode={darkMode} />}
        />
        <Route
          path="/products"
          element={
            <Products toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
          }
        />
        <Route
          path="/cart"
          element={<Cart toggleDarkMode={toggleDarkMode} darkMode={darkMode} />}
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
        <Route path="/admin/products" element={<AdminProducts />} />
        {/* adding search results route if needed in future, currently imported but unused in original code except for import */}
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/auth" element={<Authentication />} />
        <Route
          path="/checkout/bank-transfer"
          element={
            <BankTransfer toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
          }
        />
        <Route
          path="/checkout/bank-transfer"
          element={
            <BankTransfer toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
          }
        />
      </Routes>
    </>
  );
}

export default App;
