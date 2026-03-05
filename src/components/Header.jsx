import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import Icon from "./ui/Icon";

const Header = ({ toggleDarkMode, darkMode }) => {
  const { getCartCount, cart } = useCart();
  const { userInfo, logout } = useAuth();
  const cartCount = getCartCount();
  const [searchQuery, setSearchQuery] = useState("");
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const navigate = useNavigate();

  // Handle clicking outside to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-[#181113]/90 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
      <div className="px-4 md:px-10 py-3 max-w-7xl mx-auto w-full">
        <div className="flex items-center justify-between gap-4">
          {/* Logo & Links */}
          <div className="flex items-center gap-8">
            <Link className="flex items-center gap-3 text-primary" to="/">
              <Icon />
              <h2 className="text-[#181113] dark:text-white text-xl font-extrabold tracking-tight">
                Xtensionsvrse
              </h2>
            </Link>

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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
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

              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center justify-center rounded-full size-10 hover:bg-gray-100 dark:hover:bg-gray-800 text-[#181113] dark:text-white transition-colors focus:outline-none"
                  title="Account"
                >
                  <span className="material-symbols-outlined">
                    account_circle
                  </span>
                </button>

                {/* Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-3 w-64 bg-white/90 dark:bg-[#181113]/90 backdrop-blur-xl border border-gray-100 dark:border-gray-800 rounded-2xl shadow-2xl py-2 z-50 transform origin-top-right transition-all duration-200">
                    {!userInfo ? (
                      // Unauthenticated View
                      <div className="px-4 py-3 flex flex-col gap-3">
                        <div className="mb-2">
                          <p className="text-sm font-bold text-gray-900 dark:text-white">
                            Welcome
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Sign in for a faster checkout.
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            setIsUserMenuOpen(false);
                            navigate("/auth", { state: { isLogin: true } });
                          }}
                          className="w-full py-2 bg-primary text-white text-sm font-bold rounded-xl shadow-md shadow-primary/20 hover:-translate-y-0.5 transition-all"
                        >
                          Sign In
                        </button>
                        <button
                          onClick={() => {
                            setIsUserMenuOpen(false);
                            navigate("/auth", { state: { isLogin: false } });
                          }}
                          className="w-full py-2 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-sm font-bold rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                          Create Account
                        </button>
                      </div>
                    ) : (
                      // Authenticated View
                      <div className="flex flex-col">
                        <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
                          <p className="text-sm font-bold text-gray-900 dark:text-white">
                            Hi, {userInfo.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                            {userInfo.email}
                          </p>
                        </div>
                        <div className="p-2 space-y-1">
                          <Link
                            to="/dashboard"
                            onClick={() => setIsUserMenuOpen(false)}
                            className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors font-medium"
                          >
                            <span className="material-symbols-outlined text-[20px]">
                              dashboard
                            </span>
                            Dashboard
                          </Link>
                          <button
                            onClick={async () => {
                              setIsUserMenuOpen(false);
                              await logout();
                              navigate("/");
                            }}
                            className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors font-bold"
                          >
                            <span className="material-symbols-outlined text-[20px]">
                              logout
                            </span>
                            Sign Out
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

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
