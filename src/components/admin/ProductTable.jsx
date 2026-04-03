import React, { useState } from "react";
import ConfirmDelete from "./ConfirmDelete";
import axios from "axios";
import { useProducts } from "../../context/ProductContext";

const ProductTable = ({ onEdit }) => {
  const { products } = useProducts();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const initiateDelete = (product) => {
    setProductToDelete(product);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!productToDelete) return;
    axios
      .delete((import.meta.env.VITE_API_URL || "http://localhost:3000") + `/api/products/${productToDelete.id}`)
      .then(() => {
        setIsDeleteModalOpen(false);
        setProductToDelete(null);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Delete failed!");
        setIsDeleteModalOpen(false);
      });
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-white dark:bg-[#2d1b22] rounded-2xl border border-[#e6dbdf] dark:border-[#4a2e36] shadow-sm overflow-hidden">
      {/* Table Actions Toolbar */}
      <div className="p-4 border-b border-[#e6dbdf] dark:border-[#4a2e36] flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-background-light dark:bg-white/5 rounded-lg text-sm font-medium text-[#181113] dark:text-white hover:bg-[#eaddd6] dark:hover:bg-white/10 transition-colors">
            <span className="material-symbols-outlined text-lg">filter_list</span>
            Filter
          </button>
        </div>
      </div>

      {/* Table Container - Added overflow-x-auto for horizontal scrolling */}
      <div className="flex-1 overflow-x-auto overflow-y-auto">
        <table className="w-full text-left border-collapse table-auto">
          <thead className="bg-[#fcfbfb] dark:bg-white/5 sticky top-0 z-10">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-[#89616f] dark:text-white/60 uppercase tracking-wider w-24">
                Image
              </th>
              {/* Added a significant min-width to ensure the name stays wide */}
              <th className="px-6 py-4 text-xs font-bold text-[#89616f] dark:text-white/60 uppercase tracking-wider min-w-[300px]">
                Product Name
              </th>
              <th className="px-6 py-4 text-xs font-bold text-[#89616f] dark:text-white/60 uppercase tracking-wider whitespace-nowrap">
                Product ID
              </th>
              <th className="px-6 py-4 text-xs font-bold text-[#89616f] dark:text-white/60 uppercase tracking-wider whitespace-nowrap">
                Stock
              </th>
              <th className="px-6 py-4 text-xs font-bold text-[#89616f] dark:text-white/60 uppercase tracking-wider whitespace-nowrap">
                Price
              </th>
              <th className="px-6 py-4 text-xs font-bold text-[#89616f] dark:text-white/60 uppercase tracking-wider text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e6dbdf] dark:divide-[#4a2e36]">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-[#fbf9fa] dark:hover:bg-white/5 transition-colors group">
                <td className="px-6 py-4">
                  <div
                    className="size-12 rounded-lg bg-cover bg-center shadow-sm flex-shrink-0"
                    style={{ backgroundImage: `url("${product.image}")` }}
                  ></div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    {/* leading-tight reduces line height to keep multi-line names compact */}
                    <span className="text-sm font-semibold text-[#181113] dark:text-white break-words leading-tight">
                      {product.name}
                    </span>
                    <span className="text-xs text-[#89616f] dark:text-white/50 mt-0.5">
                      {product.size} • {product.material}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-[#5d4a51] dark:text-white/70 font-mono">
                  {product.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    product.stock === 0 ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
                  }`}>
                    {product.stock} in stock
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-[#181113] dark:text-white whitespace-nowrap">
                  ₦{product.price}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => onEdit(product)} className="p-1.5 hover:bg-black/5 rounded-lg">
                      <span className="material-symbols-outlined text-[20px]">edit</span>
                    </button>
                    <button onClick={() => initiateDelete(product)} className="p-1.5 hover:bg-red-50 text-red-500 rounded-lg">
                      <span className="material-symbols-outlined text-[20px]">delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination (Simplified for brevity) */}
      <div className="p-4 border-t border-[#e6dbdf] dark:border-[#4a2e36] flex items-center justify-between">
        <span className="text-sm text-[#5d4a51]">Showing {products.length} products</span>
      </div>

      <ConfirmDelete
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        itemName={productToDelete?.name}
      />
    </div>
  );
};

export default ProductTable;