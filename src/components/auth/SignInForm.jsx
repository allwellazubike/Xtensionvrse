import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const SignInForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = {
      ...formData,
      [name]: value,
    };

    setFormData(updatedFormData);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    setError("");

    // You can add validation here
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setIsLoading(true);
      await login(formData.email, formData.password);
      const from = location.state?.from || "/dashboard";
      navigate(from);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          "Login failed. Please check your credentials.",
      );
    } finally {
      setIsLoading(false);
    }

    setFormData({ email: "", password: "" });
  };

  return (
    <div
      id="sign-in-form"
      className="animate-in fade-in slide-in-from-bottom-2 duration-300"
    >
      <div className="text-center mb-6">
        <h1 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
          Welcome Back
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
          Sign in to access your orders and wishlist.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label
            className="block text-xs font-semibold text-slate-700 dark:text-slate-300 ml-1"
            htmlFor="signin-email"
          >
            Email Address
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-slate-400 group-focus-within:text-primary transition-colors text-[20px]">
                mail
              </span>
            </div>
            <input
              className="block w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-[#2a2a2b] border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none placeholder:text-slate-400 dark:text-white"
              id="signin-email"
              placeholder="maya@example.com"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="space-y-1.5">
          <div className="flex justify-between items-center px-1">
            <label
              className="block text-xs font-semibold text-slate-700 dark:text-slate-300"
              htmlFor="signin-password"
            >
              Password
            </label>
            <a
              className="text-xs font-semibold text-primary hover:text-primary-dark"
              href="#"
            >
              Forgot?
            </a>
          </div>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-slate-400 group-focus-within:text-primary transition-colors text-[20px]">
                lock
              </span>
            </div>
            <input
              className="block w-full pl-11 pr-11 py-3 bg-slate-50 dark:bg-[#2a2a2b] border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none placeholder:text-slate-400 dark:text-white"
              id="signin-password"
              placeholder="••••••••"
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <button
              onClick={handleShowPassword}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">
                {showPassword ? "visibility_off" : "visibility"}
              </span>
            </button>
          </div>
        </div>
        <button
          className="group relative w-full flex justify-center items-center gap-2 py-3.5 px-4 border border-transparent rounded-xl text-sm font-bold text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary shadow-lg shadow-primary/30 hover:shadow-primary/40 transition-all duration-200 transform hover:-translate-y-0.5 mt-6 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Signing In...
            </>
          ) : (
            <>
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <span className="material-symbols-outlined text-white/70 group-hover:text-white transition-colors text-[20px]">login</span>
              </span>
              Sign In
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default SignInForm;
