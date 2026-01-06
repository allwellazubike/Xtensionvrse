import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import CartItem from "../components/CartItem";
import { Link } from "react-router-dom";
import { products } from "../data/products";

const Cart = ({ toggleDarkMode, darkMode }) => {
  const { cart, updateQuantity, removeFromCart, getCartTotal } = useCart();

  const subtotal = getCartTotal();
  // Using a flat shipping rate for now, or free if "Fast Shipping" logic implies it?
  // User asked for "Fast Shipping", standard ecommerce often charges.
  // Let's set a standard shipping of 2500 Naira if cart > 0, else 0.
  const shipping = subtotal > 0 ? 2500 : 0;
  const tax = subtotal * 0.05; // 5% tax estimate
  const total = subtotal + shipping + tax;

  // Filter out products already in cart for recommendations
  const recommendedProducts = products
    .filter((p) => !cart.find((c) => c.id === p.id))
    .slice(0, 4);

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? "dark" : ""}`}>
      <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col text-[#181113] dark:text-white">
        <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} />

        <main className="flex-1 w-full max-w-[1280px] mx-auto px-4 lg:px-10 py-6 lg:py-10">
          <h1 className="text-[#181113] dark:text-white tracking-tight text-3xl lg:text-[32px] font-bold leading-tight mb-8">
            Your Cart ({cart.length} Items)
          </h1>

          {cart.length === 0 ? (
            <div className="text-center py-20">
              <span className="material-symbols-outlined text-6xl text-gray-300 mb-4">
                remove_shopping_cart
              </span>
              <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
              <Link
                to="/products"
                className="inline-block bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-primary/90 transition-colors"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              {/* Left Column: Cart Items */}
              <div className="lg:col-span-8 flex flex-col gap-6">
                {cart.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeFromCart}
                  />
                ))}
              </div>

              {/* Right Column: Summary */}
              <div className="lg:col-span-4">
                <div className="sticky top-28 space-y-6">
                  <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-2xl shadow-sm border border-primary/10 dark:border-gray-800">
                    <h2 className="text-xl font-bold text-[#181113] dark:text-white mb-6">
                      Order Summary
                    </h2>
                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">
                          Subtotal
                        </span>
                        <span className="font-medium dark:text-white">
                          ₦{subtotal.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">
                          Shipping Estimate
                        </span>
                        <span className="font-medium dark:text-white">
                          ₦{shipping.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">
                          Tax
                        </span>
                        <span className="font-medium dark:text-white">
                          ₦{tax.toLocaleString()}
                        </span>
                      </div>
                      <div className="h-px bg-gray-100 dark:bg-gray-800 my-4"></div>
                      <div className="flex justify-between items-center">
                        <span className="text-base font-bold text-[#181113] dark:text-white">
                          Total
                        </span>
                        <span className="text-2xl font-bold text-primary">
                          ₦{total.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    {/* Promo Code */}
                    <div className="flex gap-2 mb-6">
                      <input
                        className="flex-1 bg-[#f4f0f2] dark:bg-gray-800 border-none rounded-xl px-4 text-sm focus:ring-1 focus:ring-primary dark:text-white placeholder:text-gray-400"
                        placeholder="Promo code"
                        type="text"
                      />
                      <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-xl text-sm font-bold transition-colors">
                        Apply
                      </button>
                    </div>
                    <button className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl py-4 font-bold text-lg shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 group">
                      Checkout Securely
                      <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform text-sm">
                        arrow_forward
                      </span>
                    </button>
                    <div className="mt-6 flex flex-col items-center gap-3">
                      <div className="flex gap-3 text-gray-400">
                        <span className="material-symbols-outlined">lock</span>
                        <span className="text-xs font-medium">
                          Secure Checkout with SSL Encryption
                        </span>
                      </div>
                      <div className="flex gap-2 opacity-60 grayscale hover:grayscale-0 transition-all">
                        <div className="h-6 w-10 bg-gray-200 rounded flex items-center justify-center text-[8px] font-bold text-blue-900">
                          VISA
                        </div>
                        <div className="h-6 w-10 bg-gray-200 rounded flex items-center justify-center text-[8px] font-bold text-red-600">
                          MC
                        </div>
                        <div className="h-6 w-10 bg-gray-200 rounded flex items-center justify-center text-[8px] font-bold text-blue-500">
                          AMEX
                        </div>
                        <div className="h-6 w-10 bg-gray-200 rounded flex items-center justify-center text-[8px] font-bold text-blue-700">
                          PAYPAL
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* You Might Also Like */}
          <div className="mt-16 border-t border-gray-100 dark:border-gray-800 pt-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#181113] dark:text-white">
                You Might Also Like
              </h2>
              <Link
                to="/products"
                className="text-primary font-bold text-sm hover:underline"
              >
                View All
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
              {recommendedProducts.map((p) => (
                <div key={p.id} className="group cursor-pointer">
                  <Link to={`/product/${p.id}`}>
                    <div className="aspect-[4/5] w-full rounded-2xl bg-gray-100 dark:bg-gray-800 overflow-hidden relative mb-3">
                      <div
                        className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                        style={{ backgroundImage: `url("${p.image}")` }}
                      ></div>
                      {/* Ideally we add an addToCart button here too in future, but linking to product is safer/user journey map */}
                    </div>
                    <h3 className="font-bold text-[#181113] dark:text-white group-hover:text-primary transition-colors">
                      {p.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      ₦{p.price.toLocaleString()}
                    </p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default Cart;
