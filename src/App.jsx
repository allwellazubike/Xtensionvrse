import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Categories from "./components/Categories";
import Products from "./components/Products";
import PromoBanner from "./components/PromoBanner";
import Newsletter from "./components/NewsLetter";
import Footer from "./components/Footer";
import SearchResultsPage from "./pages/SearchResults";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <> 
    <Routes>
      <Route path="/products" element={<SearchResultsPage />} />

      <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
      <div className="relative flex min-h-screen w-full flex-col group/design-root bg-background-light dark:bg-background-dark text-[#181113] dark:text-white antialiased overflow-x-hidden">
        <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} />

        <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-10 py-6 md:py-10 space-y-16">
          <Hero />
          <Features />
          <Categories />
          <Products />
          <PromoBanner />
          <Newsletter />
        </main>

        <Footer />
      </div>
    </div>

    </Routes>
    
    </>
  );
}

export default App;
