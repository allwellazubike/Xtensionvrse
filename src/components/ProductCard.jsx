const ProductCard = () => {
  return (
    <>
      {/* Product Card 1 */}
      <div className="flex flex-col group bg-white dark:bg-gray-900 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800">
        <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
          <div className="absolute top-3 left-3 bg-primary text-white text-xs font-bold px-2 py-1 rounded-md z-10">
            New
          </div>
          <button className="absolute top-3 right-3 bg-white/80 dark:bg-black/50 p-1.5 rounded-full text-gray-600 dark:text-gray-300 hover:text-primary hover:bg-white transition-all z-10">
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "20px" }}
            >
              favorite
            </span>
          </button>
          <div
            className="w-full h-full bg-center bg-cover transition-transform duration-700 group-hover:scale-110"
            style={{
              backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuB4N5G78zWCi6kscOa36TYdyFpFLh-t9WPOhrRvtFbMu2u4A_zmUNubM_qmNSvHwp6syj2RNpVp7G8C39DFtGUv4FmaK1c945oLnWNLC4kpTKdGXLfGdJl7aPjRnU_VafNXZxm3x__y4gBs8BcsrwattL-ltG0PV2yR_wtVNdy6008aSRJnaxTEr8XHOY6LY3s7ef5g_W2gX6iWNuoDHNJj6W8aox8TIMZtV8US_nWcH7KAAP5lVn6wm2pgBPOJk9kL_1WD-LdcmIk")`,
            }}
          />

          {/* Quick Add Button */}
          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button className="w-full bg-white dark:bg-gray-800 text-[#181113] dark:text-white py-3 rounded-lg font-bold text-sm shadow-lg hover:bg-primary hover:text-white transition-colors">
              Quick Add
            </button>
          </div>
        </div>
        <div className="p-4 flex flex-col gap-2">
          <h3 className="text-base font-semibold text-[#181113] dark:text-white line-clamp-1">
            X-pression Ultra Braid 82"
          </h3>
          <div className="flex items-center gap-1 text-yellow-400 text-sm">
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "16px", fontVariationSettings: "'FILL' 1" }}
            >
              star
            </span>
            <span className="text-gray-500 dark:text-gray-400 text-xs">
              (4.8)
            </span>
          </div>
          <div className="flex items-center justify-between mt-1">
            <span className="text-lg font-bold text-[#181113] dark:text-white">
              ₦5.99
            </span>
            <div className="flex gap-1">
              <div className="size-3 rounded-full bg-black border border-gray-300"></div>
              <div className="size-3 rounded-full bg-[#8B4513]"></div>
              <div className="size-3 rounded-full bg-primary"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Card 2 */}
      <div className="flex flex-col group bg-white dark:bg-gray-900 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800">
        <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
          <div className="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-md z-10">
            Best Seller
          </div>
          <button className="absolute top-3 right-3 bg-white/80 dark:bg-black/50 p-1.5 rounded-full text-gray-600 dark:text-gray-300 hover:text-primary hover:bg-white transition-all z-10">
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "20px" }}
            >
              favorite
            </span>
          </button>
          <div
            className="w-full h-full bg-center bg-cover transition-transform duration-700 group-hover:scale-110"
            style={{
              backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuBmg-yuymrhyooy-Y9ZGK113t_cIdDhGJMK59zV77CB8M2d9QwzkNeiL-Nn-Cl8-dmrayl0Ei7pywJUCOrBTXypSlvUWb8QCFGcVRGfNWkMuv7euzIBvehh9nqT6O-4xsc6WhRkGWmibpYxVHR242jomolVcbBip6_PAt5goOa5XrRsgJqkpUVMAqRnpVsZ_L_yMOZy5_TUtw_IUWd2eOFNSvm6pKV5x9M7tjx_DZfA5opeiUDgBaq2WK8ZaG1KPFOvmH1wxnmZpMQ")`,
            }}
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button className="w-full bg-white dark:bg-gray-800 text-[#181113] dark:text-white py-3 rounded-lg font-bold text-sm shadow-lg hover:bg-primary hover:text-white transition-colors">
              Quick Add
            </button>
          </div>
        </div>
        <div className="p-4 flex flex-col gap-2">
          <h3 className="text-base font-semibold text-[#181113] dark:text-white line-clamp-1">
            Bohemian Curl Crochet 14"
          </h3>
          <div className="flex items-center gap-1 text-yellow-400 text-sm">
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "16px", fontVariationSettings: "'FILL' 1" }}
            >
              star
            </span>
            <span className="text-gray-500 dark:text-gray-400 text-xs">
              (4.9)
            </span>
          </div>
          <div className="flex items-center justify-between mt-1">
            <span className="text-lg font-bold text-[#181113] dark:text-white">
              ₦12.50
            </span>
            <div className="flex gap-1">
              <div className="size-3 rounded-full bg-[#1b1b1b] border border-gray-300"></div>
              <div className="size-3 rounded-full bg-[#3d2314]"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Card 3 */}
      <div className="flex flex-col group bg-white dark:bg-gray-900 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800">
        <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
          <button className="absolute top-3 right-3 bg-white/80 dark:bg-black/50 p-1.5 rounded-full text-gray-600 dark:text-gray-300 hover:text-primary hover:bg-white transition-all z-10">
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "20px" }}
            >
              favorite
            </span>
          </button>
          <div
            className="w-full h-full bg-center bg-cover transition-transform duration-700 group-hover:scale-110"
            style={{
              backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuDrd1k5RGk1reVbIdgihhhpM22ZlRlUALHrXu51OS894iWMOS06Tm67QHUzQ6x2pBMST2yqniplomujCIOBbZoxojaGIQSrpD_hhQkI5YeUnxzxMDcVaNO3Yopx0lt3WdMS-XFGaUyOTzwJwXvCsm_N-be5OWeqqXKDTw0fKZBc-lMbNMEXs9_4bnbK-ZVdu6YcKQ_sfcpjqk1MDGOZOTZ8mx0QbuoWr_wB4wlwmuxbNA5SqGWCDDmqWFTjFJbAK3nz_V--5rshgeQ")`,
            }}
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button className="w-full bg-white dark:bg-gray-800 text-[#181113] dark:text-white py-3 rounded-lg font-bold text-sm shadow-lg hover:bg-primary hover:text-white transition-colors">
              Quick Add
            </button>
          </div>
        </div>
        <div className="p-4 flex flex-col gap-2">
          <h3 className="text-base font-semibold text-[#181113] dark:text-white line-clamp-1">
            Ombre 613 Blonde Braid
          </h3>
          <div className="flex items-center gap-1 text-yellow-400 text-sm">
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "16px", fontVariationSettings: "'FILL' 1" }}
            >
              star
            </span>
            <span className="text-gray-500 dark:text-gray-400 text-xs">
              (4.5)
            </span>
          </div>
          <div className="flex items-center justify-between mt-1">
            <span className="text-lg font-bold text-[#181113] dark:text-white">
              ₦8.00
            </span>
            <div className="flex gap-1">
              <div className="size-3 rounded-full bg-[#e3dcd1] border border-gray-300"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Card 4 */}
      <div className="flex flex-col group bg-white dark:bg-gray-900 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800">
        <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
          <button className="absolute top-3 right-3 bg-white/80 dark:bg-black/50 p-1.5 rounded-full text-gray-600 dark:text-gray-300 hover:text-primary hover:bg-white transition-all z-10">
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "20px" }}
            >
              favorite
            </span>
          </button>
          <div
            className="w-full h-full bg-center bg-cover transition-transform duration-700 group-hover:scale-110"
            style={{
              backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuDfk3Q2GsqHItpkEVe8Fug9ukrIl3WAuQ56aovA8aMGdwpKYTlgXpmofM81s8_t7OYdLL7mVUQU27HRryx2kddEVCo0952SFjhEGx3SwfXcIrF-dJjVSTLKudebWcOlG3m4LDR3PCqBHnSiJHnqaLJo_JuS6QTpjgYM0FvU82SHuIf9q6QWlDfaNPBVS5ayIA5sZaNhPbFudmv5IwdHAbzs1WKvimvRMmLuvajGcKCbpu5K3J1C5E6_tyX5A06Y0OpRwOoA_wDlJb8")`,
            }}
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button className="w-full bg-white dark:bg-gray-800 text-[#181113] dark:text-white py-3 rounded-lg font-bold text-sm shadow-lg hover:bg-primary hover:text-white transition-colors">
              Quick Add
            </button>
          </div>
        </div>
        <div className="p-4 flex flex-col gap-2">
          <h3 className="text-base font-semibold text-[#181113] dark:text-white line-clamp-1">
            Royal Gold Cuffs Set
          </h3>
          <div className="flex items-center gap-1 text-yellow-400 text-sm">
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "16px", fontVariationSettings: "'FILL' 1" }}
            >
              star
            </span>
            <span className="text-gray-500 dark:text-gray-400 text-xs">
              (5.0)
            </span>
          </div>
          <div className="flex items-center justify-between mt-1">
            <span className="text-lg font-bold text-[#181113] dark:text-white">
              ₦4.50
            </span>
            <div className="flex gap-1">
              <div className="size-3 rounded-full bg-[#FFD700]"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
