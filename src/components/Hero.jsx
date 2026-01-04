const Hero = () => {
  return (
    <div className="@container">
      <div className="flex flex-col-reverse md:flex-row gap-8 items-center bg-white dark:bg-gray-900 rounded-3xl p-6 md:p-12 shadow-sm border border-gray-100 dark:border-gray-800">
        {/* Left Content */}
        <div className="flex flex-col gap-6 md:w-1/2 items-start text-left">
          <div className="flex flex-col gap-4">
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider w-fit">
              New Collection Drop
            </span>
            
            <h1 className="text-[#181113] dark:text-white text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight">
              Strands That Perfectly <span className="text-primary">Compliment</span> You!! {" "}
              {/* <span className="text-primary">Confidence</span> */}
            </h1>
            
            <p className="text-gray-600 dark:text-gray-300 text-lg font-medium leading-relaxed max-w-md">
              Premium braiding hair extensions for the modern woman. 
              Tangle-free, lightweight, and vibrant colors available now.
            </p>
          </div>
          
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-2">
            <button className="h-12 px-8 rounded-xl bg-primary hover:bg-primary/90 text-white text-base font-bold shadow-lg shadow-primary/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0">
              Shop Collection
            </button>
            
            <button className="h-12 px-8 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-[#181113] dark:text-white text-base font-bold transition-all">
              View Lookbook
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="w-full md:w-1/2 h-[300px] md:h-[500px] rounded-2xl overflow-hidden relative shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
          
          <div 
            className="w-full h-full bg-center bg-cover bg-no-repeat transition-transform duration-700 hover:scale-105"
            style={{
              backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuCbmjWQvm6sTCWKZMez3uIV_PgfEKeq2YAdhV9xL9_0rL9SLjfPIKuT3K0xW1Tw0WzQPvSjAVgaLBp6AWb9idkD56xdk-OcvORw9FmZSUrehOvrYbvC6bshZfE1XRifTFYIU1yU493FcB-YYex55UWJEnuP9v4Lt6NIWoLcL4rNcHAXjyqGHdwSFSRGInE7LbOgeXgUGs-BMxUcoFYGYF8W8A4ufrGakSDLPaBYKEk_35Z-CXLlFZOO0EOLIKYTHIy05uJ5Omjsmok")`
            }}
            alt="Close up of a woman with long elaborate pink and black box braids smiling"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;