import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login attempt:", { email, password, rememberMe });
    // TODO: Add backend login logic here
  };

  return (
    <div className="flex min-h-screen w-full overflow-hidden bg-background-light dark:bg-background-dark font-display text-[#181113] dark:text-white">
      {/* Left Side: Hero Image */}
      <div className="hidden lg:block relative w-1/2 bg-gray-100">
        <div
          className="absolute inset-0 h-full w-full bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAhux962Y65K9e4uyf553c45YsgqDrAEFqDhbNsOkCaNSvR9YHzljjUMEgGoVHeYwyisx8PsNScEVa-H_IBFpvAyZ9NmSKveTEgc8Kf1vw4O_6Pf6GCYvj0dtb0zrf5mF2Lj1-dlMMicYlc0bkJtu-XCUiKjMctYXmjb7jhZW3iJCed3xla-ZOiYFq4KN-ijXbzsf_d2ylnk9tpwEozeOb2RcWskQw78jPmo99RvWzSW3Aa8gSaiS52ijoIyNOWRe9KVciUviwjxcA')",
          }}
        ></div>
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
        <div className="absolute bottom-10 left-10 right-10 text-white">
          <blockquote className="text-2xl font-semibold leading-relaxed">
            "Empowering beauty through every strand."
          </blockquote>
          <p className="mt-4 text-sm font-medium opacity-80">
            Xtensionsverse Admin Portal v2.0
          </p>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="flex flex-1 flex-col justify-center items-center px-4 py-12 sm:px-6 lg:px-20 xl:px-24 bg-white dark:bg-background-dark">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          {/* Header / Logo Area */}
          <div className="flex flex-col items-center sm:items-start">
            <div className="mb-6 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <span className="material-symbols-outlined text-3xl">
                  local_florist
                </span>
              </div>
              <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                Xtensionsverse
              </span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Welcome Back
            </h1>
            <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
              Please enter your details to sign in.
            </p>
          </div>

          {/* Form Area */}
          <div className="mt-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@xtensionsverse.com"
                    className="block w-full rounded-xl border-0 py-3.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary dark:bg-gray-800 dark:text-white dark:ring-gray-700 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200"
                >
                  Password
                </label>
                <div className="relative mt-2">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full rounded-xl border-0 py-3.5 px-4 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary dark:bg-gray-800 dark:text-white dark:ring-gray-700 sm:text-sm sm:leading-6"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none"
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        {showPassword ? "visibility_off" : "visibility"}
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Additional Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary dark:bg-gray-800 dark:border-gray-600"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-900 dark:text-gray-300"
                  >
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-primary hover:text-primary/80 transition-colors"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-xl bg-primary px-3 py-3.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all duration-200"
                >
                  Sign in
                </button>
              </div>
            </form>

            {/* Divider */}
            <div className="mt-8">
              <div className="relative">
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm font-medium leading-6">
                  <span className="bg-white px-6 text-gray-900 dark:bg-background-dark dark:text-gray-400">
                    Or continue to
                  </span>
                </div>
              </div>

              <div className="mt-6 flex justify-center gap-4">
                <button
                  type="button"
                  onClick={() => navigate("/")}
                  className="text-sm font-medium text-gray-500 hover:text-primary transition-colors flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    storefront
                  </span>
                  Return to Store
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Footer */}
        <div className="mt-auto pt-10 text-center">
          <p className="text-xs text-gray-400 dark:text-gray-600">
            © 2023 Xtensionsverse Inc. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
