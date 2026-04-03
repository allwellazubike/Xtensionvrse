import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { ProductProvider } from "./context/ProductContext.jsx";
import { ToastProvider } from "./context/ToastContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastProvider>
      <ProductProvider>
      <CartProvider>
        <Router>
          <App />
        </Router>
      </CartProvider>
      </ProductProvider>
    </ToastProvider>
  </StrictMode>
);
