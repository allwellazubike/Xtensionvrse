const PromoBanner = () => {
  return (
    <div className="w-full bg-primary rounded-2xl overflow-hidden relative">
      <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-8 md:p-12 gap-6 text-center md:text-left">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-black text-white">Bundle & Save 20%</h2>
          <p className="text-white/90 font-medium text-lg">Mix and match any 3 packs of pre-stretched hair.</p>
        </div>
        <button className="bg-white text-primary px-8 py-3 rounded-xl font-bold hover:bg-gray-50 transition-colors shadow-lg whitespace-nowrap">
          Build Your Bundle
        </button>
      </div>
    </div>
  );
};

export default PromoBanner;