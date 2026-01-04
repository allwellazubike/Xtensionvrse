import ProductCard from './ProductCard';

const Products = () => {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-[#181113] dark:text-white text-2xl md:text-3xl font-bold tracking-tight">New Arrivals</h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <ProductCard />
      </div>
    </section>
  );
};

export default Products;