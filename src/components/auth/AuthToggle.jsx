import React from "react";

const AuthToggle = ({ isSignUp, setIsSignUp }) => {
  return (
    <div className="relative flex bg-slate-100 dark:bg-black/20 rounded-xl p-1 mb-8 cursor-pointer select-none h-12">
      <div
        className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white dark:bg-[#232324] rounded-lg shadow-sm border border-slate-200/50 dark:border-white/10 transition-transform duration-300 ease-out z-0 ${
          !isSignUp ? "translate-x-full left-0" : "translate-x-0 left-1"
        }`}
        style={{
          left: isSignUp ? "4px" : "calc(50%)",
        }}
      ></div>
      <button
        onClick={() => setIsSignUp(true)}
        className={`flex-1 relative z-10 text-center text-sm font-bold transition-colors duration-300 flex items-center justify-center ${
          isSignUp
            ? "text-[#181113] dark:text-white"
            : "text-slate-500 hover:text-slate-700 dark:text-slate-400"
        }`}
      >
        Sign Up
      </button>
      <button
        onClick={() => setIsSignUp(false)}
        className={`flex-1 relative z-10 text-center text-sm font-bold transition-colors duration-300 flex items-center justify-center ${
          !isSignUp
            ? "text-primary dark:text-white"
            : "text-slate-500 hover:text-slate-700 dark:text-slate-400"
        }`}
      >
        Sign In
      </button>
    </div>
  );
};

export default AuthToggle;
