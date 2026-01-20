import React from "react";

const AuthSocials = () => {
  return (
    <>
      <div className="relative my-8">
        <div aria-hidden="true" className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white dark:bg-[#232324] px-2 text-xs text-slate-400 uppercase tracking-wider font-medium">
            Or continue with
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <button
          className="flex items-center justify-center w-full px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-[#2a2a2b] hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors gap-2 group"
          type="button"
        >
          <svg
            aria-hidden="true"
            className="h-5 w-5 opacity-80 group-hover:opacity-100 transition-opacity"
            viewBox="0 0 24 24"
          >
            <path
              className="text-slate-900 dark:text-white"
              d="M12.0003 20.45c4.6667 0 8.0833-3.25 8.0833-8.1667 0-.75-.0833-1.4166-.1666-2.0833H12.0003v3.9167h4.6666c-.25 1.5833-1.6666 4.3333-4.6666 4.3333-2.75 0-5.0834-2.25-5.0834-5.0833s2.3334-5.0834 5.0834-5.0834c1.3333 0 2.5.5 3.3333 1.25l2.9167-2.9167C16.4169 4.6666 14.417 3.75 12.0003 3.75 7.4169 3.75 3.7503 7.4167 3.7503 12s3.6666 8.25 8.25 8.45"
              fill="currentColor"
            ></path>
          </svg>
          <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
            Google
          </span>
        </button>
        <button
          className="flex items-center justify-center w-full px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-[#2a2a2b] hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors gap-2 group"
          type="button"
        >
          <svg
            aria-hidden="true"
            className="h-5 w-5 opacity-80 group-hover:opacity-100 transition-opacity"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              className="text-slate-900 dark:text-white"
              d="M13.2,3.6c-0.3-1.6,1-3.1,2.6-3.6c0.3,1.7-0.9,3.2-2.6,3.6C13.2,3.6,13.2,3.6,13.2,3.6z M16.9,13.7c0-2.3,1.9-3.4,2-3.4 c-1.1-1.6-2.8-1.8-3.4-1.8c-1.4-0.1-2.8,0.8-3.5,0.8c-0.7,0-1.8-0.8-3-0.8c-1.5,0-2.9,0.9-3.7,2.3c-1.6,2.7-0.4,6.6,1.1,8.8 c0.7,1.1,1.6,2.3,2.7,2.2c1.1-0.1,1.5-0.7,2.8-0.7c1.3,0,1.7,0.7,2.8,0.7c1.1,0.1,1.9-1,2.6-2.2c0.8-1.2,1.1-2.4,1.1-2.5 C18.5,16.1,16.9,15.5,16.9,13.7z"
            ></path>
          </svg>
          <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
            Apple
          </span>
        </button>
      </div>
    </>
  );
};

export default AuthSocials;
