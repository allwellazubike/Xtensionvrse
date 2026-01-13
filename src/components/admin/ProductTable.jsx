import React from "react";

const ProductTable = () => {
  return (
    <div className="flex-1 flex flex-col min-w-0 bg-white dark:bg-[#2d1b22] rounded-2xl border border-[#e6dbdf] dark:border-[#4a2e36] shadow-sm overflow-hidden">
      {/* Table Actions Toolbar */}
      <div className="p-4 border-b border-[#e6dbdf] dark:border-[#4a2e36] flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-background-light dark:bg-white/5 rounded-lg text-sm font-medium text-[#181113] dark:text-white hover:bg-[#eaddd6] dark:hover:bg-white/10 transition-colors">
            <span className="material-symbols-outlined text-lg">
              filter_list
            </span>
            Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-background-light dark:bg-white/5 rounded-lg text-sm font-medium text-[#181113] dark:text-white hover:bg-[#eaddd6] dark:hover:bg-white/10 transition-colors">
            <span className="material-symbols-outlined text-lg">sort</span>
            Sort
          </button>
        </div>
        <div className="text-sm text-[#89616f] dark:text-white/50">
          Showing{" "}
          <span className="font-bold text-[#181113] dark:text-white">1-5</span>{" "}
          of{" "}
          <span className="font-bold text-[#181113] dark:text-white">128</span>{" "}
          products
        </div>
      </div>
      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#fcfbfb] dark:bg-white/5 sticky top-0 z-10">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-[#89616f] dark:text-white/60 uppercase tracking-wider w-16">
                Image
              </th>
              <th className="px-6 py-4 text-xs font-bold text-[#89616f] dark:text-white/60 uppercase tracking-wider">
                Product Name
              </th>
              <th className="px-6 py-4 text-xs font-bold text-[#89616f] dark:text-white/60 uppercase tracking-wider">
                Stock ID
              </th>
              <th className="px-6 py-4 text-xs font-bold text-[#89616f] dark:text-white/60 uppercase tracking-wider">
                Stock
              </th>
              <th className="px-6 py-4 text-xs font-bold text-[#89616f] dark:text-white/60 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-4 text-xs font-bold text-[#89616f] dark:text-white/60 uppercase tracking-wider text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e6dbdf] dark:divide-[#4a2e36]">
            {/* Row 1 */}
            <tr className="hover:bg-[#fbf9fa] dark:hover:bg-white/5 transition-colors group">
              <td className="px-6 py-4">
                <div
                  className="size-12 rounded-lg bg-cover bg-center shadow-sm"
                  data-alt="Close up of silky black braiding hair"
                  style={{
                    backgroundImage:
                      'url("https://lh3.googleusercontent.com/aida-public/AB6AXuByRyWN4yodIiHzmbISB8wz03H-t4Yxp0RAHRvlCdP4JMZ14Rm8rmoDR2x7GD9Hmejhp6GkUKA3zQd8nJgh59NTozDpvXAKSkPb5VTqFYOHOIVGWWx8OQQeL2YupTpAExX6IjD619YVeGoD-8-HcowzTVlzVqkRXsG4UmO--Yi2f56VQjUX0qGFnzSgvrOayfc9DqVHvjKNGKZ9tCzNaeI9Kpchv4eMVAwRaksFi-BiklnwRSh4FBYDtNp6Njo42sg_ncCUifiDmVs")',
                  }}
                ></div>
              </td>
              <td className="px-6 py-4">
                <p className="text-sm font-semibold text-[#181113] dark:text-white">
                  Silky Straight Braid
                </p>
                <p className="text-xs text-[#89616f] dark:text-white/50">
                  24 inches • Synthetic
                </p>
              </td>
              <td className="px-6 py-4 text-sm text-[#5d4a51] dark:text-white/70">
                XTV-001-BLK
              </td>
              <td className="px-6 py-4">
                <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                  <span className="size-1.5 rounded-full bg-green-500 mr-1.5"></span>
                  125 in stock
                </div>
              </td>
              <td className="px-6 py-4 text-sm font-medium text-[#181113] dark:text-white">
                $18.00
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    className="p-1.5 text-[#89616f] hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      edit
                    </span>
                  </button>
                  <button
                    className="p-1.5 text-[#89616f] hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      delete
                    </span>
                  </button>
                </div>
              </td>
            </tr>
            {/* Row 2 */}
            <tr className="hover:bg-[#fbf9fa] dark:hover:bg-white/5 transition-colors group">
              <td className="px-6 py-4">
                <div
                  className="size-12 rounded-lg bg-cover bg-center shadow-sm"
                  data-alt="Ombre wavy hair extensions texture"
                  style={{
                    backgroundImage:
                      'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDjRJiAl60yw_yGGG1aIAsP-KwJAowJ8a2e9-5-2vwAuY45wpLZUwtagaW6mXUAS7eNo53lkTsCqGn5YrZapxoZ7MivqedcrT9sWnrid6Lg8G8z63_twQasxskIWbY3laqZeioTPhuKScdl-TrDe0Loiqv0ubYlI_49-kNqpa6C_EFN1Ds-sbVpcSQDGFWs4Ojb9Z8mRs2wmF9b29KBztVUhmJWrUaRIru0_tF4msDgkW47XdJz6GMK0zAEpxJivAEKE92TBZnrGv4")',
                  }}
                ></div>
              </td>
              <td className="px-6 py-4">
                <p className="text-sm font-semibold text-[#181113] dark:text-white">
                  Ombre Wave
                </p>
                <p className="text-xs text-[#89616f] dark:text-white/50">
                  20 inches • Ombre 1B/30
                </p>
              </td>
              <td className="px-6 py-4 text-sm text-[#5d4a51] dark:text-white/70">
                XTV-002-OMB
              </td>
              <td className="px-6 py-4">
                <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-300">
                  <span className="size-1.5 rounded-full bg-primary mr-1.5"></span>
                  12 (Low Stock)
                </div>
              </td>
              <td className="px-6 py-4 text-sm font-medium text-[#181113] dark:text-white">
                $22.00
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-1.5 text-[#89616f] hover:text-primary hover:bg-primary/10 rounded-lg transition-colors">
                    <span className="material-symbols-outlined text-[20px]">
                      edit
                    </span>
                  </button>
                  <button className="p-1.5 text-[#89616f] hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                    <span className="material-symbols-outlined text-[20px]">
                      delete
                    </span>
                  </button>
                </div>
              </td>
            </tr>
            {/* Row 3 */}
            <tr className="hover:bg-[#fbf9fa] dark:hover:bg-white/5 transition-colors group">
              <td className="px-6 py-4">
                <div
                  className="size-12 rounded-lg bg-cover bg-center shadow-sm"
                  data-alt="Deep twist texture hair close up"
                  style={{
                    backgroundImage:
                      'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD0-5EY3FIOzUjdijzqbYcOLUvFK-xKYrM3pGb8qNmN3drN0FlJWafK0kTityi3-sdXSeL42bFLwAtSayYyo3jmvBxFdEqCxrMksS80mLkcw75rqwnt7BbY3JWVzAljukGn7IqEtRh_J5njLQUI-KMG3E4g257_244OtKgBwdYhrZAi9C2k8tTBEZHpP7_ZPEKyztwhs-hB8Sqz550Ff1-Fk9DKRo_WoCUjyj6eRsMaU79bv54_8lQmPBk6SNV0N1UoFOiepf7UPVQ")',
                  }}
                ></div>
              </td>
              <td className="px-6 py-4">
                <p className="text-sm font-semibold text-[#181113] dark:text-white">
                  Deep Twist
                </p>
                <p className="text-xs text-[#89616f] dark:text-white/50">
                  18 inches • Burgundy
                </p>
              </td>
              <td className="px-6 py-4 text-sm text-[#5d4a51] dark:text-white/70">
                XTV-003-BUR
              </td>
              <td className="px-6 py-4">
                <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 dark:bg-white/10 dark:text-gray-400">
                  <span className="size-1.5 rounded-full bg-gray-400 mr-1.5"></span>
                  0 (Out of Stock)
                </div>
              </td>
              <td className="px-6 py-4 text-sm font-medium text-[#181113] dark:text-white">
                $20.00
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-1.5 text-[#89616f] hover:text-primary hover:bg-primary/10 rounded-lg transition-colors">
                    <span className="material-symbols-outlined text-[20px]">
                      edit
                    </span>
                  </button>
                  <button className="p-1.5 text-[#89616f] hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                    <span className="material-symbols-outlined text-[20px]">
                      delete
                    </span>
                  </button>
                </div>
              </td>
            </tr>
            {/* Row 4 */}
            <tr className="hover:bg-[#fbf9fa] dark:hover:bg-white/5 transition-colors group">
              <td className="px-6 py-4">
                <div
                  className="size-12 rounded-lg bg-cover bg-center shadow-sm"
                  data-alt="Pre stretched blonde hair bundle"
                  style={{
                    backgroundImage:
                      'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB65UxVOFXGNW1Y5gYx7HOTd6FNL0HOpUkeH2YCMe6IR1jInlMHn2G3yzEdsVwwE1rN2t1vd-qBb0YzVSvZfhcV9XWHhhVXnHxF8HD7AGqe_3gVgijFoZEO6KSxp96Hmotx97Ph73Wp7ak0Uxe4yhEpJJRonfMLIF-LZ6uw5i_N1G6ccfMItuMZubOq-aoLf1Oh7e-IWeyu22iJ6qcJhcru3Cq9DuT6xPQFazID_WbAsailTD7jV9Q2Y_V8cro7uj9JzQPVuEKADl0")',
                  }}
                ></div>
              </td>
              <td className="px-6 py-4">
                <p className="text-sm font-semibold text-[#181113] dark:text-white">
                  Pre-Stretched Blonde
                </p>
                <p className="text-xs text-[#89616f] dark:text-white/50">
                  26 inches • #613
                </p>
              </td>
              <td className="px-6 py-4 text-sm text-[#5d4a51] dark:text-white/70">
                XTV-004-BLD
              </td>
              <td className="px-6 py-4">
                <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                  <span className="size-1.5 rounded-full bg-green-500 mr-1.5"></span>
                  340 in stock
                </div>
              </td>
              <td className="px-6 py-4 text-sm font-medium text-[#181113] dark:text-white">
                $15.00
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-1.5 text-[#89616f] hover:text-primary hover:bg-primary/10 rounded-lg transition-colors">
                    <span className="material-symbols-outlined text-[20px]">
                      edit
                    </span>
                  </button>
                  <button className="p-1.5 text-[#89616f] hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                    <span className="material-symbols-outlined text-[20px]">
                      delete
                    </span>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="p-4 border-t border-[#e6dbdf] dark:border-[#4a2e36] flex items-center justify-between">
        <button className="px-4 py-2 border border-[#e6dbdf] dark:border-[#4a2e36] rounded-lg text-sm font-medium text-[#5d4a51] dark:text-white/70 hover:bg-[#f4f0f2] dark:hover:bg-white/5 disabled:opacity-50">
          Previous
        </button>
        <div className="flex gap-1">
          <button className="size-8 flex items-center justify-center rounded-lg bg-primary text-white text-sm font-medium">
            1
          </button>
          <button className="size-8 flex items-center justify-center rounded-lg hover:bg-[#f4f0f2] dark:hover:bg-white/5 text-[#5d4a51] dark:text-white/70 text-sm font-medium">
            2
          </button>
          <button className="size-8 flex items-center justify-center rounded-lg hover:bg-[#f4f0f2] dark:hover:bg-white/5 text-[#5d4a51] dark:text-white/70 text-sm font-medium">
            3
          </button>
        </div>
        <button className="px-4 py-2 border border-[#e6dbdf] dark:border-[#4a2e36] rounded-lg text-sm font-medium text-[#5d4a51] dark:text-white/70 hover:bg-[#f4f0f2] dark:hover:bg-white/5">
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductTable;
