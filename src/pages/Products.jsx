import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FilterSidebar from "../components/FilterSidebar";
import { useCart } from "../context/CartContext";
import { useProducts } from "../context/ProductContext";
import { Link } from "react-router-dom";

const Products = ({ toggleDarkMode, darkMode }) => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const { addToCart } = useCart();
  const { products } = useProducts();

  // Filter & Sort State
  const [sortOption, setSortOption] = useState("Recommended");
  const [filters, setFilters] = useState({
    categories: [],
    lengths: [],
    priceRange: { min: "", max: "" },
  });

  const categories = [
    "French Curls",
    "Deep Twists",
    "Italian Curls",
    "Bone Straight",
    "Pre-stretched",
    "Faux Locs",
    "Kinky Coils",
    "Kanekalon",
    "Passion Twist",
    "Spring Twist",
  ];

  // Logic to process products
  const getProcessedProducts = () => {
    if (!products) return [];

    let result = [...products];

    // 1. Filter by Categories
    if (filters.categories && filters.categories.length > 0) {
      result = result.filter((product) => {
        return filters.categories.some(
          (cat) =>
            product.category?.toLowerCase().includes(cat.toLowerCase()) ||
            product.name?.toLowerCase().includes(cat.toLowerCase()),
        );
      });
    }

    // 2. Filter by Length (assuming 'length' property or checking name/variant)
    if (filters.lengths && filters.lengths.length > 0) {
      result = result.filter((product) => {
        // If product has a specific length attribute
        if (product.length) {
          return filters.lengths.includes(product.length);
        }
        // Fallback: check if name contains length? (e.g. "French Curls 20 inch")
        return filters.lengths.some(
          (l) => product.name?.includes(l) || product.description?.includes(l),
        );
      });
    }

    // 3. Filter by Price
    if (filters.priceRange?.min) {
      result = result.filter(
        (product) => product.price >= Number(filters.priceRange.min),
      );
    }
    if (filters.priceRange?.max) {
      result = result.filter(
        (product) => product.price <= Number(filters.priceRange.max),
      );
    }

    // sorting
    switch (sortOption) {
      case "Price: Low to High":
        result.sort((a, b) => a.price - b.price);
        break;
      case "Price: High to Low":
        result.sort((a, b) => b.price - a.price);
        break;
      case "Newest Arrivals":
        result.sort((a, b) => {
          const dateA = a.created_at ? new Date(a.created_at) : new Date(0);
          const dateB = b.created_at ? new Date(b.created_at) : new Date(0);
          // If invalid date or missing, fallback to ID if possible
          if (dateA.getTime() === dateB.getTime()) {
            return b.id - a.id;
          }
          return dateB - dateA;
        });
        break;
      case "Recommended":
      default:
        break;
    }

    return result;
  };

  const filteredProducts = getProcessedProducts();

  const handleChipClick = (cat) => {
    if (cat === "All") {
      setFilters((prev) => ({ ...prev, categories: [] }));
    } else {
      setFilters((prev) => ({ ...prev, categories: [cat] }));
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
      <div className="flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark text-[#181113] dark:text-white antialiased">
        <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} />

        <div className="max-w-[1440px] mx-auto flex w-full relative">
          <FilterSidebar
            isOpen={mobileFiltersOpen}
            onClose={() => setMobileFiltersOpen(false)}
            filters={filters}
            setFilters={setFilters}
            categories={categories}
            onApply={() => setMobileFiltersOpen(false)}
          />

          <main className="flex-1 w-full min-w-0 pb-20">
            {/* Hero Banner */}
            <div className="px-4 md:px-6 lg:px-8 py-6">
              <div className="relative w-full rounded-2xl overflow-hidden min-h-[220px] md:min-h-[280px] flex items-center bg-gray-900 group">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{
                    backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuCFH0iCZRIVFuNEvCIk55idYtVd_xp1sdjFYM-MJ49nF2vIYIOpS32mpGyqZLq3hZvxLqcEY6yx77_8TABPd0fzysuqZkYuk70oEjD32oJPHmxEahqUllzuhn00tKNz6_rgkivIqknSP-vAoI1qNfeJLk9nqvXFCkBU67Ds27fHi5D3w6U6tqqsmSahW22p-4uJuuKmiBUxlKT_KeHuOsjdGthK8GyQ0_-tt-OZcvMrqU__Q1ZUTH0UFiw6WdWmBz8SuTeWIj2gpfA")`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
                <div className="relative z-10 p-6 md:p-10 max-w-xl">
                  <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-widest text-white uppercase bg-primary rounded-full">
                    New Arrivals
                  </span>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                    Premium Braiding Hair
                  </h2>
                  <p className="text-gray-200 text-sm md:text-base mb-6 max-w-md">
                    Discover the softest, longest-lasting textures for your next
                    protective style. Tangle-free and lightweight.
                  </p>
                  {/* <button className="px-6 py-3 bg-white text-slate-900 rounded-xl font-bold text-sm hover:bg-gray-100 transition-colors">
                    Shop Collection
                  </button> */}
                </div>
              </div>
            </div>

            {/* Mobile Categories (Chips) */}
            <div className="sticky top-16 z-30 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm px-4 md:px-6 lg:px-8 py-3 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-3 overflow-x-auto hide-scrollbar pb-1">
                <button
                  onClick={() => handleChipClick("All")}
                  className={`shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold shadow-md transition-all ${filters.categories.length === 0 ? "bg-primary text-white shadow-primary/20" : "bg-white dark:bg-[#2d1b22] border border-gray-200 dark:border-gray-700 text-slate-700 dark:text-gray-200 hover:border-primary hover:text-primary"}`}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    grid_view
                  </span>
                  All
                </button>
                {[
                  "French Curls",
                  "Deep Twists",
                  "Italian Curls",
                  "Bone Straight",
                  "Pre-stretched",
                  "Locs",
                ].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleChipClick(cat)}
                    className={`shrink-0 px-4 py-2 rounded-full border text-sm font-medium transition-all ${filters.categories.includes(cat) ? "bg-primary text-white border-primary" : "bg-white dark:bg-[#2d1b22] border-gray-200 dark:border-gray-700 text-slate-700 dark:text-gray-200 hover:border-primary hover:text-primary"}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort & Count Row */}
            <div className="px-4 md:px-6 lg:px-8 py-4 flex items-center justify-between">
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                Showing{" "}
                <span className="text-[#181113] dark:text-white font-bold">
                  {filteredProducts.length}
                </span>{" "}
                results
              </p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-500 hidden sm:inline">
                  Sort by:
                </span>
                <div className="relative group">
                  <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="appearance-none bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-lg text-sm font-bold pl-3 pr-8 py-1.5 focus:ring-primary focus:border-primary cursor-pointer"
                  >
                    <option>Recommended</option>
                    <option>Newest Arrivals</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-[18px]">
                    expand_more
                  </span>
                </div>
              </div>
            </div>

            {/* Product Grid */}
            <div className="px-4 md:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {filteredProducts.map((product) => (
                <Link
                  to={`/product/${product.id}`}
                  key={product.id}
                  className="group relative flex flex-col bg-white dark:bg-[#221016] rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(238,43,108,0.15)] dark:hover:shadow-[0_20px_40px_-15px_rgba(238,43,108,0.15)] border border-gray-100 dark:border-gray-800"
                >
                  {/* Image Area */}
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#f8f6f6] dark:bg-gray-800">
                    <img
                      src={product.image}
                      alt={product.alt || product.name}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    <div className="absolute top-3 right-3 z-10">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                        className="bg-white/70 dark:bg-black/50 backdrop-blur-md p-2 rounded-full text-gray-500 dark:text-gray-300 opacity-0 lg:opacity-100 lg:-translate-y-2 group-hover:translate-y-0 group-hover:opacity-100 hover:text-primary hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 shadow-sm flex items-center justify-center"
                      >
                        <span className="material-symbols-outlined text-[18px] block">
                          favorite
                        </span>
                      </button>
                    </div>

                    {product.badge && (
                      <div className="absolute top-3 left-3 z-10">
                        <span
                          className={`${
                            product.badgeColor || "bg-red-500/90"
                          } backdrop-blur-md text-white text-[10px] uppercase tracking-wider font-bold px-3 py-1.5 rounded-full shadow-sm block`}
                        >
                          {product.badge}
                        </span>
                      </div>
                    )}
                    {product.sale && !product.badge && (
                      <div className="absolute top-3 left-3 z-10">
                        <span className="bg-red-500/90 backdrop-blur-md text-white text-[10px] uppercase tracking-wider font-bold px-3 py-1.5 rounded-full shadow-sm block">
                          Sale
                        </span>
                      </div>
                    )}

                    {/* Quick Add Button (Desktop Hover) */}
                    <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-10 hidden md:block">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          if (addToCart) addToCart(product);
                        }}
                        className="w-full bg-white/95 dark:bg-[#221016]/95 backdrop-blur-sm text-[#181113] dark:text-white py-2.5 rounded-xl font-bold text-sm shadow-lg hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors flex items-center justify-center gap-2"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          add_shopping_cart
                        </span>
                        Add to Cart
                      </button>
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="p-4 flex flex-col flex-1 gap-1.5">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 line-clamp-1 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>

                    <div className="flex items-center gap-1.5 mt-0.5">
                      <div className="flex items-center text-yellow-500">
                        <span
                          className="material-symbols-outlined text-[14px]"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          star
                        </span>
                      </div>
                      <span className="text-gray-500 dark:text-gray-400 text-xs font-medium">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>

                    <div className="mt-auto pt-2 flex items-center justify-between">
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-bold text-[#181113] dark:text-white">
                          ₦{product.price.toLocaleString()}
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs text-slate-400 line-through decoration-slate-400">
                            ₦{product.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>

                      {/* Mobile Cart Icon */}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          if (addToCart) addToCart(product);
                        }}
                        className="md:hidden size-8 rounded-full bg-primary/10 dark:bg-gray-800 text-primary dark:text-white flex items-center justify-center hover:bg-primary hover:text-white dark:hover:text-primary transition-colors"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          add
                        </span>
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Load More */}
            <div className="mt-12 flex justify-center pb-8">
              <button className="px-8 py-3 bg-white dark:bg-[#2d1b22] border border-gray-200 dark:border-gray-700 text-[#181113] dark:text-white font-bold rounded-xl hover:border-primary hover:text-primary transition-all">
                Load More Products
              </button>
            </div>
          </main>

          {/* Mobile Floating Filter Button */}
          <div className="fixed bottom-6 right-6 md:hidden z-40">
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="flex items-center gap-2 h-12 px-5 bg-primary text-white rounded-full shadow-lg shadow-primary/40 hover:bg-primary/90 hover:scale-105 transition-all"
            >
              <span className="material-symbols-outlined">filter_list</span>
              <span className="font-bold text-sm">Filter</span>
            </button>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Products;
