import React, { useState } from "react";

const SignInForm = () => {
    const [showPassword, setShowPassword] = useState(false);

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
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent page reload
        
        // You can add validation here
        if (!formData.email || !formData.password) {
            alert("Please fill in all fields");
            return;
        }
      
        console.log("Form submitted:", formData);
        
        // send to an API
        // fetch('/api/login', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(formData),
        // })
        // .then(response => response.json())
        // .then(data => console.log(data))
        // .catch(error => console.error('Error:', error));
        
        // Reset form after submission
        setFormData({ email: "", password: "" });
        console.log(formData)
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
              <span  className="material-symbols-outlined text-[20px]">
                {showPassword ? "visibility_off" : "visibility"}
              </span>
            </button>
          </div>
        </div>
        <button
          className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl text-sm font-bold text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary shadow-lg shadow-primary/30 hover:shadow-primary/40 transition-all duration-200 transform hover:-translate-y-0.5 mt-6"
          type="submit"
        >
          <span className="absolute left-0 inset-y-0 flex items-center pl-3">
            <span className="material-symbols-outlined text-white/70 group-hover:text-white transition-colors text-[20px]">
              login
            </span>
          </span>
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignInForm;
