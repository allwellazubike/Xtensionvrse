const FilterSidebar = ({
  isOpen,
  onClose,
  filters = { categories: [], lengths: [], priceRange: { min: "", max: "" } }, // Default structure
  setFilters,
  onApply,
  categories = [
    "French Curls",
    "Deep Twists",
    "Italian Curls",
    "Bone Straight",
    "Pre-stretched",
    "Faux Locs",
    "Kinky Coils",
    "Kanekalon",
    "Passion Twist",
    "Spring Twist",
  ],
}) => {
  const handleCategoryChange = (category) => {
    if (!setFilters) return;
    setFilters((prev) => {
      const currentCategories = prev.categories || [];
      const isSelected = currentCategories.includes(category);
      let newCategories;

      if (isSelected) {
        newCategories = currentCategories.filter((c) => c !== category);
      } else {
        newCategories = [...currentCategories, category];
      }

      return { ...prev, categories: newCategories };
    });
  };

  const handleLengthChange = (length) => {
    if (!setFilters) return;
    setFilters((prev) => {
      const currentLengths = prev.lengths || [];
      const isSelected = currentLengths.includes(length);
      let newLengths;

      if (isSelected) {
        newLengths = currentLengths.filter((l) => l !== length);
      } else {
        newLengths = [...currentLengths, length];
      }
      return { ...prev, lengths: newLengths };
    });
  };

  const handlePriceChange = (e, type) => {
    if (!setFilters) return;
    const value = e.target.value;
    setFilters((prev) => ({
      ...prev,
      priceRange: {
        ...(prev.priceRange || {}),
        [type]: value,
      },
    }));
  };

  const clearAll = () => {
    if (setFilters) {
      setFilters({
        categories: [],
        lengths: [],
        priceRange: { min: "", max: "" },
      });
    }
  };

  return (
    <>
      {/* mobile overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />
      )}

      <aside
        className={`
    fixed md:sticky top-0 md:top-20 z-50 md:z-auto h-dvh md:h-[calc(100vh-5rem)] 
    w-80 md:w-64 bg-white dark:bg-[#2d1b22] md:bg-white md:dark:bg-[#2d1b22]
    border-r border-gray-100 dark:border-gray-800 overflow-y-auto 
    transition-transform duration-300 ease-in-out
    ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
    left-0
  `}
      >
        <div className="p-6 md:px-6 md:py-8">
          {/* Mobile Header */}
          <div className="flex items-center justify-between mb-6 md:hidden">
            <h3 className="text-lg font-bold text-[#181113] dark:text-white">
              Filters
            </h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
              aria-label="Close filters"
            >
              <span className="material-symbols-outlined text-[#181113] dark:text-white">
                close
              </span>
            </button>
          </div>

          {/* Desktop Header */}
          <div className="hidden md:flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-[#181113] dark:text-white">
              Filters
            </h3>
            <button
              onClick={clearAll}
              className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
              aria-label="Clear all filters"
            >
              Clear All
            </button>
          </div>

          {/* filter section (categories)*/}
          <div className="mb-8">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
              Categories
            </h4>
            <ul className="space-y-2">
              {categories.map((cat, index) => {
                // Handle careful matching slightly robustly if needed, but strict string usually fine
                const isChecked = filters.categories
                  ? filters.categories.includes(cat)
                  : false;
                return (
                  <li key={index}>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleCategoryChange(cat)}
                        className="form-checkbox rounded text-primary border-gray-300 focus:ring-primary/50"
                      />
                      <span className="text-sm font-medium text-[#181113] dark:text-white group-hover:text-primary transition-colors">
                        {cat}
                      </span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Filter Section: Length */}
          <div className="mb-8">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
              Length
            </h4>
            <div className="flex flex-wrap gap-2">
              {['12"', '20"', '42"', '58"', '82"'].map((length) => {
                const isSelected = filters.lengths
                  ? filters.lengths.includes(length)
                  : false;
                return (
                  <button
                    key={length}
                    onClick={() => handleLengthChange(length)}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
                      isSelected
                        ? "border-primary bg-primary text-white"
                        : "border-gray-200 dark:border-gray-700 bg-white dark:bg-[#2d1b22] text-[#181113] dark:text-white hover:border-primary hover:text-primary"
                    }`}
                  >
                    {length}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Filter Section: Price */}
          <div className="mb-8">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
              Price Range
            </h4>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-500">
                  ₦
                </span>
                <input
                  className="w-full pl-6 pr-2 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent text-sm text-[#181113] dark:text-white focus:ring-primary/50 focus:border-primary outline-none"
                  placeholder="Min"
                  type="number"
                  value={filters.priceRange?.min || ""}
                  onChange={(e) => handlePriceChange(e, "min")}
                />
              </div>
              <span className="text-slate-400">-</span>
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-500">
                  ₦
                </span>
                <input
                  className="w-full pl-6 pr-2 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent text-sm text-[#181113] dark:text-white focus:ring-primary/50 focus:border-primary outline-none"
                  placeholder="Max"
                  type="number"
                  value={filters.priceRange?.max || ""}
                  onChange={(e) => handlePriceChange(e, "max")}
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
            <button
              onClick={() => {
                if (onApply) onApply();
                onClose();
              }}
              className="w-full py-3 bg-[#181113] dark:bg-primary text-white rounded-xl font-bold text-sm shadow-lg hover:opacity-90 transition-all"
            >
              Apply Filters
            </button>
            <button
              onClick={clearAll}
              className="w-full py-3 mt-2 text-[#181113] dark:text-white font-bold text-sm hover:text-primary transition-all md:hidden"
            >
              Clear All
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default FilterSidebar;
