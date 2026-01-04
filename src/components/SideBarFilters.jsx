import { useState } from 'react';

const SidebarFilters = () => {
  const [selectedLength, setSelectedLength] = useState('20"');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });

  const handleLengthClick = (length) => {
    setSelectedLength(length);
  };

  const handlePriceChange = (field, value) => {
    setPriceRange(prev => ({ ...prev, [field]: value }));
  };

  return (
    <aside className="hidden lg:block w-64 shrink-0 px-6 py-8 border-r border-gray-100 dark:border-gray-800 sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto custom-scrollbar">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold">Filters</h3>
        <button className="text-xs font-semibold text-primary hover:text-primary/80">Clear All</button>
      </div>
      
      {/* Filter Section: Categories */}
      <div className="mb-8">
        <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">Categories</h4>
        <ul className="space-y-2">
          {['All Textures', 'Pre-Stretched', 'Crochet Braids', 'Human Hair Blend'].map((category) => (
            <li key={category}>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  className="form-checkbox rounded text-primary border-gray-300 focus:ring-primary/50" 
                  defaultChecked={category === 'All Textures'}
                />
                <span className="text-sm font-medium group-hover:text-primary transition-colors">{category}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Filter Section: Length */}
      <div className="mb-8">
        <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">Length</h4>
        <div className="flex flex-wrap gap-2">
          {['12"', '20"', '42"', '58"', '82"'].map((length) => (
            <button
              key={length}
              onClick={() => handleLengthClick(length)}
              className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
                selectedLength === length
                  ? 'border-primary bg-primary text-white'
                  : 'border-gray-200 dark:border-gray-700 text-slate-700 dark:text-gray-200 hover:border-primary hover:text-primary bg-white dark:bg-surface-dark'
              }`}
            >
              {length}
            </button>
          ))}
        </div>
      </div>
      
      {/* Filter Section: Color */}
      <div className="mb-8">
        <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">Color</h4>
        <div className="grid grid-cols-5 gap-2">
          {[
            { color: 'black', title: '1B - Off Black' },
            { color: '#4a3728', title: '4 - Dark Brown' },
            { color: '#8D4E2F', title: '30 - Auburn' },
            { color: '#5d1818', title: 'Burgundy' },
            { color: 'gradient-to-br from-black to-[#8D4E2F]', title: 'Ombre 1B/30' }
          ].map((colorOption) => (
            <button
              key={colorOption.title}
              className={`size-8 rounded-full ring-2 ring-transparent hover:ring-primary transition-all ${
                colorOption.color.includes('gradient')
                  ? `bg-${colorOption.color}`
                  : `bg-[${colorOption.color}]`
              }`}
              title={colorOption.title}
            />
          ))}
        </div>
      </div>
      
      {/* Filter Section: Price */}
      <div className="mb-8">
        <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">Price Range</h4>
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-500">$</span>
            <input
              value={priceRange.min}
              onChange={(e) => handlePriceChange('min', e.target.value)}
              className="w-full pl-6 pr-2 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent text-sm focus:ring-primary/50 focus:border-primary"
              placeholder="Min"
              type="number"
            />
          </div>
          <span className="text-slate-400">-</span>
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-500">$</span>
            <input
              value={priceRange.max}
              onChange={(e) => handlePriceChange('max', e.target.value)}
              className="w-full pl-6 pr-2 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent text-sm focus:ring-primary/50 focus:border-primary"
              placeholder="Max"
              type="number"
            />
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SidebarFilters;