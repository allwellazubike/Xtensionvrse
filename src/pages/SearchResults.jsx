import { useState } from 'react';
import FilterSidebar from './FilterSidebar';
import MobileCategoriesBar from './MobileCategoriesBar';
import ProductCard from './ProductCard';

const SearchResultsPage = () => {
  const [sortOpen, setSortOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="max-w-[1440px] mx-auto flex min-h-screen">
      {/* Desktop Sidebar Filters */}
      <FilterSidebar showFilters={showFilters} setShowFilters={setShowFilters} />
      
      {/* Main Content Area */}
      <main className="flex-1 w-full min-w-0 pb-20">
        {/* Hero Banner */}
        <div className="px-4 md:px-6 lg:px-8 py-6">
          <div className="relative w-full rounded-2xl overflow-hidden min-h-[220px] md:min-h-[280px] flex items-center bg-gray-900 group">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
              style={{ 
                backgroundImage: `url("https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=2874")` 
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
            <div className="relative z-10 p-6 md:p-10 max-w-xl">
              <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-widest text-white uppercase bg-primary rounded-full">
                New Arrivals
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                Premium Braiding Hair
              </h2>
              <p className="text-gray-200 text-sm md:text-base mb-6 max-w-md">
                Discover the softest, longest-lasting textures for your next protective style. Tangle-free and lightweight.
              </p>
              <button className="px-6 py-3 bg-white text-slate-900 rounded-xl font-bold text-sm hover:bg-gray-100 transition-colors">
                Shop Collection
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Categories */}
        <MobileCategoriesBar />
        
        {/* Sort & Count Row */}
        <div className="px-4 md:px-6 lg:px-8 py-4 flex items-center justify-between">
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
            Showing <span className="text-slate-900 dark:text-white font-bold">124</span> results
          </p>
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-500 hidden sm:inline">Sort by:</span>
            <div className="relative group">
              <button 
                onClick={() => setSortOpen(!sortOpen)}
                className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 pl-3 pr-2 py-1.5 rounded-lg hover:border-primary/50 transition-colors"
              >
                Recommended
                <span className="material-symbols-outlined text-[18px]">expand_more</span>
              </button>
              {sortOpen && (
                <div className="absolute right-0 mt-1 w-48 bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10">
                  <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800">Price: Low to High</button>
                  <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800">Price: High to Low</button>
                  <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800">Best Selling</button>
                  <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800">Newest</button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Product Grid - Reusing your existing ProductCard */}
        <div className="px-4 md:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          <ProductCard />
        </div>

        {/* Load More */}
        <div className="mt-12 flex justify-center pb-8">
          <button className="px-8 py-3 bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 text-slate-900 dark:text-white font-bold rounded-xl hover:border-primary hover:text-primary transition-all">
            Load More Products
          </button>
        </div>
      </main>

      {/* Mobile Floating Filter Button */}
      <div className="fixed bottom-6 right-6 lg:hidden z-40">
        <button 
          onClick={() => setShowFilters(true)}
          className="flex items-center gap-2 h-12 px-5 bg-primary text-white rounded-full shadow-lg shadow-primary/40 hover:bg-primary/90 hover:scale-105 transition-all"
        >
          <span className="material-symbols-outlined">filter_list</span>
          <span className="font-bold text-sm">Filter</span>
        </button>
      </div>
    </div>
  );
};

export default SearchResultsPage;