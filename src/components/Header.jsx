import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Header = ({ toggleDarkMode, darkMode }) => {
  const { getCartCount, cart } = useCart();
  const cartCount = getCartCount();

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-[#181113]/90 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
      <div className="px-4 md:px-10 py-3 max-w-7xl mx-auto w-full">
        <div className="flex items-center justify-between gap-4">
          {/* Logo & Links */}
          <div className="flex items-center gap-8">
            <a className="flex items-center gap-3 text-primary" href="#">
              <div className="size-8 flex items-center justify-center rounded-full bg-primary/10">
                <span className="material-symbols-outlined text-primary text-[24px]">
                  all_inclusive
                </span>
              </div>
              <h2 className="text-[#181113] dark:text-white text-xl font-extrabold tracking-tight">
                Xtensionsvrse
              </h2>
            </a>

            <nav className="hidden lg:flex items-center gap-8">
              <a
                className="text-[#181113] dark:text-gray-200 text-sm font-semibold hover:text-primary transition-colors"
                href="#"
              >
                Braids
              </a>
              <a
                className="text-[#181113] dark:text-gray-200 text-sm font-semibold hover:text-primary transition-colors"
                href="#"
              >
                Twists
              </a>
              <a
                className="text-[#181113] dark:text-gray-200 text-sm font-semibold hover:text-primary transition-colors"
                href="#"
              >
                Locs
              </a>
              <a
                className="text-[#181113] dark:text-gray-200 text-sm font-semibold hover:text-primary transition-colors"
                href="#"
              >
                New In
              </a>
              <a
                className="text-primary text-sm font-bold hover:opacity-80 transition-opacity"
                href="#"
              >
                Sale
              </a>
            </nav>
          </div>

          {/* Search & Actions */}
          <div className="flex flex-1 justify-end gap-4 md:gap-6 items-center">
            <div className="hidden md:flex flex-1 max-w-xs relative group">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">
                <span className="material-symbols-outlined text-[20px]">
                  search
                </span>
              </div>
              <input
                className="w-full bg-[#f4f0f2] dark:bg-gray-800 border-none rounded-xl py-2.5 pl-10 pr-4 text-sm font-medium focus:ring-2 focus:ring-primary/20 placeholder:text-gray-400 text-[#181113] dark:text-white transition-all"
                placeholder="Search styles..."
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={toggleDarkMode}
                className="flex items-center justify-center rounded-full size-10 hover:bg-gray-100 dark:hover:bg-gray-800 text-[#181113] dark:text-white transition-colors"
              >
                <span className="material-symbols-outlined">
                  {darkMode ? "light_mode" : "dark_mode"}
                </span>
              </button>

              <button className="flex items-center justify-center rounded-full size-10 hover:bg-gray-100 dark:hover:bg-gray-800 text-[#181113] dark:text-white transition-colors">
                <span className="material-symbols-outlined">
                  account_circle
                </span>
              </button>

              <Link
                to="/cart"
                className="flex items-center justify-center rounded-full size-10 hover:bg-gray-100 dark:hover:bg-gray-800 text-[#181113] dark:text-white transition-colors relative"
              >
                <span className="material-symbols-outlined">shopping_cart</span>
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 size-4 bg-primary rounded-full border border-white dark:border-[#181113] text-[10px] text-white flex items-center justify-center font-bold">
                    {cart.length}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
