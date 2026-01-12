import React, { useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import Header from "../../components/admin/Header";

const AddProduct = () => {
  const [isOnSale, setIsOnSale] = useState(false);

  return (
    <AdminLayout>
      <Header />
      <div className="flex-1 overflow-y-auto p-6 md:p-8">
        <div className="max-w-5xl mx-auto pb-10">
          <form
            className="flex flex-col gap-6"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="bg-white dark:bg-[#2d1b22] p-6 rounded-2xl shadow-sm border border-[#e6dbdf] dark:border-[#4a2e36]">
              <h3 className="text-lg font-bold text-[#181113] dark:text-white mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">
                  edit_note
                </span>
                Basic Information
              </h3>
              <div className="grid gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-[#5d4a51] dark:text-white/80">
                    Product Name
                  </label>
                  <input
                    className="w-full border px-4 rounded-xl border-[#e6dbdf] dark:border-[#4a2e36] bg-[#fcfbfb] dark:bg-white/5 text-[#181113] dark:text-white placeholder-[#89616f]/50 text-sm focus:border-primary focus:ring-primary py-3"
                    placeholder='e.g. Silky Straight 24" Braid'
                    type="text"
                    name="productName"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-[#5d4a51] dark:text-white/80">
                    Description
                  </label>
                  <div className="border border-[#e6dbdf] dark:border-[#4a2e36] rounded-xl overflow-hidden focus-within:ring-1 focus-within:ring-primary focus-within:border-primary transition-all bg-[#fcfbfb] dark:bg-white/5">
                    {/* <div className="bg-[#f8f6f6] dark:bg-white/5 border-b border-[#e6dbdf] dark:border-[#4a2e36] px-3 py-2 flex gap-1">
                      <button
                        className="p-1.5 hover:bg-black/5 dark:hover:bg-white/10 rounded text-[#5d4a51] dark:text-white/70"
                        title="Bold"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          format_bold
                        </span>
                      </button>
                      <button
                        className="p-1.5 hover:bg-black/5 dark:hover:bg-white/10 rounded text-[#5d4a51] dark:text-white/70"
                        title="Italic"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          format_italic
                        </span>
                      </button>
                      <button
                        className="p-1.5 hover:bg-black/5 dark:hover:bg-white/10 rounded text-[#5d4a51] dark:text-white/70"
                        title="Underline"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          format_underlined
                        </span>
                      </button>
                      <div className="w-px h-6 bg-[#e6dbdf] dark:bg-white/10 mx-1"></div>
                      <button
                        className="p-1.5 hover:bg-black/5 dark:hover:bg-white/10 rounded text-[#5d4a51] dark:text-white/70"
                        title="List"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          format_list_bulleted
                        </span>
                      </button>
                      <button
                        className="p-1.5 hover:bg-black/5 dark:hover:bg-white/10 rounded text-[#5d4a51] dark:text-white/70"
                        title="Ordered List"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          format_list_numbered
                        </span>
                      </button>
                    </div> */}
                    <textarea
                      className="w-full border-none bg-transparent text-[#181113] dark:text-white placeholder-[#89616f]/50 text-sm focus:ring-0 min-h-[160px] resize-y p-4 outline-none"
                      placeholder="Detailed product description..."
                      name="description"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-[#2d1b22] p-6 rounded-2xl shadow-sm border border-[#e6dbdf] dark:border-[#4a2e36]">
              <h3 className="text-lg font-bold text-[#181113] dark:text-white mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">
                  sell
                </span>
                Pricing &amp; Status
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-[#5d4a51] dark:text-white/80">
                    Price
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#89616f] font-medium">
                      $
                    </span>
                    <input
                      className="w-full border pl-8 rounded-xl border-[#e6dbdf] dark:border-[#4a2e36] bg-[#fcfbfb] dark:bg-white/5 text-[#181113] dark:text-white placeholder-[#89616f]/50 text-sm focus:border-primary focus:ring-primary py-3"
                      placeholder="0.00"
                      type="number"
                      name="price"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-[#5d4a51] dark:text-white/80">
                    Original Price{" "}
                    <span className="text-xs font-normal text-[#89616f]">
                      (Optional)
                    </span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#89616f] font-medium">
                      $
                    </span>
                    <input
                      className="w-full border pl-8 rounded-xl border-[#e6dbdf] dark:border-[#4a2e36] bg-[#fcfbfb] dark:bg-white/5 text-[#181113] dark:text-white placeholder-[#89616f]/50 text-sm focus:border-primary focus:ring-primary py-3"
                      placeholder="0.00"
                      type="number"
                      name="originalPrice"
                    />
                  </div>
                </div>
                <div className="md:col-span-2 border-t border-[#f4f0f2] dark:border-white/5 pt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-[#5d4a51] dark:text-white/80">
                      Badge Text
                    </label>
                    <input
                      className="w-full border px-4 rounded-xl border-[#e6dbdf] dark:border-[#4a2e36] bg-[#fcfbfb] dark:bg-white/5 text-[#181113] dark:text-white placeholder-[#89616f]/50 text-sm focus:border-primary focus:ring-primary py-3"
                      placeholder="e.g. Best Seller"
                      type="text"
                      name="badgeText"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-[#5d4a51] dark:text-white/80">
                      Badge Color
                    </label>
                    <div className="relative">
                      <select
                        name="badgeColor"
                        className="w-full border px-4 rounded-xl border-[#e6dbdf] dark:border-[#4a2e36] bg-[#fcfbfb] dark:bg-white/5 text-[#181113] dark:text-white text-sm focus:border-primary focus:ring-primary py-3 pl-4 pr-10"
                      >
                        <option value="">None</option>
                        <option value="bg-primary">Pink (Primary)</option>
                        <option value="bg-red-500">Red (Sale)</option>
                        <option value="bg-blue-500">Blue (New)</option>
                        <option value="bg-green-500">Green (Eco)</option>
                        <option value="bg-purple-500">Purple (Limited)</option>
                        <option value="bg-black">Black (Dark)</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-2 flex items-center justify-between p-4 bg-[#fcfbfb] dark:bg-white/5 rounded-xl border border-[#e6dbdf] dark:border-[#4a2e36]">
                  <div>
                    <span className="block text-sm font-bold text-[#181113] dark:text-white">
                      On Sale Status
                    </span>
                    <span className="text-xs text-[#89616f] dark:text-white/50">
                      Enable to show the sale badge and discounted pricing.
                    </span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      className="sr-only peer"
                      type="checkbox"
                      checked={isOnSale}
                      onChange={(e) => setIsOnSale(e.target.checked)}
                      name="isOnSale"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-white/10 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-[#2d1b22] p-6 rounded-2xl shadow-sm border border-[#e6dbdf] dark:border-[#4a2e36]">
              <h3 className="text-lg font-bold text-[#181113] dark:text-white mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">
                  perm_media
                </span>
                Media
              </h3>
              <div className="mb-8">
                <label className="block text-sm font-bold text-[#5d4a51] dark:text-white/80 mb-2">
                  Primary Image
                </label>
                <div className="relative group cursor-pointer">
                  <input
                    className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer"
                    type="file"
                    name="primaryImage"
                  />
                  <div className="border-2 border-dashed border-[#e6dbdf] dark:border-[#4a2e36] rounded-2xl p-10 flex flex-col items-center justify-center bg-[#fcfbfb] dark:bg-white/5 group-hover:bg-[#f4f0f2] dark:group-hover:bg-white/10 transition-colors text-center">
                    <div className="size-14 bg-white dark:bg-white/10 rounded-full shadow-sm flex items-center justify-center mb-4 text-primary group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-3xl">
                        cloud_upload
                      </span>
                    </div>
                    <p className="text-[#181113] dark:text-white font-semibold text-base">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-[#89616f] dark:text-white/50 text-sm mt-1">
                      SVG, PNG, JPG or GIF (max. 800x400px)
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-[#5d4a51] dark:text-white/80 mb-3">
                  Product Gallery
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  <div className="aspect-square relative group rounded-xl overflow-hidden border border-[#e6dbdf] dark:border-[#4a2e36] shadow-sm">
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{
                        backgroundImage:
                          "url('https://lh3.googleusercontent.com/aida-public/AB6AXuByRyWN4yodIiHzmbISB8wz03H-t4Yxp0RAHRvlCdP4JMZ14Rm8rmoDR2x7GD9Hmejhp6GkUKA3zQd8nJgh59NTozDpvXAKSkPb5VTqFYOHOIVGWWx8OQQeL2YupTpAExX6IjD619YVeGoD-8-HcowzTVlzVqkRXsG4UmO--Yi2f56VQjUX0qGFnzSgvrOayfc9DqVHvjKNGKZ9tCzNaeI9Kpchv4eMVAwRaksFi-BiklnwRSh4FBYDtNp6Njo42sg_ncCUifiDmVs')",
                      }}
                    ></div>
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        className="bg-white text-red-500 p-2 rounded-full hover:bg-red-50 transition-colors shadow-lg"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-lg">
                          delete
                        </span>
                      </button>
                    </div>
                  </div>
                  <div className="aspect-square relative group rounded-xl overflow-hidden border border-[#e6dbdf] dark:border-[#4a2e36] shadow-sm">
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{
                        backgroundImage:
                          "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDjRJiAl60yw_yGGG1aIAsP-KwJAowJ8a2e9-5-2vwAuY45wpLZUwtagaW6mXUAS7eNo53lkTsCqGn5YrZapxoZ7MivqedcrT9sWnrid6Lg8G8z63_twQasxskIWbY3laqZeioTPhuKScdl-TrDe0Loiqv0ubYlI_49-kNqpa6C_EFN1Ds-sbVpcSQDGFWs4Ojb9Z8mRs2wmF9b29KBztVUhmJWrUaRIru0_tF4msDgkW47XdJz6GMK0zAEpxJivAEKE92TBZnrGv4')",
                      }}
                    ></div>
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        className="bg-white text-red-500 p-2 rounded-full hover:bg-red-50 transition-colors shadow-lg"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-lg">
                          delete
                        </span>
                      </button>
                    </div>
                  </div>
                  <button
                    className="aspect-square rounded-xl border-2 border-dashed border-[#e6dbdf] dark:border-[#4a2e36] flex flex-col items-center justify-center gap-1 text-[#89616f] hover:text-primary hover:border-primary hover:bg-primary/5 transition-colors bg-[#fcfbfb] dark:bg-white/5"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-2xl">
                      add_photo_alternate
                    </span>
                    <span className="text-xs font-bold">Add</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-[#2d1b22] p-6 rounded-2xl shadow-sm border border-[#e6dbdf] dark:border-[#4a2e36]">
              <h3 className="text-lg font-bold text-[#181113] dark:text-white mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">
                  fact_check
                </span>
                Specifications
              </h3>
              <div className="flex flex-col gap-3">
                <div className="flex gap-3 items-center group">
                  <span className="material-symbols-outlined text-[#89616f]/50 cursor-move group-hover:text-primary transition-colors">
                    drag_indicator
                  </span>
                  <input
                    className="flex-1 border px-4 rounded-xl border-[#e6dbdf] dark:border-[#4a2e36] bg-[#fcfbfb] dark:bg-white/5 text-[#181113] dark:text-white text-sm focus:border-primary focus:ring-primary py-2.5"
                    type="text"
                    defaultValue="100% Kanekalon Fiber"
                    name="spec1"
                  />
                  <button
                    className="p-2 text-[#89616f] hover:text-red-500 hover:bg-red-50 dark:hover:bg-white/10 rounded-lg transition-colors"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-lg">
                      close
                    </span>
                  </button>
                </div>
                <div className="flex gap-3 items-center group">
                  <span className="material-symbols-outlined text-[#89616f]/50 cursor-move group-hover:text-primary transition-colors">
                    drag_indicator
                  </span>
                  <input
                    className="flex-1 border px-4 rounded-xl border-[#e6dbdf] dark:border-[#4a2e36] bg-[#fcfbfb] dark:bg-white/5 text-[#181113] dark:text-white text-sm focus:border-primary focus:ring-primary py-2.5"
                    type="text"
                    defaultValue="Hot Water Setting"
                    name="spec2"
                  />
                  <button
                    className="p-2 text-[#89616f] hover:text-red-500 hover:bg-red-50 dark:hover:bg-white/10 rounded-lg transition-colors"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-lg">
                      close
                    </span>
                  </button>
                </div>
                <div className="flex gap-3 items-center group">
                  <span className="material-symbols-outlined text-[#89616f]/50 cursor-move group-hover:text-primary transition-colors">
                    drag_indicator
                  </span>
                  <input
                    className="flex-1 border px-4 rounded-xl border-[#e6dbdf] dark:border-[#4a2e36] bg-[#fcfbfb] dark:bg-white/5 text-[#181113] dark:text-white text-sm focus:border-primary focus:ring-primary py-2.5"
                    placeholder="Add new specification..."
                    type="text"
                    name="newSpec"
                  />
                  <button
                    className="p-2 text-[#89616f] hover:text-red-500 hover:bg-red-50 dark:hover:bg-white/10 rounded-lg transition-colors"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-lg">
                      close
                    </span>
                  </button>
                </div>
                <div className="mt-2">
                  <button
                    className="flex items-center gap-2 text-primary font-bold text-sm hover:text-primary/80 transition-colors px-1"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-lg">
                      add_circle
                    </span>
                    Add Another Specification
                  </button>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-4 pt-4 mt-2">
              <button
                className="px-8 py-3 rounded-xl border border-[#e6dbdf] dark:border-[#4a2e36] font-bold text-[#5d4a51] dark:text-white hover:bg-white dark:hover:bg-white/5 shadow-sm transition-colors text-sm"
                type="button"
              >
                Cancel
              </button>
              <button
                className="px-8 py-3 rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/25 hover:bg-primary/90 hover:-translate-y-0.5 transition-all text-sm flex items-center gap-2"
                type="submit"
              >
                <span className="material-symbols-outlined text-lg">check</span>
                Create Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AddProduct;
