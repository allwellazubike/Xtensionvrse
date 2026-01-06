import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FilterSidebar from "../components/FilterSidebar";
import { useCart } from "../context/CartContext";

import { Link } from "react-router-dom";
import { products } from "../data/products";

const Products = ({ toggleDarkMode, darkMode }) => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const { addToCart } = useCart();

  return (
    <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
      <div className="flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark text-[#181113] dark:text-white antialiased">
        <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} />

        <div className="max-w-[1440px] mx-auto flex w-full relative">
          <FilterSidebar
            isOpen={mobileFiltersOpen}
            onClose={() => setMobileFiltersOpen(false)}
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
                  <button className="px-6 py-3 bg-white text-slate-900 rounded-xl font-bold text-sm hover:bg-gray-100 transition-colors">
                    Shop Collection
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Categories (Chips) */}
            <div className="sticky top-16 z-30 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm px-4 md:px-6 lg:px-8 py-3 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-3 overflow-x-auto hide-scrollbar pb-1">
                <button className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-white text-sm font-semibold shadow-md shadow-primary/20">
                  <span className="material-symbols-outlined text-[18px]">
                    grid_view
                  </span>
                  All
                </button>
                {[
                  "Pre-stretched",
                  "Kanekalon",
                  "Passion Twist",
                  "Locs",
                  "Spring Twist",
                ].map((cat) => (
                  <button
                    key={cat}
                    className="shrink-0 px-4 py-2 rounded-full bg-white dark:bg-[#2d1b22] border border-gray-200 dark:border-gray-700 text-slate-700 dark:text-gray-200 text-sm font-medium hover:border-primary hover:text-primary transition-all"
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
                  124
                </span>{" "}
                results
              </p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-500 hidden sm:inline">
                  Sort by:
                </span>
                <div className="relative group">
                  <button className="flex items-center gap-2 text-sm font-bold text-[#181113] dark:text-white bg-white dark:bg-[#2d1b22] border border-gray-200 dark:border-gray-700 pl-3 pr-2 py-1.5 rounded-lg hover:border-primary/50 transition-colors">
                    Recommended
                    <span className="material-symbols-outlined text-[18px]">
                      expand_more
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Product Grid */}
            <div className="px-4 md:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {products.map((product) => (
                <Link
                  to={`/product/${product.id}`}
                  key={product.id}
                  className="group flex flex-col bg-white dark:bg-[#2d1b22] rounded-2xl overflow-hidden border border-transparent hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
                >
                  {/* Image Area */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                    <div
                      className="bg-cover bg-center w-full h-full transition-transform duration-500 group-hover:scale-110"
                      style={{ backgroundImage: `url("${product.image}")` }}
                      alt={product.alt}
                    />

                    <div className="absolute top-3 right-3 z-10">
                      <button className="size-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-slate-400 hover:text-primary hover:bg-white transition-colors shadow-sm">
                        <span className="material-symbols-outlined text-[20px]">
                          favorite
                        </span>
                      </button>
                    </div>

                    {product.badge && (
                      <div className="absolute top-3 left-3 z-10">
                        <span
                          className={`px-2 py-1 ${
                            product.badgeColor || "bg-red-500"
                          } text-white text-[10px] font-bold uppercase tracking-wider rounded`}
                        >
                          {product.badge}
                        </span>
                      </div>
                    )}
                    {product.sale && !product.badge && (
                      <div className="absolute top-3 left-3 z-10">
                        <span className="px-2 py-1 bg-red-500 text-white text-[10px] font-bold uppercase tracking-wider rounded">
                          Sale
                        </span>
                      </div>
                    )}

                    {/* Quick Add Button (Desktop Hover) */}
                    <div className="absolute inset-x-4 bottom-4 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hidden md:block">
                      <button 
                      className="w-full py-3 bg-white text-slate-900 font-bold text-sm rounded-xl shadow-lg hover:bg-primary hover:text-white flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined text-[18px]">
                          add_shopping_cart
                        </span>
                        Add to Cart
                      </button>
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="p-4 flex flex-col flex-1">
                    <div className="flex items-center gap-1 mb-1">
                      <span className="material-symbols-outlined text-yellow-400 text-[14px] fill-1">
                        star
                      </span>
                      <span className="text-xs font-medium text-slate-500">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>

                    <h3 className="font-bold text-[#181113] dark:text-white text-base leading-snug mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>

                    <div className="mt-auto pt-2 flex items-center justify-between">
                      <div className="flex items-baseline gap-2">
                        <span className="text-base font-extrabold text-[#181113] dark:text-white">
                          ₦{product.price.toLocaleString()}
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs text-slate-400 line-through decoration-slate-400">
                            ₦{product.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>

                      {/* Mobile Cart Icon */}
                      <button className="md:hidden size-8 rounded-full bg-gray-100 dark:bg-gray-800 text-[#181113] dark:text-white flex items-center justify-center">
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
