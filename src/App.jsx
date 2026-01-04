import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import SearchResultsPage from "./pages/SearchResults";

import ProductDetails from "./pages/ProductDetails";

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
          path="/product/:id"
          element={
            <ProductDetails
              toggleDarkMode={toggleDarkMode}
              darkMode={darkMode}
            />
          }
        />
        {/* adding search results route if needed in future, currently imported but unused in original code except for import */}
        <Route path="/search" element={<SearchResultsPage />} />
      </Routes>
    </>
  );
}

export default App;
