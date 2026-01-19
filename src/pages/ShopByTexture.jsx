import React, { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useProducts } from "../context/ProductContext";
import { Link, useLocation } from "react-router-dom";

const ShopByTexture = ({ toggleDarkMode, darkMode }) => {
  const { products } = useProducts();
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState(
    location.state?.category || "French Curls",
  );

  // Custom Filter State
  const [showPriceFilter, setShowPriceFilter] = useState(false);
  const [showLengthFilter, setShowLengthFilter] = useState(false);
  const [sortOption, setSortOption] = useState("Recommended");
  const [filters, setFilters] = useState({
    categories: [location.state?.category || "French Curls"],
    lengths: [],
    priceRange: { min: "", max: "" },
  });

  const priceRef = useRef(null);
  const lengthRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (priceRef.current && !priceRef.current.contains(event.target)) {
        setShowPriceFilter(false);
      }
      if (lengthRef.current && !lengthRef.current.contains(event.target)) {
        setShowLengthFilter(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Sync activeCategory change to filters
  const handleHeroCategoryClick = (catName) => {
    setActiveCategory(catName);
    setFilters((prev) => ({ ...prev, categories: [catName] }));
  };

  const handleLengthToggle = (len) => {
    setFilters((prev) => {
      const current = prev.lengths || [];
      const exists = current.includes(len);
      return {
        ...prev,
        lengths: exists ? current.filter((l) => l !== len) : [...current, len],
      };
    });
  };

  const handlePriceChange = (e, type) => {
    const val = e.target.value;
    setFilters((prev) => ({
      ...prev,
      priceRange: { ...prev.priceRange, [type]: val },
    }));
  };

  // Categories from the provided design
  const categories = [
    {
      name: "French Curls",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBPxBZA5ovXY2C01gFTSTm2c8nNVH1GqHGfmLOHegP9yobuCbYS-IC7QEbb7mNHlSq3wDRCKtnqOL5tNtU-_YzGQ-_0p4LXVJv16b2bgHrpffJmBWYp_ApqiwFeqmBDGGx-_EBG49vsCBjMfBZ3a02awunPxjtDQzVD8r4AuEQTlZzpEkO-l-qnZ20GTsDfWHd55FJuQm7NetmF3PwzvJCnM9ffNMY9bdBZSJB-qsY-i2nsFGh9dGqjEQzQcfJZ3eZdAaHNots17dw",
      alt: "Close up of neat cornrow braids texture",
    },
    {
      name: "Deep Twists",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDE5XJwFspEd40ViNYqsXeoU60Snwkbhbxpb8o20xxg44ot0qNWOxCAP5oy8JzbHY6UYr54uvpdlonTT2aVguDmXsNPozDCEFaDQLqeNya4geHgunWVAC5WLGoWNkit09iS8E_ip-7P84IKW_NyvqnYoWy58Xsz6wZPmE8IflUI_U2lB_eS_CtG3p9AUpNauVfoLa2rTGv_PMhopE2yn2jxYF64nLAEE69W4nmu3i4RCBEz_G_MzMh9G93mzL3rDcHstj4LOUUdRJk",
      alt: "Woman with long passion twists hair style",
    },
    {
      name: "Italian Curls",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDEYinIw4TiI9Y23fs2-bPPl8hcpofc4zAV8sMu0qdF0q7N52A3C0obzD3Im0MPJsg-I4q10aUxOyVQceB2kYc1xyNYIQRyULLIfuHdoKFtqEkq9mwGi1eAr92rtVo9bRdmoAZUA0g_tcwhuP4y7cqWcb5WRpB4CvJ__GGYEXrVBc3Uj-P7y1bc3U8kLHSN7NWTMbjww_wUQFblmXXc3PDZptNUeWa47ygL5B0_yRYPva_MFubGU2jSUpKk0RQAuslAB77xsRbkWDA",
      alt: "Woman wearing faux locs looking to the side",
    },
    {
      name: "Bone Straight",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBCpWoyeAa1TFxXqeU2HK9EtAqGQ7uZZsGkAZGmRKTN1JdVwHH9_abdBWL39dcDiv0wwDp5fZPssWNsyCgd1wmmrfL_sGxecihj52Hbm6jUKpK1bC2CyNUZV6akQPOpaJqal57n9HJm7PqSQMEoJIt0OhZYYjFc35-EFvh_FTSlWwkf4QKpQIf0FjsW4K0oEVDfViHuYfF64P1kRKCSJ9RzXXqPjFouwCXaYXBkbTrbkmpMBX0qVGrcdUwrUo_j2tifF_8Ei8u4wqs",
      alt: "Golden hair jewelry and accessories on dark surface",
    },
    {
      name: "Pre-stretched",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBPxBZA5ovXY2C01gFTSTm2c8nNVH1GqHGfmLOHegP9yobuCbYS-IC7QEbb7mNHlSq3wDRCKtnqOL5tNtU-_YzGQ-_0p4LXVJv16b2bgHrpffJmBWYp_ApqiwFeqmBDGGx-_EBG49vsCBjMfBZ3a02awunPxjtDQzVD8r4AuEQTlZzpEkO-l-qnZ20GTsDfWHd55FJuQm7NetmF3PwzvJCnM9ffNMY9bdBZSJB-qsY-i2nsFGh9dGqjEQzQcfJZ3eZdAaHNots17dw",
      alt: "Pre-stretched hair texture",
    },
    {
      name: "Faux Locs",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDEYinIw4TiI9Y23fs2-bPPl8hcpofc4zAV8sMu0qdF0q7N52A3C0obzD3Im0MPJsg-I4q10aUxOyVQceB2kYc1xyNYIQRyULLIfuHdoKFtqEkq9mwGi1eAr92rtVo9bRdmoAZUA0g_tcwhuP4y7cqWcb5WRpB4CvJ__GGYEXrVBc3Uj-P7y1bc3U8kLHSN7NWTMbjww_wUQFblmXXc3PDZptNUeWa47ygL5B0_yRYPva_MFubGU2jSUpKk0RQAuslAB77xsRbkWDA",
      alt: "Faux Locs texture",
    },
    {
      name: "Kinky Coils",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDrd1k5RGk1reVbIdgihhhpM22ZlRlUALHrXu51OS894iWMOS06Tm67QHUzQ6x2pBMST2yqniplomujCIOBbZoxojaGIQSrpD_hhQkI5YeUnxzxMDcVaNO3Yopx0lt3WdMS-XFGaUyOTzwJwXvCsm_N-be5OWeqqXKDTw0fKZBc-lMbNMEXs9_4bnbK-ZVdu6YcKQ_sfcpjqk1MDGOZOTZ8mx0QbuoWr_wB4wlwmuxbNA5SqGWCDDmqWFTjFJbAK3nz_V--5rshgeQ",
      alt: "Kinky texture",
    },
  ];

  // Logic to process products
  const getProcessedProducts = () => {
    if (!products) return [];

    let result = [...products];

    // 1. Filter by Categories (from filters state)
    if (filters.categories && filters.categories.length > 0) {
      result = result.filter((product) => {
        // match any of the selected categories
        return filters.categories.some(
          (cat) =>
            product.category?.toLowerCase().includes(cat.toLowerCase()) ||
            product.name?.toLowerCase().includes(cat.toLowerCase()),
        );
      });
    }

    // 2. Filter by Price
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

    // 3. Filter by Length
    if (filters.lengths && filters.lengths.length > 0) {
      result = result.filter((product) => {
        if (product.length) {
          return filters.lengths.includes(product.length);
        }
        return filters.lengths.some(
          (l) => product.name?.includes(l) || product.description?.includes(l),
        );
      });
    }

    // 4. Sorting
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
          if (dateA.getTime() === dateB.getTime()) {
            return b.id - a.id;
          }
          return dateB - dateA;
        });
        break;
      case "Best Selling":
      case "Recommended":
      default:
        // logic for best selling? maybe random or default ID order
        break;
    }

    return result;
  };

  const filteredProducts = getProcessedProducts();

  return (
    <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
      <div className="relative flex min-h-screen w-full flex-col group/design-root bg-background-light dark:bg-background-dark text-[#181113] dark:text-white antialiased overflow-x-hidden">
        <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} />

        {/* Filter Sidebar Component */}

        <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-10 py-8 md:py-12 space-y-12">
          {/* Hero Section of the page */}
          <section className="text-center space-y-8">
            <div className="space-y-2">
              <nav className="flex items-center justify-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                <Link to="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
                <span className="material-symbols-outlined text-[12px]">
                  chevron_right
                </span>
                <span className="text-primary">Shop by Texture</span>
              </nav>
              <h1 className="text-[#181113] dark:text-white text-3xl md:text-4xl lg:text-5xl font-black tracking-tight">
                Shop by <span className="text-primary">Texture</span>
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto font-medium">
                Find the perfect match for your style. Select a texture to
                browse our premium collection.
              </p>
            </div>

            {/* Category Buttons */}
            <div className="flex flex-wrap justify-center gap-6 md:gap-10 py-4">
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => handleHeroCategoryClick(cat.name)}
                  className="group flex flex-col items-center gap-3 transition-transform hover:-translate-y-1"
                >
                  <div
                    className={`size-20 md:size-28 lg:size-32 rounded-full border-2 border-white dark:border-gray-800 shadow-md p-1 group-hover:border-primary transition-all ${
                      activeCategory === cat.name
                        ? "border-primary ring-4 ring-primary/10"
                        : ""
                    }`}
                  >
                    <div
                      className="w-full h-full rounded-full bg-center bg-cover bg-no-repeat"
                      style={{ backgroundImage: `url("${cat.image}")` }}
                      title={cat.alt}
                    ></div>
                  </div>
                  <span
                    className={`text-sm font-bold text-[#181113] dark:text-white group-hover:text-primary transition-colors ${
                      activeCategory === cat.name ? "text-primary" : ""
                    }`}
                  >
                    {cat.name}
                  </span>
                </button>
              ))}
            </div>
          </section>

          <hr className="border-gray-200 dark:border-gray-800" />

          {/* Results Section */}
          <section className="space-y-8" id="results">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex flex-col gap-1">
                <h2 className="text-2xl font-bold text-[#181113] dark:text-white">
                  {/* Show generic title if multiple or none selected */}
                  {filters.categories.length === 1
                    ? filters.categories[0]
                    : "All"}{" "}
                  Collection
                </h2>
                <p className="text-sm text-gray-500 font-medium">
                  Showing {filteredProducts.length} product
                  {filteredProducts.length !== 1 ? "s" : ""}
                </p>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {/* Price Filter */}
                <div className="relative" ref={priceRef}>
                  <button
                    onClick={() => setShowPriceFilter(!showPriceFilter)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold border transition-all ${
                      filters.priceRange.min || filters.priceRange.max
                        ? "border-primary text-primary bg-primary/5"
                        : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-primary"
                    }`}
                  >
                    Price
                    <span className="material-symbols-outlined text-[18px]">
                      {showPriceFilter ? "expand_less" : "expand_more"}
                    </span>
                  </button>

                  {showPriceFilter && (
                    <div className="absolute right-0 md:left-0 top-full mt-2 w-72 p-4 bg-white dark:bg-[#2d1b22] rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 z-50 animate-in fade-in zoom-in-95 duration-200">
                      <h4 className="font-bold text-sm mb-3 text-[#181113] dark:text-white">
                        Price Range
                      </h4>
                      <div className="flex items-center gap-2">
                        <div className="relative flex-1">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
                            ₦
                          </span>
                          <input
                            type="number"
                            placeholder="Min"
                            value={filters.priceRange.min}
                            onChange={(e) => handlePriceChange(e, "min")}
                            className="w-full pl-6 pr-3 py-2 text-sm bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-primary focus:border-primary"
                          />
                        </div>
                        <span className="text-gray-400">-</span>
                        <div className="relative flex-1">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
                            ₦
                          </span>
                          <input
                            type="number"
                            placeholder="Max"
                            value={filters.priceRange.max}
                            onChange={(e) => handlePriceChange(e, "max")}
                            className="w-full pl-6 pr-3 py-2 text-sm bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-primary focus:border-primary"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Length Filter */}
                <div className="relative" ref={lengthRef}>
                  <button
                    onClick={() => setShowLengthFilter(!showLengthFilter)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold border transition-all ${
                      filters.lengths.length > 0
                        ? "border-primary text-primary bg-primary/5"
                        : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-primary"
                    }`}
                  >
                    Length{" "}
                    {filters.lengths.length > 0 &&
                      `(${filters.lengths.length})`}
                    <span className="material-symbols-outlined text-[18px]">
                      {showLengthFilter ? "expand_less" : "expand_more"}
                    </span>
                  </button>

                  {showLengthFilter && (
                    <div className="absolute right-0 md:left-0 top-full mt-2 w-64 p-4 bg-white dark:bg-[#2d1b22] rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 z-50 animate-in fade-in zoom-in-95 duration-200">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-bold text-sm text-[#181113] dark:text-white">
                          Select Length
                        </h4>
                        {filters.lengths.length > 0 && (
                          <button
                            onClick={() =>
                              setFilters((prev) => ({ ...prev, lengths: [] }))
                            }
                            className="text-xs text-primary font-bold hover:underline"
                          >
                            Reset
                          </button>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {['12"', '16"', '20"', '24"', '30"', '36"'].map(
                          (len) => (
                            <button
                              key={len}
                              onClick={() => handleLengthToggle(len)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                                filters.lengths.includes(len)
                                  ? "bg-primary text-white border-primary"
                                  : "bg-gray-50 dark:bg-black/20 border-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-100"
                              }`}
                            >
                              {len}
                            </button>
                          ),
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Divider */}
                <div className="h-8 w-px bg-gray-200 dark:bg-gray-700 mx-2 hidden sm:block"></div>

                {/* Sort Dropdown */}
                <div className="relative group">
                  <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="appearance-none bg-transparent font-bold text-sm text-[#181113] dark:text-white pr-8 py-2 cursor-pointer focus:outline-none hover:text-primary transition-colors"
                  >
                    <option>Recommended</option>
                    <option>Newest Arrivals</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-[18px]">
                    sort
                  </span>
                </div>
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex flex-col group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
                      {product.badge && (
                        <div className="absolute top-3 left-3 bg-primary text-white text-[10px] font-black px-2 py-1 rounded-md z-10 uppercase tracking-tighter">
                          {product.badge}
                        </div>
                      )}
                      <button className="absolute top-3 right-3 bg-white/90 dark:bg-black/50 p-2 rounded-full text-gray-600 dark:text-gray-300 hover:text-primary hover:bg-white transition-all z-10 shadow-sm">
                        <span
                          className="material-symbols-outlined"
                          style={{ fontSize: "20px" }}
                        >
                          favorite
                        </span>
                      </button>
                      <Link
                        to={`/product/${product.id}`}
                        className="block w-full h-full"
                      >
                        <div
                          className="w-full h-full bg-center bg-cover transition-transform duration-700 group-hover:scale-110"
                          style={{ backgroundImage: `url("${product.image}")` }}
                          title={product.alt || product.name}
                        ></div>
                      </Link>
                      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <button className="w-full bg-[#181113] dark:bg-primary text-white py-3 rounded-xl font-bold text-sm shadow-lg hover:opacity-90 transition-all">
                          Add to Bag
                        </button>
                      </div>
                    </div>
                    <div className="p-5 flex flex-col gap-3">
                      <div>
                        <p className="text-[11px] font-bold text-primary uppercase tracking-widest mb-1">
                          {product.category}
                        </p>
                        <Link to={`/product/${product.id}`}>
                          <h3 className="text-base font-bold text-[#181113] dark:text-white line-clamp-1 group-hover:text-primary transition-colors">
                            {product.name}
                          </h3>
                        </Link>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-extrabold text-[#181113] dark:text-white">
                          ₦{product.price.toLocaleString()}
                        </span>
                        {/* Render simple color swatches if needed, or placeholder */}
                        <div className="flex -space-x-1">
                          {/* Placeholder swatches */}
                          <div className="size-4 rounded-full bg-black border border-white ring-1 ring-gray-100"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-1 md:col-span-4 text-center py-20 text-gray-500">
                  <p>No products found matching your fitlers.</p>
                </div>
              )}
            </div>

            <div className="flex justify-center pt-8">
              <button className="px-10 py-3 border-2 border-[#181113] dark:border-white rounded-xl font-bold text-sm hover:bg-[#181113] hover:text-white dark:hover:bg-white dark:hover:text-[#181113] transition-all">
                Load More Products
              </button>
            </div>
          </section>

          {/* Join Form */}
          <div className="flex justify-center py-10 border-t border-gray-100 dark:border-gray-800">
            <div className="flex flex-col items-center gap-6 max-w-2xl text-center w-full">
              <div className="p-3 bg-primary/10 rounded-full text-primary">
                <span className="material-symbols-outlined text-3xl">mail</span>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-bold text-[#181113] dark:text-white">
                  Join the Verse
                </h2>
                <p className="text-gray-500 dark:text-gray-400 font-medium">
                  Get the latest texture releases and styling tips delivered to
                  your inbox.
                </p>
              </div>
              <form className="flex w-full max-w-md gap-3 flex-col sm:flex-row">
                <input
                  className="flex-1 rounded-xl border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 py-3 px-4 focus:ring-primary focus:border-primary"
                  placeholder="Enter your email"
                  required=""
                  type="email"
                />
                <button
                  className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:opacity-90 transition-opacity whitespace-nowrap"
                  type="button"
                >
                  Sign Me Up
                </button>
              </form>
            </div>
          </div>
        </main>

        {/* Mobile Floating Filter Button (if user wants duplicate, but reusing the main one is cleaner) */}

        <Footer />
      </div>
    </div>
  );
};

export default ShopByTexture;
