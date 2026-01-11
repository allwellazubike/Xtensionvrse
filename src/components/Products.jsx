import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";
// import { products } from "../data/products";

const Products = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const product = products;
  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-[#181113] dark:text-white text-2xl md:text-3xl font-bold tracking-tight">
          New Arrivals
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* <ProductCard /> */}

        {products.slice(0, 4).map((product) => (
          // product component props
          <ProductCard
            productz={product} // ← THIS passes ALL product data!
          />
        ))}
      </div>
    </section>
  );
};

export default Products;
