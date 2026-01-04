const Footer = () => {
  return (
    <footer className="bg-white dark:bg-[#181113] border-t border-gray-100 dark:border-gray-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 md:px-10 flex flex-col gap-12">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Logo & Description */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-primary font-bold text-xl">
              <span className="material-symbols-outlined">all_inclusive</span> 
              Xtensionsverse
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
              Empowering your self-expression through premium quality, tangle-free braiding hair designed for every texture.
            </p>
          </div>
          
          {/* Shop Links */}
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-[#181113] dark:text-white">Shop</h4>
            <div className="flex flex-col gap-2 text-sm text-gray-500 dark:text-gray-400">
              <a className="hover:text-primary transition-colors" href="#">Braids</a>
              <a className="hover:text-primary transition-colors" href="#">Locs</a>
              <a className="hover:text-primary transition-colors" href="#">Twists</a>
              <a className="hover:text-primary transition-colors" href="#">Accessories</a>
            </div>
          </div>
          
          {/* Support Links */}
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-[#181113] dark:text-white">Support</h4>
            <div className="flex flex-col gap-2 text-sm text-gray-500 dark:text-gray-400">
              <a className="hover:text-primary transition-colors" href="#">Track Order</a>
              <a className="hover:text-primary transition-colors" href="#">Shipping Info</a>
              <a className="hover:text-primary transition-colors" href="#">Returns</a>
              <a className="hover:text-primary transition-colors" href="#">FAQ</a>
            </div>
          </div>
          
          {/* Social Links */}
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-[#181113] dark:text-white">Stay Connected</h4>
            <div className="flex gap-4">
              <a 
                className="size-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-primary hover:text-white transition-colors" 
                href="#"
              >
                <span className="font-bold text-lg">Ig</span>
              </a>
              {/* <a 
                className="size-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-primary hover:text-white transition-colors" 
                href="#"
              >
                <span className="font-bold text-lg">Tt</span>
              </a>
              <a 
                className="size-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-primary hover:text-white transition-colors" 
                href="#"
              >
                <span className="font-bold text-lg">Fb</span>
              </a> */}
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between border-t border-gray-100 dark:border-gray-800 pt-8 text-sm text-gray-400 gap-4">
          <p>© 2026 Xtensionsverse. All rights reserved.</p>
          <div className="flex gap-6">
            <a className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors" href="#">
              Privacy Policy
            </a>
            <a className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors" href="#">
              Terms of Service
            </a>
          </div>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;