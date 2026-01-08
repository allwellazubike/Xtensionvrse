import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";

const ProductDetails = ({ toggleDarkMode, darkMode }) => {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));
  const [selectedImage, setSelectedImage] = useState(product?.image);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  console.log(products);

  useEffect(() => {
    if (product) {
      setSelectedImage(product.image);
    }
    window.scrollTo(0, 0);
  }, [product]);

  if (!product) {
    return (
      <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
        <div className="flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark text-[#181113] dark:text-white antialiased">
          <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
          <div className="flex-1 flex items-center justify-center">
            <h2 className="text-2xl font-bold">Product not found</h2>
          </div>
          <Footer />
        </div>
      </div>
    );
  }

  // Get similar products (excluding current one)
  const similarProducts = products
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return (
    <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
      <div className="flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark text-[#181113] dark:text-white antialiased font-display">
        <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} />

        {/* Main Content */}
        <main className="flex-1 w-full flex justify-center py-6 px-4 md:px-10 lg:px-40">
          <div className="w-full max-w-[1280px]">
            {/* Breadcrumbs */}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Left Column: Image Gallery */}
              <div className="lg:col-span-7 flex flex-col gap-4">
                {/* Main Image */}
                <div className="w-full aspect-3/4 md:aspect-4/3 lg:aspect-3/4 rounded-xl overflow-hidden bg-gray-100 relative group">
                  {product.badge && (
                    <div className="absolute top-4 left-4 z-10 bg-white/90 dark:bg-black/60 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-primary uppercase tracking-wide shadow-sm">
                      {product.badge}
                    </div>
                  )}
                  <div
                    className="w-full h-full bg-center bg-cover transition-transform duration-500 hover:scale-105"
                    style={{ backgroundImage: `url("${selectedImage}")` }}
                  ></div>
                  <button
                    onClick={() => {
                      const currentIndex =
                        product.images.indexOf(selectedImage);
                      const prevIndex =
                        currentIndex === 0
                          ? product.images.length - 1
                          : currentIndex - 1;
                      setSelectedImage(product.images[prevIndex]);
                    }}
                    className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/80 dark:bg-black/50 p-2 rounded-full hover:bg-white dark:hover:bg-black transition-all opacity-0 group-hover:opacity-100"
                  >
                    <span className="material-symbols-outlined">
                      chevron_left
                    </span>
                  </button>
                  <button
                    onClick={() => {
                      const currentIndex =
                        product.images.indexOf(selectedImage);
                      const nextIndex =
                        currentIndex === product.images.length - 1
                          ? 0
                          : currentIndex + 1;
                      setSelectedImage(product.images[nextIndex]);
                    }}
                    className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/80 dark:bg-black/50 p-2 rounded-full hover:bg-white dark:hover:bg-black transition-all opacity-0 group-hover:opacity-100"
                  >
                    <span className="material-symbols-outlined">
                      chevron_right
                    </span>
                  </button>
                </div>

                {/* Thumbnails Grid */}
                <div className="grid grid-cols-4 gap-3">
                  {product.images && product.images.length > 0 ? (
                    product.images.map((img, idx) => (
                      <div
                        key={idx}
                        className={`aspect-square rounded-lg border-2 overflow-hidden cursor-pointer ${
                          selectedImage === img
                            ? "border-primary"
                            : "border-transparent hover:border-gray-300"
                        }`}
                        onClick={() => setSelectedImage(img)}
                      >
                        <div
                          className="w-full h-full bg-center bg-cover"
                          style={{ backgroundImage: `url("${img}")` }}
                        ></div>
                      </div>
                    ))
                  ) : (
                    // Fallback if no images array, just show main image as thumb
                    <div
                      className={`aspect-square rounded-lg border-2 overflow-hidden cursor-pointer border-primary`}
                      onClick={() => setSelectedImage(product.image)}
                    >
                      <div
                        className="w-full h-full bg-center bg-cover"
                        style={{ backgroundImage: `url("${product.image}")` }}
                      ></div>
                    </div>
                  )}

                  {/* Video Thumbnail Placeholder (Keep provided UI) */}
                  <div className="aspect-square rounded-lg border border-transparent hover:border-gray-300 overflow-hidden cursor-pointer opacity-70 hover:opacity-100 transition-all flex items-center justify-center bg-[#f4f0f2] dark:bg-[#3a1d25]">
                    <span className="material-symbols-outlined text-3xl text-[#89616f]">
                      play_circle
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Product Details & Controls */}
              <div className="lg:col-span-5 relative">
                <div className="sticky top-24 flex flex-col gap-6">
                  {/* Header Section */}
                  <div>
                    <div className="flex justify-between items-start">
                      <h1 className="text-[#181113] dark:text-white tracking-tight text-[32px] font-bold leading-tight pb-2">
                        {product.name}
                      </h1>
                      <button className="text-[#89616f] hover:text-primary transition-colors">
                        <span className="material-symbols-outlined">
                          favorite
                        </span>
                      </button>
                    </div>
                    <div className="flex items-center gap-2 pb-4">
                      <div className="flex text-amber-400 text-sm">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`material-symbols-outlined !text-[18px] fill-current ${
                              i < Math.floor(product.rating)
                                ? ""
                                : "text-gray-300"
                            }`}
                          >
                            star
                          </span>
                        ))}
                      </div>
                      <span className="text-[#89616f] text-sm font-medium underline cursor-pointer">
                        {product.rating} ({product.reviews} reviews)
                      </span>
                    </div>
                    <div className="flex items-end gap-3">
                      <span className="text-3xl font-bold text-primary">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.originalPrice && (
                        <>
                          <span className="text-lg text-[#89616f] line-through mb-1">
                            ${product.originalPrice}
                          </span>
                          <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-md mb-2">
                            Save 25%
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  <hr className="border-[#f4f0f2] dark:border-[#3a1d25]" />

                  {/* Color Selector */}
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-[#89616f] mb-3">
                      Color:{" "}
                      <span className="text-[#181113] dark:text-white normal-case font-semibold">
                        Jet Black (1B)
                      </span>
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      <button
                        aria-label="Select Jet Black"
                        className="w-12 h-12 rounded-full border-2 border-primary shadow-sm flex items-center justify-center ring-2 ring-offset-2 ring-primary bg-black"
                      ></button>
                      <button
                        aria-label="Select Dark Brown"
                        className="w-12 h-12 rounded-full border border-gray-200 dark:border-gray-600 shadow-sm flex items-center justify-center bg-[#3B2F2F] hover:scale-105 transition-transform"
                      ></button>
                      <button
                        aria-label="Select Ombre Brown"
                        className="w-12 h-12 rounded-full border border-gray-200 dark:border-gray-600 shadow-sm flex items-center justify-center bg-gradient-to-b from-black to-[#8B4513] hover:scale-105 transition-transform"
                      ></button>
                      <button
                        aria-label="Select Ombre Pink"
                        className="w-12 h-12 rounded-full border border-gray-200 dark:border-gray-600 shadow-sm flex items-center justify-center bg-gradient-to-b from-black to-[#FF69B4] hover:scale-105 transition-transform"
                      ></button>
                    </div>
                  </div>

                  {/* Length Selector */}
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-[#89616f] mb-3">
                      Length
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      <button className="px-6 py-2.5 rounded-lg border bg-white dark:bg-[#2a141b] text-[#181113] dark:text-white border-gray-200 dark:border-[#4d2630] font-medium text-sm hover:border-primary hover:text-primary transition-colors">
                        20 inch
                      </button>
                      <button className="px-6 py-2.5 rounded-lg border-2 border-primary bg-primary/5 text-primary font-bold text-sm shadow-sm">
                        26 inch
                      </button>
                      <button className="px-6 py-2.5 rounded-lg border bg-white dark:bg-[#2a141b] text-[#181113] dark:text-white border-gray-200 dark:border-[#4d2630] font-medium text-sm hover:border-primary hover:text-primary transition-colors">
                        30 inch
                      </button>
                      <button className="px-6 py-2.5 rounded-lg border bg-gray-50 dark:bg-[#1f0f14] text-gray-400 border-gray-100 dark:border-[#2d161d] font-medium text-sm cursor-not-allowed">
                        52 inch
                      </button>
                    </div>
                  </div>

                  {/* Quantity and CTA */}
                  <div className="flex gap-4 pt-2">
                    <div className="flex items-center border border-gray-200 dark:border-[#3a1d25] rounded-xl h-12 bg-[#f4f0f2] dark:bg-[#2a141b]">
                      <button
                        className="w-10 h-full flex items-center justify-center text-[#181113] dark:text-white hover:text-primary"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      >
                        <span className="material-symbols-outlined text-sm">
                          remove
                        </span>
                      </button>
                      <input
                        className="w-10 h-full bg-transparent border-none text-center focus:ring-0 font-bold text-[#181113] dark:text-white p-0"
                        type="text"
                        value={quantity}
                        readOnly
                      />
                      <button
                        className="w-10 h-full flex items-center justify-center text-[#181113] dark:text-white hover:text-primary"
                        onClick={() => setQuantity(quantity + 1)}
                      >
                        <span className="material-symbols-outlined text-sm">
                          add
                        </span>
                      </button>
                    </div>
                    <button
                      onClick={() => addToCart(product, quantity)}
                      className="flex-1 bg-primary hover:bg-rose-600 text-white font-bold rounded-xl h-12 flex items-center justify-center gap-2 shadow-lg shadow-rose-200 dark:shadow-rose-900/20 transition-all transform active:scale-[0.98]"
                    >
                      <span className="material-symbols-outlined">
                        shopping_bag
                      </span>
                      Add to Bag - ₦
                      {(product.price * quantity).toLocaleString()}
                    </button>
                  </div>

                  {/* Trust Badges */}
                  <div className="grid grid-cols-3 gap-2 py-4">
                    <div className="flex flex-col items-center gap-2 p-3 bg-gray-50 dark:bg-[#2a141b] rounded-lg text-center">
                      <span className="material-symbols-outlined text-primary">
                        water_drop
                      </span>
                      <span className="text-xs font-medium text-[#181113] dark:text-white">
                        Hot Water Set
                      </span>
                    </div>
                    <div className="flex flex-col items-center gap-2 p-3 bg-gray-50 dark:bg-[#2a141b] rounded-lg text-center">
                      <span className="material-symbols-outlined text-primary">
                        spa
                      </span>
                      <span className="text-xs font-medium text-[#181113] dark:text-white">
                        Itch Free
                      </span>
                    </div>
                    <div className="flex flex-col items-center gap-2 p-3 bg-gray-50 dark:bg-[#2a141b] rounded-lg text-center">
                      <span className="material-symbols-outlined text-primary">
                        local_shipping
                      </span>
                      <span className="text-xs font-medium text-[#181113] dark:text-white">
                        Fast Ship
                      </span>
                    </div>
                  </div>

                  {/* Accordion Info */}
                  <div className="flex flex-col gap-2">
                    <details
                      className="group border border-[#f4f0f2] dark:border-[#3a1d25] rounded-lg bg-white dark:bg-[#1a0c10] open:bg-gray-50 dark:open:bg-[#2a141b] transition-colors"
                      open
                    >
                      <summary className="flex justify-between items-center p-4 cursor-pointer list-none font-bold text-[#181113] dark:text-white select-none">
                        <span>Description</span>
                        <span className="material-symbols-outlined transform group-open:rotate-180 transition-transform">
                          expand_more
                        </span>
                      </summary>
                      <div className="px-4 pb-4 text-sm text-[#89616f] leading-relaxed">
                        {product.description ||
                          "Our Lux Braid Pre-Stretched Extension is made from premium Kanekalon fiber, offering a soft, human-hair-like texture. It's pre-feathered and pre-stretched to save you prep time. Lightweight and tangle-free for effortless braiding."}
                      </div>
                    </details>
                    <details className="group border border-[#f4f0f2] dark:border-[#3a1d25] rounded-lg bg-white dark:bg-[#1a0c10] open:bg-gray-50 dark:open:bg-[#2a141b] transition-colors">
                      <summary className="flex justify-between items-center p-4 cursor-pointer list-none font-bold text-[#181113] dark:text-white select-none">
                        <span>Specifications</span>
                        <span className="material-symbols-outlined transform group-open:rotate-180 transition-transform">
                          expand_more
                        </span>
                      </summary>
                      <div className="px-4 pb-4 text-sm text-[#89616f] leading-relaxed">
                        <ul className="list-disc pl-5 space-y-1">
                          {product.specs ? (
                            product.specs.map((spec, i) => (
                              <li key={i}>{spec}</li>
                            ))
                          ) : (
                            <>
                              <li>Weight: 90g per pack</li>
                              <li>Material: Synthetic Fiber</li>
                              <li>Texture: Yaki Straight</li>
                            </>
                          )}
                        </ul>
                      </div>
                    </details>
                    <details className="group border border-[#f4f0f2] dark:border-[#3a1d25] rounded-lg bg-white dark:bg-[#1a0c10] open:bg-gray-50 dark:open:bg-[#2a141b] transition-colors">
                      <summary className="flex justify-between items-center p-4 cursor-pointer list-none font-bold text-[#181113] dark:text-white select-none">
                        <span>Shipping & Returns</span>
                        <span className="material-symbols-outlined transform group-open:rotate-180 transition-transform">
                          expand_more
                        </span>
                      </summary>
                      <div className="px-4 pb-4 text-sm text-[#89616f] leading-relaxed">
                        Free shipping on orders over $50. Returns accepted
                        within 30 days if product is unopened and in original
                        packaging.
                      </div>
                    </details>
                  </div>
                </div>
              </div>
            </div>

            {/* Reviews Section - Static as in HTML but using colors variables */}
            <div className="mt-20 border-t border-[#f4f0f2] dark:border-[#3a1d25] pt-10">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-[#181113] dark:text-white">
                  Customer Reviews
                </h2>
                <button className="text-primary font-bold text-sm hover:underline">
                  Write a Review
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Review 1 */}
                <div className="p-6 rounded-xl bg-white dark:bg-[#1a0c10] border border-[#f4f0f2] dark:border-[#3a1d25] shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-10 h-10 rounded-full bg-gray-200 bg-cover bg-center"
                      style={{
                        backgroundImage:
                          'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDoyqpJrti_DjNB3vjF_JplmM_cSkOQJcuHP4kLcppxTHS6SOX2-8G_ALOaLE3HigV5M4WJakqRuLMkEgu6QiUSxr-rwur6-zcZAuBwKZjBJUPdwaUBnBdV5QXpFmJNql5FqDMwhAE_lXw2wEKX2tXgks6vb69DldOBU2Z8ysngZihfttsU-owP6nNGTNBCOViiJ5NiFJrFEoX2H9p2YCQWfrQc7QQhrr2obXWRgaVmW186J5Of2J-IO8S_aizKEXd2Eb47fL0S7mE")',
                      }}
                    ></div>
                    <div>
                      <h4 className="font-bold text-sm text-[#181113] dark:text-white">
                        Sarah M.
                      </h4>
                      <div className="flex text-amber-400 text-xs">
                        <span className="material-symbols-outlined !text-[14px] fill-current">
                          star
                        </span>
                        <span className="material-symbols-outlined !text-[14px] fill-current">
                          star
                        </span>
                        <span className="material-symbols-outlined !text-[14px] fill-current">
                          star
                        </span>
                        <span className="material-symbols-outlined !text-[14px] fill-current">
                          star
                        </span>
                        <span className="material-symbols-outlined !text-[14px] fill-current">
                          star
                        </span>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400 ml-auto">
                      2 days ago
                    </span>
                  </div>
                  <h5 className="font-bold text-sm mb-2 text-[#181113] dark:text-white">
                    Best braiding hair!
                  </h5>
                  <p className="text-sm text-[#89616f] leading-relaxed">
                    The texture is amazing and it didn't hurt my fingers while
                    braiding. The color blend is seamless.
                  </p>
                  <div className="flex gap-2 mt-4">
                    <div
                      className="w-16 h-16 rounded-lg bg-cover bg-center"
                      style={{
                        backgroundImage:
                          'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAXbhqUtLyX537BDKD5w3qHaIenDH-9raq0jl1I4WRtp85TGOTppj0LLU8Yaiy1xPE9RXBEEnioDGbIkONeJIcPKuYHR1ImfRn8M6murrQjbT2juC2I5xDDqlvPLaQ_z2cq0VCa-hmmdEtkwScPcFEfpiSSGHN6PjfdbFKxokOGBTJEZ2qhVSy2PV9iBJ8I7gQFT_zuashRhgRUfXCNSPD-U-529hCy_CHlsN69VlNZxQgCou81WISy3xEgWlHbCcihxSA_5f-k5v8")',
                      }}
                    ></div>
                  </div>
                </div>
                {/* Review 2 */}
                <div className="p-6 rounded-xl bg-white dark:bg-[#1a0c10] border border-[#f4f0f2] dark:border-[#3a1d25] shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-[#89616f] font-bold">
                      JD
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-[#181113] dark:text-white">
                        Jessica D.
                      </h4>
                      <div className="flex text-amber-400 text-xs">
                        <span className="material-symbols-outlined !text-[14px] fill-current">
                          star
                        </span>
                        <span className="material-symbols-outlined !text-[14px] fill-current">
                          star
                        </span>
                        <span className="material-symbols-outlined !text-[14px] fill-current">
                          star
                        </span>
                        <span className="material-symbols-outlined !text-[14px] fill-current">
                          star
                        </span>
                        <span className="material-symbols-outlined !text-[14px] fill-current text-gray-300">
                          star
                        </span>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400 ml-auto">
                      1 week ago
                    </span>
                  </div>
                  <h5 className="font-bold text-sm mb-2 text-[#181113] dark:text-white">
                    Great value
                  </h5>
                  <p className="text-sm text-[#89616f] leading-relaxed">
                    Really good quality for the price. I just wish the shipping
                    was slightly faster, but the product itself is top notch.
                  </p>
                </div>
                {/* Review 3 */}
                <div className="p-6 rounded-xl bg-white dark:bg-[#1a0c10] border border-[#f4f0f2] dark:border-[#3a1d25] shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-10 h-10 rounded-full bg-gray-200 bg-cover bg-center"
                      style={{
                        backgroundImage:
                          'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDhqZOrsSOaLPCQnuwkwQKZAnE1rnJ9QgTj1xY5fo4yc8xPw750apETiq5kni87o3J-bW9kGcMmhoPSkPBmZv2QuANbyx-fHXgXyRXzvboTgglfXjbAnwPO-Q11io1k96h9StGio7AXj8PnfIlptXHMsDTuQIDH1vLxk_GWL8RjqmMw7CI7m6scj2fHJm_AwEr4xeHZa8WL7zmkxXpCOQVzOuXAfbVnJkFNC2G-iui8r0eDzHpv4w9B4EB9H5IXPP6iN9eQI6VLKio")',
                      }}
                    ></div>
                    <div>
                      <h4 className="font-bold text-sm text-[#181113] dark:text-white">
                        Keisha L.
                      </h4>
                      <div className="flex text-amber-400 text-xs">
                        <span className="material-symbols-outlined !text-[14px] fill-current">
                          star
                        </span>
                        <span className="material-symbols-outlined !text-[14px] fill-current">
                          star
                        </span>
                        <span className="material-symbols-outlined !text-[14px] fill-current">
                          star
                        </span>
                        <span className="material-symbols-outlined !text-[14px] fill-current">
                          star
                        </span>
                        <span className="material-symbols-outlined !text-[14px] fill-current">
                          star
                        </span>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400 ml-auto">
                      2 weeks ago
                    </span>
                  </div>
                  <h5 className="font-bold text-sm mb-2 text-[#181113] dark:text-white">
                    Love the Ombre!
                  </h5>
                  <p className="text-sm text-[#89616f] leading-relaxed">
                    The ombre pink transition is perfect. It looks exactly like
                    the pictures. Will definitely buy again.
                  </p>
                </div>
              </div>
            </div>

            {/* You might also like (Dynamic from data) */}
            <div className="mt-20 mb-20">
              <h3 className="text-xl font-bold text-[#181113] dark:text-white mb-6">
                You might also like
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {products.slice(0, 4).map((product) => (
                  // STEP 4: Pass each product as props
                  <Link
                    to={`/product/${product.id}`}
                    key={product.id}
                    className="flex flex-col gap-3 group cursor-pointer"
                  >
                  <ProductCard
                    productz={product} // ← THIS passes ALL product data!
                  />
                  </Link>
                ))}
              </div>
 
              {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {similarProducts.map((p) => (
                  <Link
                    to={`/product/${p.id}`}
                    key={p.id}
                    className="flex flex-col gap-3 group cursor-pointer"
                  >
                    <div
                      className="w-full bg-center bg-no-repeat aspect-[3/4] bg-cover rounded-xl relative overflow-hidden"
                      style={{ backgroundImage: `url("${p.image}")` }}
                    >
                      <button className="absolute bottom-3 right-3 bg-white p-2 rounded-full shadow-md translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 text-primary">
                        <span className="material-symbols-outlined text-[20px]">
                          add_shopping_cart
                        </span>
                      </button>
                    </div>
                    <div className="flex flex-col">
                      <h4 className="text-[#181113] dark:text-white font-bold text-sm">
                        {p.name}
                      </h4>
                      <p className="text-[#89616f] text-sm">
                        ₦{p.price.toLocaleString()}
                      </p>
                    </div>
                  </Link>
                ))}
              </div> */}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default ProductDetails;
