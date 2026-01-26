import React, { useState } from "react";
import axios from "axios";

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "confirmPassword") {
      setConfirmPassword(value);
      if (formData.password && value !== formData.password) {
        setError("Passwords do not match");
      } else {
        setError("");
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });

      if (name === "password") {
        if (confirmPassword && value !== confirmPassword) {
          setError("Passwords do not match");
        } else {
          setError("");
        }
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError("");
    // console.log(formData);

    axios
      .post("http://localhost:3000/api/user/create", formData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    setFormData({
      name: "",
      email: "",
      phone: "",
      password: "",
    });

    setConfirmPassword("")
  };

  return (
    <div
      id="sign-up-form"
      className="animate-in fade-in slide-in-from-bottom-2 duration-300"
    >
      <div className="text-center mb-6">
        <h1 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
          Join the Verse
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
          Create your profile to unlock exclusive styles.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label
            className="block text-xs font-semibold text-slate-700 dark:text-slate-300 ml-1"
            htmlFor="name"
          >
            Full Name
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-slate-400 group-focus-within:text-primary transition-colors text-[20px]">
                person
              </span>
            </div>
            <input
              className="block w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-[#2a2a2b] border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none placeholder:text-slate-400 dark:text-white"
              id="name"
              placeholder="e.g. Maya Jenkins"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label
            className="block text-xs font-semibold text-slate-700 dark:text-slate-300 ml-1"
            htmlFor="signup-email"
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
              id="signup-email"
              placeholder="maya@example.com"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label
            className="block text-xs font-semibold text-slate-700 dark:text-slate-300 ml-1"
            htmlFor="signup-email"
          >
            Phone Number
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-slate-400 group-focus-within:text-primary transition-colors text-[20px]">
                phone
              </span>
            </div>
            <input
              className="block w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-[#2a2a2b] border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none placeholder:text-slate-400 dark:text-white"
              id="signup-phone"
              placeholder="+234 812 345 6789"
              type="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label
            className="block text-xs font-semibold text-slate-700 dark:text-slate-300 ml-1"
            htmlFor="signup-password"
          >
            Password
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-slate-400 group-focus-within:text-primary transition-colors text-[20px]">
                lock
              </span>
            </div>
            <input
              className="block w-full pl-11 pr-11 py-3 bg-slate-50 dark:bg-[#2a2a2b] border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none placeholder:text-slate-400 dark:text-white"
              id="signup-password"
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
        <div className="space-y-1.5">
          <label
            className="block text-xs font-semibold text-slate-700 dark:text-slate-300 ml-1"
            htmlFor="confirm-password"
          >
            Confirm Password
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-slate-400 group-focus-within:text-primary transition-colors text-[20px]">
                lock_reset
              </span>
            </div>
            <input
              className="block w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-[#2a2a2b] border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none placeholder:text-slate-400 dark:text-white"
              id="confirm-password"
              placeholder="••••••••"
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
            />
          </div>
          {error && <p className="text-red-500 text-xs mt-1 ml-1">{error}</p>}
        </div>
        <div className="flex items-start pt-2">
          <div className="flex h-5 items-center">
            <input
              className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary/25 bg-slate-50 dark:bg-[#2a2a2b] dark:border-slate-600"
              id="terms"
              type="checkbox"
            />
          </div>
          <div className="ml-3 text-xs">
            <label
              className="font-medium text-slate-600 dark:text-slate-400"
              htmlFor="terms"
            >
              I agree to the{" "}
              <a
                className="text-primary hover:text-primary-dark underline decoration-primary/30 underline-offset-2"
                href="#"
              >
                Terms
              </a>{" "}
              and{" "}
              <a
                className="text-primary hover:text-primary-dark underline decoration-primary/30 underline-offset-2"
                href="#"
              >
                Privacy Policy
              </a>
            </label>
          </div>
        </div>
        <button
          className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl text-sm font-bold text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary shadow-lg shadow-primary/30 hover:shadow-primary/40 transition-all duration-200 transform hover:-translate-y-0.5"
          type="submit"
        >
          <span className="absolute left-0 inset-y-0 flex items-center pl-3">
            <span className="material-symbols-outlined text-white/70 group-hover:text-white transition-colors text-[20px]">
              arrow_forward
            </span>
          </span>
          Create Account
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
