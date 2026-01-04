import { useState } from 'react';

const MobileCategoriesBar = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = [
    { id: 'all', name: 'All', icon: 'grid_view' },
    { id: 'pre-stretched', name: 'Pre-stretched' },
    { id: 'kanekalon', name: 'Kanekalon' },
    { id: 'passion-twist', name: 'Passion Twist' },
    { id: 'locs', name: 'Locs' },
    { id: 'spring-twist', name: 'Spring Twist' }
  ];

  return (
    <div className="sticky top-16 z-30 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm px-4 md:px-6 lg:px-8 py-3 border-b border-gray-100 dark:border-gray-800">
      <div className="flex items-center gap-3 overflow-x-auto hide-scrollbar pb-1">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeCategory === category.id
                ? 'bg-primary text-white font-semibold shadow-md shadow-primary/20'
                : 'bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 text-slate-700 dark:text-gray-200 hover:border-primary hover:text-primary'
            }`}
          >
            {category.icon && (
              <span className="material-symbols-outlined text-[18px]">{category.icon}</span>
            )}
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MobileCategoriesBar;