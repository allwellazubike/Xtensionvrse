const FilterSidebar = ({ isOpen, onClose }) => {
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
              className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
              aria-label="Clear all filters"
            >
              Clear All
            </button>
          </div>

          {/* Filter sections remain the same */}
          {/* ... */}
          {/* Filter Section: Categories */}
          <div className="mb-8">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
              Categories
            </h4>
            <ul className="space-y-2">
              {[
                { label: "All Textures", checked: true },
                { label: "Pre-Stretched", checked: false },
                { label: "Crochet Braids", checked: false },
                { label: "Human Hair Blend", checked: false },
              ].map((item, index) => (
                <li key={index}>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      defaultChecked={item.checked}
                      className="form-checkbox rounded text-primary border-gray-300 focus:ring-primary/50"
                    />
                    <span className="text-sm font-medium text-[#181113] dark:text-white group-hover:text-primary transition-colors">
                      {item.label}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </div>

          {/* Filter Section: Length */}
          <div className="mb-8">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
              Length
            </h4>
            <div className="flex flex-wrap gap-2">
              {['12"', '20"', '42"', '58"', '82"'].map((length) => (
                <button
                  key={length}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
                    length === '20"'
                      ? "border-primary bg-primary text-white"
                      : "border-gray-200 dark:border-gray-700 bg-white dark:bg-[#2d1b22] text-[#181113] dark:text-white hover:border-primary hover:text-primary"
                  }`}
                >
                  {length}
                </button>
              ))}
            </div>
          </div>

          {/* Filter Section: Color */}
          <div className="mb-8">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
              Color
            </h4>
            <div className="grid grid-cols-5 gap-2">
              {[
                { color: "bg-black", title: "1B - Off Black" },
                { color: "bg-[#4a3728]", title: "4 - Dark Brown" },
                { color: "bg-[#8D4E2F]", title: "30 - Auburn" },
                { color: "bg-[#5d1818]", title: "Burgundy" },
                {
                  color: "bg-gradient-to-br from-black to-[#8D4E2F]",
                  title: "Ombre 1B/30",
                },
              ].map((item, index) => (
                <button
                  key={index}
                  className={`size-8 rounded-full ${item.color} ring-2 ring-transparent hover:ring-primary transition-all`}
                  title={item.title}
                />
              ))}
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
                />
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default FilterSidebar;
