import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import Header from "../../components/admin/Header";
import ProductTable from "../../components/admin/ProductTable";
import ProductDrawer from "../../components/admin/ProductDrawer";
// import { useProducts } from "../../context/ProductContext";

const AdminProducts = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // const { products } = useProducts();
  // useEffect(() => {
  //   if (products && products[1]) {
  //     console.log("Second product ID:", products[1].name);
  //   }
  // }, [products]);

  return (
    <AdminLayout>
      <Header />
      <div className="flex-1 overflow-hidden p-6 md:p-8 flex gap-6 relative">
        <ProductTable />

        {/* Floating Add Button for Mobile/Tablet */}
        {/* Floating Add Button for Mobile/Tablet */}
        {!isDrawerOpen && (
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="fixed bottom-6 right-6 z-30 size-14 bg-primary text-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary/90 2xl:hidden transition-transform hover:scale-105"
          >
            <span className="material-symbols-outlined text-3xl">add</span>
          </button>
        )}

        <ProductDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
        />

        {/* Helper to show drawer permanently on large screens matching HTML structure hidden 2xl:flex */}
        {/* Note: The ProductDrawer component usually handles its own visibility based on props, but HTML had it as a side-panel. 
            We can make a wrapper or modify ProductDrawer to handle '2xl:flex' logic if we want it always open on large screens. 
            For now, let's keep it consistent: click to open, or we can make it a persistent sidebar on 2xl.
            If we closely follow the HTML: <div class="... hidden 2xl:flex ...">
            Let's adjust ProductDrawer usage or the component itself to respect that.
            Actually, the HTML structure implies it's ALWAYS visible on 2xl screens.
            So I should probably modify ProductDrawer to be: className="... hidden 2xl:flex ..." AND/OR visible if isOpen is true.
        */}
      </div>
    </AdminLayout>
  );
};

export default AdminProducts;
