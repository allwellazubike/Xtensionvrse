

const Newsletter = () => {
  return (
    <div className="flex justify-center py-10">
      <div className="flex flex-col items-center gap-6 max-w-2xl text-center w-full">
        <div className="p-3 bg-primary/10 rounded-full text-primary">
          <span className="material-symbols-outlined text-3xl">mail</span>
        </div>
        
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold text-[#181113] dark:text-white">Join the Verse</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Subscribe for exclusive drops, braiding tutorials, and 15% off your first order.
          </p>
        </div>
        
        <form className="flex w-full max-w-md gap-3 flex-col sm:flex-row">
          <input 
            className="flex-1 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 py-3 px-4 focus:ring-primary focus:border-primary outline-none"
            placeholder="Enter your email" 
            type="email"
          />
          <button 
            className="bg-[#181113] dark:bg-white text-white dark:text-[#181113] px-6 py-3 rounded-xl font-bold hover:opacity-90 transition-opacity"
            type="button"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default Newsletter;