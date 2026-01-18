import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useProducts } from "../context/ProductContext";
import { Link } from "react-router-dom";

const ShopByTexture = ({ toggleDarkMode, darkMode }) => {
  const { products } = useProducts();
  const [activeCategory, setActiveCategory] = useState("Pre-stretched");

  // Categories from the provided design
  const categories = [
    {
      name: "Pre-stretched",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBPxBZA5ovXY2C01gFTSTm2c8nNVH1GqHGfmLOHegP9yobuCbYS-IC7QEbb7mNHlSq3wDRCKtnqOL5tNtU-_YzGQ-_0p4LXVJv16b2bgHrpffJmBWYp_ApqiwFeqmBDGGx-_EBG49vsCBjMfBZ3a02awunPxjtDQzVD8r4AuEQTlZzpEkO-l-qnZ20GTsDfWHd55FJuQm7NetmF3PwzvJCnM9ffNMY9bdBZSJB-qsY-i2nsFGh9dGqjEQzQcfJZ3eZdAaHNots17dw",
      alt: "Pre-stretched hair texture",
    },
    {
      name: "Passion Twists",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDE5XJwFspEd40ViNYqsXeoU60Snwkbhbxpb8o20xxg44ot0qNWOxCAP5oy8JzbHY6UYr54uvpdlonTT2aVguDmXsNPozDCEFaDQLqeNya4geHgunWVAC5WLGoWNkit09iS8E_ip-7P84IKW_NyvqnYoWy58Xsz6wZPmE8IflUI_U2lB_eS_CtG3p9AUpNauVfoLa2rTGv_PMhopE2yn2jxYF64nLAEE69W4nmu3i4RCBEz_G_MzMh9G93mzL3rDcHstj4LOUUdRJk",
      alt: "Passion Twists texture",
    },
    {
      name: "Faux Locs",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDEYinIw4TiI9Y23fs2-bPPl8hcpofc4zAV8sMu0qdF0q7N52A3C0obzD3Im0MPJsg-I4q10aUxOyVQceB2kYc1xyNYIQRyULLIfuHdoKFtqEkq9mwGi1eAr92rtVo9bRdmoAZUA0g_tcwhuP4y7cqWcb5WRpB4CvJ__GGYEXrVBc3Uj-P7y1bc3U8kLHSN7NWTMbjww_wUQFblmXXc3PDZptNUeWa47ygL5B0_yRYPva_MFubGU2jSUpKk0RQAuslAB77xsRbkWDA",
      alt: "Faux Locs texture",
    },
    {
      name: "Deep Wave",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBmg-yuymrhyooy-Y9ZGK113t_cIdDhGJMK59zV77CB8M2d9QwzkNeiL-Nn-Cl8-dmrayl0Ei7pywJUCOrBTXypSlvUWb8QCFGcVRGfNWkMuv7euzIBvehh9nqT6O-4xsc6WhRkGWmibpYxVHR242jomolVcbBip6_PAt5goOa5XrRsgJqkpUVMAqRnpVsZ_L_yMOZy5_TUtw_IUWd2eOFNSvm6pKV5x9M7tjx_DZfA5opeiUDgBaq2WK8ZaG1KPFOvmH1wxnmZpMQ",
      alt: "Deep Wave/Curls texture",
    },
    {
      name: "Sleek Straight",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCbmjWQvm6sTCWKZMez3uIV_PgfEKeq2YAdhV9xL9_0rL9SLjfPIKuT3K0xW1Tw0WzQPvSjAVgaLBp6AWb9idkD56xdk-OcvORw9FmZSUrehOvrYbvC6bshZfE1XRifTFYIU1yU493FcB-YYex55UWJEnuP9v4Lt6NIWoLcL4rNcHAXjyqGHdwSFSRGInE7LbOgeXgUGs-BMxUcoFYGYF8W8A4ufrGakSDLPaBYKEk_35Z-CXLlFZOO0EOLIKYTHIy05uJ5Omjsmok",
      alt: "Straight hair texture",
    },
    {
      name: "Kinky Coils",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDrd1k5RGk1reVbIdgihhhpM22ZlRlUALHrXu51OS894iWMOS06Tm67QHUzQ6x2pBMST2yqniplomujCIOBbZoxojaGIQSrpD_hhQkI5YeUnxzxMDcVaNO3Yopx0lt3WdMS-XFGaUyOTzwJwXvCsm_N-be5OWeqqXKDTw0fKZBc-lMbNMEXs9_4bnbK-ZVdu6YcKQ_sfcpjqk1MDGOZOTZ8mx0QbuoWr_wB4wlwmuxbNA5SqGWCDDmqWFTjFJbAK3nz_V--5rshgeQ",
      alt: "Kinky texture",
    },
  ];

  // Filter products based on active category
  // Comparison is case-insensitive and partial match to be more robust
  const filteredProducts = products.filter((product) => {
    if (!product.category) return false;
    // Simple normalization - assuming category strings
    return (
      product.category.toLowerCase().includes(activeCategory.toLowerCase()) ||
      activeCategory.toLowerCase().includes(product.category.toLowerCase())
    );
  });

  return (
    <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
      <div className="relative flex min-h-screen w-full flex-col group/design-root bg-background-light dark:bg-background-dark text-[#181113] dark:text-white antialiased overflow-x-hidden">
        <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} />

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
                  onClick={() => setActiveCategory(cat.name)}
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
                  {activeCategory} Collection
                </h2>
                <p className="text-sm text-gray-500 font-medium">
                  Showing {filteredProducts.length} product
                  {filteredProducts.length !== 1 ? "s" : ""}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-bold hover:bg-gray-50 transition-colors">
                  <span className="material-symbols-outlined text-lg">
                    tune
                  </span>{" "}
                  Filters
                </button>
                <div className="relative group">
                  <select className="appearance-none bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-lg text-sm font-bold px-4 py-2 pr-10 focus:ring-primary focus:border-primary cursor-pointer w-48">
                    <option>Best Selling</option>
                    <option>Newest Arrivals</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                    expand_more
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
                          ${product.price}
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
                  <p>No products found in this category.</p>
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

        <Footer />
      </div>
    </div>
  );
};

export default ShopByTexture;
