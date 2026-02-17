import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import AuthToggle from "../components/auth/AuthToggle";
import SignUpForm from "../components/auth/SignUpForm";
import SignInForm from "../components/auth/SignInForm";
import AuthSocials from "../components/auth/AuthSocials";

const Authentication = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const location = useLocation();
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (location.state?.message) {
      setMessage(location.state.message);
      setIsSignUp(false); // Default to sign in if there's a message (usually from protected route)
    }
  }, [location.state]);

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-center items-center p-4 lg:p-8 overflow-hidden bg-gradient-to-b from-pink-50 via-white to-white dark:from-surface-dark dark:to-background-dark font-display text-slate-900 dark:text-white antialiased selection:bg-primary/20 selection:text-primary">
      <div className="absolute inset-0 pointer-events-none bg-subtle-pattern opacity-30 dark:opacity-5"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>

      <main className="relative z-10 w-full max-w-[440px] flex flex-col gap-6 auth-card">
        {/* Header/Logo */}
        <div className="flex flex-col items-center text-center space-y-2 mb-2">
          <Link to="/">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/30 mb-2 rotate-3 hover:rotate-0 transition-transform duration-300">
              <span className="material-symbols-outlined text-white text-2xl">
                local_florist
              </span>
            </div>
          </Link>
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Xtensionsvrse
          </h2>
        </div>

        {message && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Notice: </strong>
            <span className="block sm:inline">{message}</span>
          </div>
        )}

        {/* Card */}
        <div className="bg-white dark:bg-[#232324] rounded-2xl shadow-soft p-6 sm:p-8 border border-slate-100 dark:border-white/5 backdrop-blur-sm">
          {/* Toggle Switch */}
          <AuthToggle isSignUp={isSignUp} setIsSignUp={setIsSignUp} />

          {/* Forms */}
          {isSignUp ? <SignUpForm /> : <SignInForm />}

          {/* Social Auth */}
          <AuthSocials />
        </div>

        <div className="text-center">
          <p className="text-xs text-slate-400 dark:text-slate-500">
            © 2024 Xtensionsverse Inc.
          </p>
        </div>
      </main>

      <style jsx>{`
        .bg-subtle-pattern {
          background-image: radial-gradient(#ee2b6c 0.5px, transparent 0.5px);
          background-size: 20px 20px;
        }
      `}</style>
    </div>
  );
};

export default Authentication;
