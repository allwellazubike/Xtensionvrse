import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const SearchResults = ({ toggleDarkMode, darkMode }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("q");

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          (import.meta.env.VITE_API_URL || "http://localhost:3000") + `/api/products?search=${query || ""}`,
        );
        if (!response.ok) {
          if (response.status === 404) {
            setProducts([]);
          } else {
            throw new Error("Failed to fetch results");
          }
        } else {
          const data = await response.json();
          setProducts(data);
        }
      } catch (error) {
        console.error("Error searching products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  // render stars
  const renderStars = (rating) => {
    const validRating = rating || 0;
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(validRating)) {
        stars.push(
          <span
            key={i}
            className="material-symbols-outlined text-base filled"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            star
          </span>,
        );
      } else if (
        i === Math.ceil(validRating) &&
        !Number.isInteger(validRating)
      ) {
        stars.push(
          <span
            key={i}
            className="material-symbols-outlined text-base filled"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            star_half
          </span>,
        );
      } else {
        stars.push(
          <span
            key={i}
            className="material-symbols-outlined text-base text-gray-200"
          >
            star
          </span>,
        );
      }
    }
    return stars;
  };

  return (
    <div
      className={`min-h-screen flex flex-col bg-background-light dark:bg-background-dark font-display text-text-main antialiased ${darkMode ? "dark" : ""}`}
    >
      {/* Top Navigation Bar */}
      <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} />

      {/* Breadcrumbs */}
      <div className="max-w-[1440px] mx-auto w-full px-6 lg:px-12 py-4">
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <a
            href="#"
            className="text-[#89616f] hover:text-primary transition-colors font-medium"
          >
            Home
          </a>
          <span className="material-symbols-outlined text-[#89616f] text-sm">
            chevron_right
          </span>
          <span className="text-[#181113] dark:text-white font-medium">
            Search Results
          </span>
        </div>
      </div>

      {/* Main Content Layout */}
      <main className="max-w-[1440px] mx-auto w-full px-6 lg:px-12 pb-20 flex flex-col gap-10">
        {/* Product Grid Section */}
        <section className="flex-1 flex flex-col">
          {/* Page Heading & Sort */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-[#181113] dark:text-white text-3xl font-bold leading-tight">
                Results for '{query}'
              </h2>
              <p className="text-[#89616f] text-sm mt-1">
                Showing {products.length} results
              </p>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-48">
              <span className="material-symbols-outlined animate-spin text-4xl text-primary">
                progress_activity
              </span>
            </div>
          ) : products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <span className="material-symbols-outlined text-6xl text-gray-300 mb-4">
                search_off
              </span>
              <h3 className="text-xl font-bold text-[#181113] dark:text-white">
                No results found for "{query}"
              </h3>
              <p className="text-[#89616f] mt-2">
                Try checking your spelling or using different keywords.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
              {products.map((product) => (
                <div key={product.id} className="group flex flex-col gap-4">
                  <div className="relative w-full aspect-[4/5] bg-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Badges */}
                    {product.badge && (
                      <span
                        className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-lg ${product.badgeColor || "bg-primary text-white"}`}
                      >
                        {product.badge}
                      </span>
                    )}

                    {/* Wishlist Button */}
                    <button className="absolute top-3 right-3 size-9 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-500 hover:text-primary hover:bg-white transition-all shadow-sm">
                      <span className="material-symbols-outlined text-lg">
                        favorite
                      </span>
                    </button>

                    {/* Actions Overlay */}
                    <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center pb-6 bg-gradient-to-t from-black/40 to-transparent">
                      <button className="w-full bg-white text-primary font-bold py-3 rounded-xl shadow-lg hover:bg-primary hover:text-white transition-colors flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined text-lg">
                          shopping_bag
                        </span>
                        Quick Add
                      </button>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      <div className="flex text-yellow-400 text-sm">
                        {renderStars(product.rating)}
                      </div>
                      <span className="text-xs text-[#89616f] font-medium">
                        ({product.reviews || 0})
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-[#181113] dark:text-white leading-tight group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-lg font-bold text-primary">
                        ${Number(product.price).toFixed(2)}
                      </span>
                      {product.original_price && (
                        <span className="text-sm text-[#89616f] line-through">
                          ${Number(product.original_price).toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="mt-16 flex justify-center">
            <div className="flex gap-2">
              <button
                className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-[#181113] dark:text-white font-bold hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50"
                disabled
              >
                <span className="material-symbols-outlined text-sm">
                  arrow_back
                </span>
              </button>
              <button className="px-4 py-2 rounded-xl bg-primary text-white font-bold hover:bg-primary/90">
                1
              </button>
              <button className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-[#181113] dark:text-white font-bold hover:bg-gray-50 dark:hover:bg-gray-800">
                2
              </button>
              <button className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-[#181113] dark:text-white font-bold hover:bg-gray-50 dark:hover:bg-gray-800">
                <span className="material-symbols-outlined text-sm">
                  arrow_forward
                </span>
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SearchResults;
