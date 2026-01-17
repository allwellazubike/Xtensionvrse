import React , { useEffect } from "react";
import { useProducts } from "../../context/ProductContext";

const ProductTable = () => {
  const { products } = useProducts();
  // console.log(products[1].name)

  useEffect(() => {
    if (products.length > 0) {
      console.log(products[1].name)
    }
  }, [products])

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
        {/* <div className="text-sm text-[#89616f] dark:text-white/50">
          Showing{" "}
          <span className="font-bold text-[#181113] dark:text-white">1-5</span>{" "}
          of{" "}
          <span className="font-bold text-[#181113] dark:text-white">128</span>{" "}
          products
        </div> */}
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
                Product ID
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


            {
            products.map((product) => {
              return (
                <tr className="hover:bg-[#fbf9fa] dark:hover:bg-white/5 transition-colors group">
              <td className="px-6 py-4">
                <div
                  className="size-12 rounded-lg bg-cover bg-center shadow-sm"
                  data-alt="Close up of silky black braiding hair"
                  style={{
                    backgroundImage:
                    `url("${product.image}")`,
                      // 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuByRyWN4yodIiHzmbISB8wz03H-t4Yxp0RAHRvlCdP4JMZ14Rm8rmoDR2x7GD9Hmejhp6GkUKA3zQd8nJgh59NTozDpvXAKSkPb5VTqFYOHOIVGWWx8OQQeL2YupTpAExX6IjD619YVeGoD-8-HcowzTVlzVqkRXsG4UmO--Yi2f56VQjUX0qGFnzSgvrOayfc9DqVHvjKNGKZ9tCzNaeI9Kpchv4eMVAwRaksFi-BiklnwRSh4FBYDtNp6Njo42sg_ncCUifiDmVs")',
                  }}
                ></div>
              </td>
              <td className="px-6 py-4">
                <p className="text-sm font-semibold text-[#181113] dark:text-white">
                  {product.name}
                </p>
                <p className="text-xs text-[#89616f] dark:text-white/50">
                  {product.size} • {product.material}
                </p>
              </td>
              <td className="px-6 py-4 text-sm text-[#5d4a51] dark:text-white/70">
                {product.id}
              </td>
              <td className="px-6 py-4">
                <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                  <span className="size-1.5 rounded-full bg-green-500 mr-1.5"></span>
                  {product.stock} in stock
                </div>
              </td>
              <td className="px-6 py-4 text-sm font-medium text-[#181113] dark:text-white">
                ₦{product.price}
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
              );
            })
            }
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
