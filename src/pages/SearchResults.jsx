import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const SearchResults = ({ toggleDarkMode, darkMode }) => {
  // Dummy data based on the provided HTML snippet
  const products = [
    {
      id: 1,
      name: "Luxe Silky Braid - Ombre Rose Gold",
      price: 12.99,
      originalPrice: 18.99,
      rating: 4.5,
      reviews: 320,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBH2vSTb5CrKLzwnjiIj1V3njdkVNzFbVScyHE0xHfOwctFC5ugBb7aSPxzhck9gGE454mcAi_uwSyWVkuhguCL-j0PWQqrs9WZFcKHl_FmD-y1ryFazbTbj8KI4ytOjmUFQRLQDIAxueuX3ZIyA_4-VsuSaymaPYuBLSEJRtnu09YzQ8XmlTRDolRBP1ghgYbCQvpmaEqwSIDuVDnR1LO_eBLMFLk21MvpCTtOsvwJlB1G7BVbP1WPhIhwcELf_mrFDxA0ubX1Fqs",
      badge: "Best Seller",
      badgeColor: "bg-primary text-white",
    },
    {
      id: 2,
      name: "Afro Kinky Bulk - Hot Pink",
      price: 24.0,
      originalPrice: null,
      rating: 4,
      reviews: 84,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCtgjbwPBb9mAR7Xt7LaKeBvWq1CuSLuVUOJoq7hrTutoUELgKhJ8ULQcALm357NLO6cAtx4fTfSvudVHZ6Xl3EAqcihggTPuW_0GbWlsjiQYkWPhkYvGzItftCe0uF2CKBBn8i9YuO_x9SAoJNu8sGUk6G12orNznj2sscB7oSGAZwn61hA_IDP0LLhs8TolIQlnVQq90AN18lua-x_KEhMLkjiQ73DS-l-c9ojjVu3-o_s_7WnbHnASSFaBlybj_DVbG-MvUetlU",
      badge: null,
    },
    {
      id: 3,
      name: "Ultra Braid 3x Pack - Pastel Pink",
      price: 15.5,
      originalPrice: null,
      rating: 5,
      reviews: 12,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBMRiYQ9U53UVyvpnsFhhwt0jvIU-xbBkeSExzTUNWaocjrRtpjxF0fjXI-_6IggcaFIw-BazL2YYm_y3oD2QDLPUPueWK4cSuONF7kUf-Mf8XBxexKCYonoVm1e4XMHPeMgb16XhHozb8Tmayf04xeW0IeQuybwOBev4U1398KF8OVwIZXEhfYN-UE776Ce6rJMqq4HQAJj4N8vnT2Y-cIayai7TKycSBXDOQ6k94_yDjDsHKU3Rz5ToW1EKKVoLj1PdaCb3qNvZ8",
      badge: "New",
      badgeColor: "bg-white/90 backdrop-blur text-[#181113]",
    },
    {
      id: 4,
      name: 'Pre-Stretched 26" - Magenta',
      price: 8.99,
      originalPrice: null,
      rating: 2,
      reviews: 5,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDgyxwQLaiLehEVLM2n38H5_BbeGe9UwK-XUZZJtd2zeDDe5iVjq_7j_P-5V2o-QPxaIcDFFrl7f-PsA-5W1bmdU44pxbAraDsCjlkj8MIVjxrXgZURE5-zHRBrwaw7j1Zq8n3LRQIKAsbeSWnl2os1fys9ncRFXoeX7S_LUeVIMbmllliyV_FnRmsqJDkV4Unh_vuZZ1MB2AEVSIaT7wyPV5LhpwIoEJZXWxkHTgmMx97L7H6Iv_G-in5nYg3hBOw4tDff7m4vrR8",
      badge: null,
    },
    {
      id: 5,
      name: "Crochet Faux Locs - Ombre Berry",
      price: 14.5,
      originalPrice: null,
      rating: 5,
      reviews: 45,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAkSe2v5zrF3FBFZTIGmem0NehgHJM1BnuuMELMAqwMK6nzO0h0SCeqbuABUoLqCdqwg5irPEMXkBvGLLjAR1MDKyIyOEgIsIre_HHk9rp1-LZ3ranZlPQNoewokHKWNv3V7Zp52rHf_t-WlhtP3n5bBViQVdXX1F4cZWjiUqf9Ng32ghtHDyiQB68JV2iYR-H-T9dQAiKSh8Cep22qspEio-yb-feEtWo6Njdd1ALxOqN3cATaTYyxb-EnlVr2AxUkIr8hXOWtMac",
      badge: null,
    },
    {
      id: 6,
      name: "Spring Twist Hair - Pink Mix",
      price: 10.0,
      originalPrice: 13.5,
      rating: 4.5,
      reviews: 210,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuA_ldklUYVJuWlbOJVv4Ynlrn6jb111tNXGB2jNrIfkfGCnyVXRVLLtEwG6gWprcSEr_GEUA_5c4UjWN_m25UnZZe-xgnQ5agQLqUhaLPsMQm9Y0EtwcvxEbxOV0D6GkihG83pGyqVPf7SLlpk8fHi1HTUs5byGRDhHxXsIq1SmyZp0CRznjFZLgJVsVGFWKcTv1M55ub_PKjA8aTfwWmsnE1-wfA-DeLETv0n6WgfZSpewHnKnXpWYRsX8Nv7RubgwlYMNyjaamKI",
      badge: null,
    },
  ];

  // Helper to render stars
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        stars.push(
          <span
            key={i}
            className="material-symbols-outlined text-base filled"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            star
          </span>,
        );
      } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
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
      {/* Top Navigation Bar - Using existing Header */}
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
                Results for 'Ombre Pink'
              </h2>
              <p className="text-[#89616f] text-sm mt-1">
                Showing 24 results from 120 total
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-[#181113] dark:text-white whitespace-nowrap">
                Sort by:
              </span>
              <div className="relative">
                <select className="appearance-none bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-[#181113] dark:text-white text-sm font-semibold rounded-xl pl-4 pr-10 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer shadow-sm">
                  <option>Best Sellers</option>
                  <option>Newest Arrivals</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#181113] dark:text-white">
                  <span className="material-symbols-outlined text-sm">
                    expand_more
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Grid */}
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
                      ({product.reviews})
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-[#181113] dark:text-white leading-tight group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-lg font-bold text-primary">
                      ${product.price.toFixed(2)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-[#89616f] line-through">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

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
                3
              </button>
              <button className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-[#181113] dark:text-white font-bold hover:bg-gray-50 dark:hover:bg-gray-800">
                ...
              </button>
              <button className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-[#181113] dark:text-white font-bold hover:bg-gray-50 dark:hover:bg-gray-800">
                12
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
