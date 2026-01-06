# Project Context: Xtensionsvrse (React + Vite)

This document contains the codebase for `Xtensionsvrse`, an e-commerce application for hair extensions built with React, Vite, and Tailwind CSS.
Use this context to understand the project structure, components, and logic.

## Project Structure

```
src/
├── components/
│   ├── CartItem.jsx
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── Hero.jsx
│   ├── ...
├── context/
│   └── CartContext.jsx
├── data/
│   └── products.js
├── pages/
│   ├── Home.jsx
│   ├── Products.jsx
│   ├── ProductDetails.jsx
│   ├── Cart.jsx
│   └── ...
├── App.jsx
├── main.jsx
└── ...
```

## File Contents

### package.json

```json
{
  "name": "my-react-app",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "@tailwindcss/vite": "^4.1.18",
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "react-router-dom": "^6.30.2",
    "tailwindcss": "^4.1.18"
  },
  "devDependencies": {
    "@eslint/js": "^9.39.1",
    "@types/react": "^19.2.5",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^5.1.1",
    "eslint": "^9.39.1",
    "eslint-plugin-react-hooks": "^7.0.1",
    "eslint-plugin-react-refresh": "^0.4.24",
    "globals": "^16.5.0",
    "vite": "^7.2.4"
  }
}
```

### src/main.jsx

```jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { CartProvider } from "./context/CartContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CartProvider>
      <Router>
        <App />
      </Router>
    </CartProvider>
  </StrictMode>
);
```

### src/App.jsx

```jsx
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import SearchResultsPage from "./pages/SearchResults";

import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  // function to toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Home toggleDarkMode={toggleDarkMode} darkMode={darkMode} />}
        />
        <Route
          path="/products"
          element={
            <Products toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
          }
        />
        <Route
          path="/cart"
          element={<Cart toggleDarkMode={toggleDarkMode} darkMode={darkMode} />}
        />
        <Route
          path="/product/:id"
          element={
            <ProductDetails
              toggleDarkMode={toggleDarkMode}
              darkMode={darkMode}
            />
          }
        />
        {/* adding search results route if needed in future, currently imported but unused in original code except for import */}
        <Route path="/search" element={<SearchResultsPage />} />
      </Routes>
    </>
  );
}

export default App;
```

### src/context/CartContext.jsx

```jsx
import { createContext, useState, useContext, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    // try to load from local storage if needed later, for now just memory or empty
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, delta) => {
    setCart((prevCart) => {
      return prevCart.map((item) => {
        if (item.id === productId) {
          const newQuantity = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
    });
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    getCartCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
```

### src/data/products.js

```javascript
export const products = [
  {
    id: 1,
    name: 'X-pression Ultra Braid - Pre-Stretched 52"',
    price: 5000,
    originalPrice: 7000,
    rating: 4.8,
    reviews: 120,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBTwVaCFoLOZskb4LadSGQ3UCSE53wtTG_FGI5u1VouRuOdwWniBsLwsXCC57QkadOwQo_dCa74i-Q_Pxn6JG965-QiEyzZ6PzzShnmRYK7Y36idkWpEaDXKaHNEN3CyCLZA9pi9JGOZu7FY_hq8A50gcKJF3rrtF4zzBDMcI9dskyeldQ7dd0VseM-BbZiOEvCVwpuM5WwyAhRS-cBg3Lx8B7RDdYfl7ffTaVfRD8nOtQWJACSG08wSEoL1sSp3Y3QDGInfdeg2sk",
    alt: "Long blonde ombre braiding hair extension",
    sale: true,
    badge: "Sale",
    description:
      "Our X-pression Ultra Braid is made from premium Kanekalon fiber, offering a soft, human-hair-like texture. It's pre-feathered and pre-stretched to save you prep time. Lightweight and tangle-free for effortless braiding.",
    specs: [
      "Weight: 160g per pack",
      "Material: Kanekalon Synthetic Fiber",
      "Texture: Yaki Straight",
      "Length: 52 Inches",
    ],
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBTwVaCFoLOZskb4LadSGQ3UCSE53wtTG_FGI5u1VouRuOdwWniBsLwsXCC57QkadOwQo_dCa74i-Q_Pxn6JG965-QiEyzZ6PzzShnmRYK7Y36idkWpEaDXKaHNEN3CyCLZA9pi9JGOZu7FY_hq8A50gcKJF3rrtF4zzBDMcI9dskyeldQ7dd0VseM-BbZiOEvCVwpuM5WwyAhRS-cBg3Lx8B7RDdYfl7ffTaVfRD8nOtQWJACSG08wSEoL1sSp3Y3QDGInfdeg2sk",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCAINtIdyBbe_fu7oLtAnPxMv0eHTYejkToLhuAvYByjyPJ-0teWhDjSgiIbJ4jCJZEXveJl6o7tQbh62uOqY8vHsQRGry2quLYgNXvJVMOW3Jl6mz7upM9qBzxSuOKmq9Ga_C9yZv-ia1369msxvwedlxDVzfwwipLDyjTPmRFayvH2YTsXYEHNHRtI3SaAtTmmpAJkQaQVbN-Nfl1VybuZ9aj7iuSjDufQChC4x9-keL37d8_XjE2MJHkcS85hDTqMlDoYZX6NMQ",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAXJVKIlRlcNmfxbqY2O5fU3_b9rezwB_fCUzk8wl4mFHSnRRMkHLVAgi9vEuVfv2KuNE-yfIZJDdjayB9lvy5t6eswDpG_g08o5JlYa1V59uYKK1yfaVrHqV1ngy9JiN7gG6kfsgdn7ctAdGQwRaQsEZEpjl3PCqeFDxva_V5mTG-N4vp8xrbkarJDOjFpNPNTq2E4DT3IKXEcoA5peHM1QoDd5Zd6VIgpbFcKMoCspVvjeau5WvNQzVJT9uItH6AutQxL--luFHQ",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAkTEnQanVuOYhCjfggRLillWyHuQksCaMJ07EaADb-aVJ7p1kQ9g_IxqixX0UHGUR4X5va46DaOPaeA2X2mG69L5DajhVTYMp6t72Ka-hb5v_PrCOqnmqXLepRamebYifOicxnOvjmZIH7OoWrWQqMTZmOs8P_un7JHYMdIVvVaD64ynRI1AoJlFVGluyWwhnETuweZJZsHAP1gQWYtMbvo6YRwJONZ9mSlQJulYSrRyJBQOzmTz1rtZLuKUXpS5I0JxeT5S2ucww",
    ],
  },
  {
    id: 2,
    name: "Water Wave Passion Twist Hair - 18 Inch",
    price: 12000,
    rating: 4.9,
    reviews: 85,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAIS39bzkyMW4Hm5sN0vSI_ThJ1N0grqf-perAp4wMlplkj4GqwRnKO6Fq5jDh_uEyrDvEw5tBOVBZ56BOaXSmGDK1lW4Ni8JnR0MAule33oDRCv2Fdayc0bDNpR4rSzi5TYZZfrGFPM2gYBL6J9pt-HV2CNO_2QuUNWC1iCE5wZefiMPYQpK5uDtrilcoJzGYBA66zHCDNYleNLlG4EWZ_UcS_3y5XTBP2TyIY_c0aldOM7Jo6Bqr-YkoMBS3kmTB2dnVt-QYNfGU",
    alt: "Dark curly passion twist hair extension",
    sale: false,
    description:
      "Achieve the perfect Passion Twist look with our Water Wave hair. Soft, bouncy curls that are easy to install and maintain.",
    specs: [
      "Weight: 100g per pack",
      "Material: Synthetic Fiber",
      "Texture: Water Wave",
      "Length: 18 Inches",
    ],
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAIS39bzkyMW4Hm5sN0vSI_ThJ1N0grqf-perAp4wMlplkj4GqwRnKO6Fq5jDh_uEyrDvEw5tBOVBZ56BOaXSmGDK1lW4Ni8JnR0MAule33oDRCv2Fdayc0bDNpR4rSzi5TYZZfrGFPM2gYBL6J9pt-HV2CNO_2QuUNWC1iCE5wZefiMPYQpK5uDtrilcoJzGYBA66zHCDNYleNLlG4EWZ_UcS_3y5XTBP2TyIY_c0aldOM7Jo6Bqr-YkoMBS3kmTB2dnVt-QYNfGU",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCAINtIdyBbe_fu7oLtAnPxMv0eHTYejkToLhuAvYByjyPJ-0teWhDjSgiIbJ4jCJZEXveJl6o7tQbh62uOqY8vHsQRGry2quLYgNXvJVMOW3Jl6mz7upM9qBzxSuOKmq9Ga_C9yZv-ia1369msxvwedlxDVzfwwipLDyjTPmRFayvH2YTsXYEHNHRtI3SaAtTmmpAJkQaQVbN-Nfl1VybuZ9aj7iuSjDufQChC4x9-keL37d8_XjE2MJHkcS85hDTqMlDoYZX6NMQ",
    ],
  },
  {
    id: 3,
    name: "Ombre Kanekalon Jumbo Braid - Blue/Purple",
    price: 8000,
    rating: 5.0,
    reviews: 42,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC2BuAkTxe_XcIZRYpB2CJZozHYcxJASflPrtPmjJ9n6EIXeTdvhkNGiV_nLgOXhRCGSQ9ILqrMKwElBpPHKrDk4P1dvsVIIc_UoBotCxSAqRG0TDozGeMKBAMHlUjVriLHzpGDsAgT_udoIpvxXdTC8vxXXvmZW3dQwbSdrfuYws3rWktpYF80Fe-VJbhUslOE6hdrx6TNLLWWOPhvPm4feKEImCnSL58-SyiX028ttOgduaWsfP-wPO6cVoveEZLFCYhx960Qq38",
    alt: "Blue and purple colorful braids",
    sale: false,
    description:
      "Stand out with our vibrant Ombre Kanekalon Jumbo Braid. Perfect for festivals, parties, or just expressing your unique style.",
    specs: [
      "Weight: 100g per pack",
      "Material: High Temp Fiber",
      "Texture: Jumbo Braid",
      "Length: 24 Inches",
    ],
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC2BuAkTxe_XcIZRYpB2CJZozHYcxJASflPrtPmjJ9n6EIXeTdvhkNGiV_nLgOXhRCGSQ9ILqrMKwElBpPHKrDk4P1dvsVIIc_UoBotCxSAqRG0TDozGeMKBAMHlUjVriLHzpGDsAgT_udoIpvxXdTC8vxXXvmZW3dQwbSdrfuYws3rWktpYF80Fe-VJbhUslOE6hdrx6TNLLWWOPhvPm4feKEImCnSL58-SyiX028ttOgduaWsfP-wPO6cVoveEZLFCYhx960Qq38",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCAINtIdyBbe_fu7oLtAnPxMv0eHTYejkToLhuAvYByjyPJ-0teWhDjSgiIbJ4jCJZEXveJl6o7tQbh62uOqY8vHsQRGry2quLYgNXvJVMOW3Jl6mz7upM9qBzxSuOKmq9Ga_C9yZv-ia1369msxvwedlxDVzfwwipLDyjTPmRFayvH2YTsXYEHNHRtI3SaAtTmmpAJkQaQVbN-Nfl1VybuZ9aj7iuSjDufQChC4x9-keL37d8_XjE2MJHkcS85hDTqMlDoYZX6NMQ",
    ],
  },
  {
    id: 4,
    name: "Silky Straight Bulk - Human Hair Blend",
    price: 32000,
    rating: 4.6,
    reviews: 15,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDYrCY20k-7uwzcrgOw1dub2TQzGB3D_RPPkyRWu0nPwq6mHD7WLlcEJHIGLGBMbVK0VuQG8n9FhxbB-OKQ2qVQBDlMsihNa-NeyDWeW9L2d0fmlMCNlhYpP-TcebCEBB1RQ07sVwGFzHl3YYihrueWhLJYIszpNvHrCSrFBfD3f7iGLbxperybOqH6Oef7HTFC_LpxPoXc8jBS0Nx5tXqIAIGkMi51x4Tkci0VdaUqWKTLH1mcpLpPmcAGXTHTVFolqFVHBjF131Y",
    alt: "Straight silky black hair extension",
    sale: false,
    description:
      "Luxurious Silky Straight Bulk hair, a premium human hair blend perfect for micro braids and tree braids.",
    specs: [
      "Weight: 100g per pack",
      "Material: Human Hair Blend",
      "Texture: Straight",
      "Length: 18 Inches",
    ],
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDYrCY20k-7uwzcrgOw1dub2TQzGB3D_RPPkyRWu0nPwq6mHD7WLlcEJHIGLGBMbVK0VuQG8n9FhxbB-OKQ2qVQBDlMsihNa-NeyDWeW9L2d0fmlMCNlhYpP-TcebCEBB1RQ07sVwGFzHl3YYihrueWhLJYIszpNvHrCSrFBfD3f7iGLbxperybOqH6Oef7HTFC_LpxPoXc8jBS0Nx5tXqIAIGkMi51x4Tkci0VdaUqWKTLH1mcpLpPmcAGXTHTVFolqFVHBjF131Y",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCAINtIdyBbe_fu7oLtAnPxMv0eHTYejkToLhuAvYByjyPJ-0teWhDjSgiIbJ4jCJZEXveJl6o7tQbh62uOqY8vHsQRGry2quLYgNXvJVMOW3Jl6mz7upM9qBzxSuOKmq9Ga_C9yZv-ia1369msxvwedlxDVzfwwipLDyjTPmRFayvH2YTsXYEHNHRtI3SaAtTmmpAJkQaQVbN-Nfl1VybuZ9aj7iuSjDufQChC4x9-keL37d8_XjE2MJHkcS85hDTqMlDoYZX6NMQ",
    ],
  },
  {
    id: 5,
    name: "Nu Faux Locs - 24 Inch Crochet",
    price: 19999,
    rating: 4.9,
    reviews: 203,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAEyOzRic8-Kdlxzue-p3GWpUGPHTRPHAPLMd5-Vg7SLS54hzWFabp_MZ4P8t5wXgzOloS_nOSCeLnRXhSitI0i3yj-LmzJGyDQEQwVF8j7LM4q3xGkx5usU0V1GojZgzpQ8-ncqRa1BLFvkmGRKZ-hgwSmA3auF7BNtL4RiSP_Ogqo4nWwEbZ0VBkn_SbH5-BEqDCDZTGk-Budmrd4o84I7VoKgkIUz5OktFoEjPCxEZe18m4-uphBt0MkPjP0i4Yq8tDyjbZkKXE",
    alt: "Faux locs crochet hair extension",
    sale: false,
    description:
      "Get the loc look instantly with Nu Faux Locs. Light, natural-looking, and easy to install crochet locs.",
    specs: [
      "Weight: 85g per pack",
      "Material: Synthetic Fiber",
      "Texture: Locs",
      "Length: 24 Inches",
    ],
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAEyOzRic8-Kdlxzue-p3GWpUGPHTRPHAPLMd5-Vg7SLS54hzWFabp_MZ4P8t5wXgzOloS_nOSCeLnRXhSitI0i3yj-LmzJGyDQEQwVF8j7LM4q3xGkx5usU0V1GojZgzpQ8-ncqRa1BLFvkmGRKZ-hgwSmA3auF7BNtL4RiSP_Ogqo4nWwEbZ0VBkn_SbH5-BEqDCDZTGk-Budmrd4o84I7VoKgkIUz5OktFoEjPCxEZe18m4-uphBt0MkPjP0i4Yq8tDyjbZkKXE",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCAINtIdyBbe_fu7oLtAnPxMv0eHTYejkToLhuAvYByjyPJ-0teWhDjSgiIbJ4jCJZEXveJl6o7tQbh62uOqY8vHsQRGry2quLYgNXvJVMOW3Jl6mz7upM9qBzxSuOKmq9Ga_C9yZv-ia1369msxvwedlxDVzfwwipLDyjTPmRFayvH2YTsXYEHNHRtI3SaAtTmmpAJkQaQVbN-Nfl1VybuZ9aj7iuSjDufQChC4x9-keL37d8_XjE2MJHkcS85hDTqMlDoYZX6NMQ",
    ],
  },
  {
    id: 6,
    name: "French Curl Braiding Hair - Loose Wavy",
    price: 20000,
    rating: 4.7,
    reviews: 55,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDPdjXSirvg7Zvc1Keey65UZTHSOWErDl_G8SJyWV6_Ql0xYOa_VuJU9aj8udUZPjyOjxIAKwqGW_AQTcwUMBgLOSj6j3eLFbP5YFEOLh73xeiRLhFYJ083NFFkH9INmFvC56s8Qnwefb6uaa6rNmpyBocEIjgs0iKcEeWOt9mzhUOGL6K2b1xOSu3Z_1zf2EdKKQtrxK9T8i92LeD5dylp1S7YicDIrI93Ue45h-g-DuAtygQ8gixQ0SsbMdQfLBt22OmcnaZhA20",
    alt: "French curl braiding hair texture",
    sale: false,
    badge: "Bestseller",
    badgeColor: "bg-primary",
    description:
      "The Bestselling French Curl Braiding Hair. Achieve those viral loose wavy braid styles with specific French Curl texture. Soft, silky, and voluminous.",
    specs: [
      "Weight: 150g per pack",
      "Material: Premium Synthetic",
      "Texture: Loose Wavy",
      "Length: 22 Inches",
    ],
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDPdjXSirvg7Zvc1Keey65UZTHSOWErDl_G8SJyWV6_Ql0xYOa_VuJU9aj8udUZPjyOjxIAKwqGW_AQTcwUMBgLOSj6j3eLFbP5YFEOLh73xeiRLhFYJ083NFFkH9INmFvC56s8Qnwefb6uaa6rNmpyBocEIjgs0iKcEeWOt9mzhUOGL6K2b1xOSu3Z_1zf2EdKKQtrxK9T8i92LeD5dylp1S7YicDIrI93Ue45h-g-DuAtygQ8gixQ0SsbMdQfLBt22OmcnaZhA20",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCAINtIdyBbe_fu7oLtAnPxMv0eHTYejkToLhuAvYByjyPJ-0teWhDjSgiIbJ4jCJZEXveJl6o7tQbh62uOqY8vHsQRGry2quLYgNXvJVMOW3Jl6mz7upM9qBzxSuOKmq9Ga_C9yZv-ia1369msxvwedlxDVzfwwipLDyjTPmRFayvH2YTsXYEHNHRtI3SaAtTmmpAJkQaQVbN-Nfl1VybuZ9aj7iuSjDufQChC4x9-keL37d8_XjE2MJHkcS85hDTqMlDoYZX6NMQ",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAXJVKIlRlcNmfxbqY2O5fU3_b9rezwB_fCUzk8wl4mFHSnRRMkHLVAgi9vEuVfv2KuNE-yfIZJDdjayB9lvy5t6eswDpG_g08o5JlYa1V59uYKK1yfaVrHqV1ngy9JiN7gG6kfsgdn7ctAdGQwRaQsEZEpjl3PCqeFDxva_V5mTG-N4vp8xrbkarJDOjFpNPNTq2E4DT3IKXEcoA5peHM1QoDd5Zd6VIgpbFcKMoCspVvjeau5WvNQzVJT9uItH6AutQxL--luFHQ",
    ],
  },
];
```

### src/components/Header.jsx

```jsx
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Header = ({ toggleDarkMode, darkMode }) => {
  const { getCartCount, cart } = useCart();
  const cartCount = getCartCount();

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-[#181113]/90 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
      <div className="px-4 md:px-10 py-3 max-w-7xl mx-auto w-full">
        <div className="flex items-center justify-between gap-4">
          {/* Logo & Links */}
          <div className="flex items-center gap-8">
            <a className="flex items-center gap-3 text-primary" href="#">
              <div className="size-8 flex items-center justify-center rounded-full bg-primary/10">
                <span className="material-symbols-outlined text-primary text-[24px]">
                  all_inclusive
                </span>
              </div>
              <h2 className="text-[#181113] dark:text-white text-xl font-extrabold tracking-tight">
                Xtensionsvrse
              </h2>
            </a>

            <nav className="hidden lg:flex items-center gap-8">
              <a
                className="text-[#181113] dark:text-gray-200 text-sm font-semibold hover:text-primary transition-colors"
                href="#"
              >
                Braids
              </a>
              <a
                className="text-[#181113] dark:text-gray-200 text-sm font-semibold hover:text-primary transition-colors"
                href="#"
              >
                Twists
              </a>
              <a
                className="text-[#181113] dark:text-gray-200 text-sm font-semibold hover:text-primary transition-colors"
                href="#"
              >
                Locs
              </a>
              <a
                className="text-[#181113] dark:text-gray-200 text-sm font-semibold hover:text-primary transition-colors"
                href="#"
              >
                New In
              </a>
              <a
                className="text-primary text-sm font-bold hover:opacity-80 transition-opacity"
                href="#"
              >
                Sale
              </a>
            </nav>
          </div>

          {/* Search & Actions */}
          <div className="flex flex-1 justify-end gap-4 md:gap-6 items-center">
            <div className="hidden md:flex flex-1 max-w-xs relative group">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">
                <span className="material-symbols-outlined text-[20px]">
                  search
                </span>
              </div>
              <input
                className="w-full bg-[#f4f0f2] dark:bg-gray-800 border-none rounded-xl py-2.5 pl-10 pr-4 text-sm font-medium focus:ring-2 focus:ring-primary/20 placeholder:text-gray-400 text-[#181113] dark:text-white transition-all"
                placeholder="Search styles..."
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={toggleDarkMode}
                className="flex items-center justify-center rounded-full size-10 hover:bg-gray-100 dark:hover:bg-gray-800 text-[#181113] dark:text-white transition-colors"
              >
                <span className="material-symbols-outlined">
                  {darkMode ? "light_mode" : "dark_mode"}
                </span>
              </button>

              <button className="flex items-center justify-center rounded-full size-10 hover:bg-gray-100 dark:hover:bg-gray-800 text-[#181113] dark:text-white transition-colors">
                <span className="material-symbols-outlined">
                  account_circle
                </span>
              </button>

              <Link
                to="/cart"
                className="flex items-center justify-center rounded-full size-10 hover:bg-gray-100 dark:hover:bg-gray-800 text-[#181113] dark:text-white transition-colors relative"
              >
                <span className="material-symbols-outlined">shopping_cart</span>
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 size-4 bg-primary rounded-full border border-white dark:border-[#181113] text-[10px] text-white flex items-center justify-center font-bold">
                    {cart.length}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
```

### src/components/CartItem.jsx

```jsx
import React from "react";
import { Link } from "react-router-dom";

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 bg-surface-light dark:bg-surface-dark p-4 rounded-2xl shadow-sm border border-transparent dark:border-gray-800">
      <div className="relative shrink-0">
        <Link to={`/product/${item.id}`}>
          <div
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-xl w-full sm:w-[100px] h-[100px]"
            style={{ backgroundImage: `url("${item.image}")` }}
          ></div>
        </Link>
      </div>
      <div className="flex flex-1 flex-col justify-between">
        <div className="flex justify-between items-start">
          <div>
            <Link to={`/product/${item.id}`}>
              <h3 className="text-[#181113] dark:text-white text-lg font-bold leading-snug hover:text-primary transition-colors">
                {item.name}
              </h3>
            </Link>
            <p className="text-primary font-bold text-lg mt-1">
              ₦{item.price.toLocaleString()}
            </p>
            {/* Keeping placeholder for options if not in data yet, or removing/making conditional */}
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
              Quantity: {item.quantity}
            </p>
          </div>
          <button
            onClick={() => onRemove(item.id)}
            className="text-gray-400 hover:text-primary transition-colors p-2 -mr-2"
          >
            <span className="material-symbols-outlined">delete</span>
          </button>
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-1 bg-[#f4f0f2] dark:bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => onUpdateQuantity(item.id, -1)}
              className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-white dark:hover:bg-gray-700 shadow-sm transition-all text-[#181113] dark:text-white cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">remove</span>
            </button>
            <input
              className="w-8 p-0 text-center bg-transparent border-none text-sm font-bold text-[#181113] dark:text-white focus:ring-0"
              readOnly
              type="number"
              value={item.quantity}
            />
            <button
              onClick={() => onUpdateQuantity(item.id, 1)}
              className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-white dark:hover:bg-gray-700 shadow-sm transition-all text-[#181113] dark:text-white cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">add</span>
            </button>
          </div>
          <span className="text-sm text-green-600 font-medium">In Stock</span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
```

### src/pages/Home.jsx

```jsx
import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Categories from "../components/Categories";
import Products from "../components/Products";
import PromoBanner from "../components/PromoBanner";
import Newsletter from "../components/NewsLetter";
import Footer from "../components/Footer";

const Home = ({ toggleDarkMode, darkMode }) => {
  return (
    <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
      <div className="relative flex min-h-screen w-full flex-col group/design-root bg-background-light dark:bg-background-dark text-[#181113] dark:text-white antialiased overflow-x-hidden">
        <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} />

        <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-10 py-6 md:py-10 space-y-16">
          <Hero />
          <Features />
          <Categories />
          <Products />
          <PromoBanner />
          <Newsletter />
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default Home;
```

### src/pages/Products.jsx

```jsx
import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FilterSidebar from "../components/FilterSidebar";
import { useCart } from "../context/CartContext";

import { Link } from "react-router-dom";
import { products } from "../data/products";

const Products = ({ toggleDarkMode, darkMode }) => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const { addToCart } = useCart();

  return (
    <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
      <div className="flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark text-[#181113] dark:text-white antialiased">
        <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} />

        <div className="max-w-[1440px] mx-auto flex w-full relative">
          <FilterSidebar
            isOpen={mobileFiltersOpen}
            onClose={() => setMobileFiltersOpen(false)}
          />

          <main className="flex-1 w-full min-w-0 pb-20">
            {/* Hero Banner */}
            <div className="px-4 md:px-6 lg:px-8 py-6">
              <div className="relative w-full rounded-2xl overflow-hidden min-h-[220px] md:min-h-[280px] flex items-center bg-gray-900 group">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{
                    backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuCFH0iCZRIVFuNEvCIk55idYtVd_xp1sdjFYM-MJ49nF2vIYIOpS32mpGyqZLq3hZvxLqcEY6yx77_8TABPd0fzysuqZkYuk70oEjD32oJPHmxEahqUllzuhn00tKNz6_rgkivIqknSP-vAoI1qNfeJLk9nqvXFCkBU67Ds27fHi5D3w6U6tqqsmSahW22p-4uJuuKmiBUxlKT_KeHuOsjdGthK8GyQ0_-tt-OZcvMrqU__Q1ZUTH0UFiw6WdWmBz8SuTeWIj2gpfA")`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
                <div className="relative z-10 p-6 md:p-10 max-w-xl">
                  <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-widest text-white uppercase bg-primary rounded-full">
                    New Arrivals
                  </span>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                    Premium Braiding Hair
                  </h2>
                  <p className="text-gray-200 text-sm md:text-base mb-6 max-w-md">
                    Discover the softest, longest-lasting textures for your next
                    protective style. Tangle-free and lightweight.
                  </p>
                  <button className="px-6 py-3 bg-white text-slate-900 rounded-xl font-bold text-sm hover:bg-gray-100 transition-colors">
                    Shop Collection
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Categories (Chips) */}
            <div className="sticky top-16 z-30 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm px-4 md:px-6 lg:px-8 py-3 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-3 overflow-x-auto hide-scrollbar pb-1">
                <button className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-white text-sm font-semibold shadow-md shadow-primary/20">
                  <span className="material-symbols-outlined text-[18px]">
                    grid_view
                  </span>
                  All
                </button>
                {[
                  "Pre-stretched",
                  "Kanekalon",
                  "Passion Twist",
                  "Locs",
                  "Spring Twist",
                ].map((cat) => (
                  <button
                    key={cat}
                    className="shrink-0 px-4 py-2 rounded-full bg-white dark:bg-[#2d1b22] border border-gray-200 dark:border-gray-700 text-slate-700 dark:text-gray-200 text-sm font-medium hover:border-primary hover:text-primary transition-all"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort & Count Row */}
            <div className="px-4 md:px-6 lg:px-8 py-4 flex items-center justify-between">
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                Showing{" "}
                <span className="text-[#181113] dark:text-white font-bold">
                  124
                </span>{" "}
                results
              </p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-500 hidden sm:inline">
                  Sort by:
                </span>
                <div className="relative group">
                  <button className="flex items-center gap-2 text-sm font-bold text-[#181113] dark:text-white bg-white dark:bg-[#2d1b22] border border-gray-200 dark:border-gray-700 pl-3 pr-2 py-1.5 rounded-lg hover:border-primary/50 transition-colors">
                    Recommended
                    <span className="material-symbols-outlined text-[18px]">
                      expand_more
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Product Grid */}
            <div className="px-4 md:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {products.map((product) => (
                <Link
                  to={`/product/${product.id}`}
                  key={product.id}
                  className="group flex flex-col bg-white dark:bg-[#2d1b22] rounded-2xl overflow-hidden border border-transparent hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
                >
                  {/* Image Area */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                    <div
                      className="bg-cover bg-center w-full h-full transition-transform duration-500 group-hover:scale-110"
                      style={{ backgroundImage: `url("${product.image}")` }}
                      alt={product.alt}
                    />

                    <div className="absolute top-3 right-3 z-10">
                      <button className="size-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-slate-400 hover:text-primary hover:bg-white transition-colors shadow-sm">
                        <span className="material-symbols-outlined text-[20px]">
                          favorite
                        </span>
                      </button>
                    </div>

                    {product.badge && (
                      <div className="absolute top-3 left-3 z-10">
                        <span
                          className={`px-2 py-1 ${
                            product.badgeColor || "bg-red-500"
                          } text-white text-[10px] font-bold uppercase tracking-wider rounded`}
                        >
                          {product.badge}
                        </span>
                      </div>
                    )}
                    {product.sale && !product.badge && (
                      <div className="absolute top-3 left-3 z-10">
                        <span className="px-2 py-1 bg-red-500 text-white text-[10px] font-bold uppercase tracking-wider rounded">
                          Sale
                        </span>
                      </div>
                    )}

                    {/* Quick Add Button (Desktop Hover) */}
                    <div className="absolute inset-x-4 bottom-4 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hidden md:block">
                      <button className="w-full py-3 bg-white text-slate-900 font-bold text-sm rounded-xl shadow-lg hover:bg-primary hover:text-white flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined text-[18px]">
                          add_shopping_cart
                        </span>
                        Add to Cart
                      </button>
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="p-4 flex flex-col flex-1">
                    <div className="flex items-center gap-1 mb-1">
                      <span className="material-symbols-outlined text-yellow-400 text-[14px] fill-1">
                        star
                      </span>
                      <span className="text-xs font-medium text-slate-500">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>

                    <h3 className="font-bold text-[#181113] dark:text-white text-base leading-snug mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>

                    <div className="mt-auto pt-2 flex items-center justify-between">
                      <div className="flex items-baseline gap-2">
                        <span className="text-base font-extrabold text-[#181113] dark:text-white">
                          ₦{product.price.toLocaleString()}
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs text-slate-400 line-through decoration-slate-400">
                            ₦{product.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>

                      {/* Mobile Cart Icon */}
                      <button className="md:hidden size-8 rounded-full bg-gray-100 dark:bg-gray-800 text-[#181113] dark:text-white flex items-center justify-center">
                        <span className="material-symbols-outlined text-[18px]">
                          add
                        </span>
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Load More */}
            <div className="mt-12 flex justify-center pb-8">
              <button className="px-8 py-3 bg-white dark:bg-[#2d1b22] border border-gray-200 dark:border-gray-700 text-[#181113] dark:text-white font-bold rounded-xl hover:border-primary hover:text-primary transition-all">
                Load More Products
              </button>
            </div>
          </main>

          {/* Mobile Floating Filter Button */}
          <div className="fixed bottom-6 right-6 md:hidden z-40">
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="flex items-center gap-2 h-12 px-5 bg-primary text-white rounded-full shadow-lg shadow-primary/40 hover:bg-primary/90 hover:scale-105 transition-all"
            >
              <span className="material-symbols-outlined">filter_list</span>
              <span className="font-bold text-sm">Filter</span>
            </button>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Products;
```

### src/pages/Cart.jsx

```jsx
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import CartItem from "../components/CartItem";
import { Link } from "react-router-dom";
import { products } from "../data/products";

const Cart = ({ toggleDarkMode, darkMode }) => {
  const { cart, updateQuantity, removeFromCart, getCartTotal } = useCart();

  const subtotal = getCartTotal();
  // Using a flat shipping rate for now, or free if "Fast Shipping" logic implies it?
  // User asked for "Fast Shipping", standard ecommerce often charges.
  // Let's set a standard shipping of 2500 Naira if cart > 0, else 0.
  const shipping = subtotal > 0 ? 2500 : 0;
  const tax = subtotal * 0.05; // 5% tax estimate
  const total = subtotal + shipping + tax;

  // Filter out products already in cart for recommendations
  const recommendedProducts = products
    .filter((p) => !cart.find((c) => c.id === p.id))
    .slice(0, 4);

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? "dark" : ""}`}>
      <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col text-[#181113] dark:text-white">
        <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} />

        <main className="flex-1 w-full max-w-[1280px] mx-auto px-4 lg:px-10 py-6 lg:py-10">
          <h1 className="text-[#181113] dark:text-white tracking-tight text-3xl lg:text-[32px] font-bold leading-tight mb-8">
            Your Cart ({cart.length} Items)
          </h1>

          {cart.length === 0 ? (
            <div className="text-center py-20">
              <span className="material-symbols-outlined text-6xl text-gray-300 mb-4">
                remove_shopping_cart
              </span>
              <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
              <Link
                to="/products"
                className="inline-block bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-primary/90 transition-colors"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              {/* Left Column: Cart Items */}
              <div className="lg:col-span-8 flex flex-col gap-6">
                {cart.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeFromCart}
                  />
                ))}
              </div>

              {/* Right Column: Summary */}
              <div className="lg:col-span-4">
                <div className="sticky top-28 space-y-6">
                  <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-2xl shadow-sm border border-primary/10 dark:border-gray-800">
                    <h2 className="text-xl font-bold text-[#181113] dark:text-white mb-6">
                      Order Summary
                    </h2>
                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">
                          Subtotal
                        </span>
                        <span className="font-medium dark:text-white">
                          ₦{subtotal.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">
                          Shipping Estimate
                        </span>
                        <span className="font-medium dark:text-white">
                          ₦{shipping.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">
                          Tax
                        </span>
                        <span className="font-medium dark:text-white">
                          ₦{tax.toLocaleString()}
                        </span>
                      </div>
                      <div className="h-px bg-gray-100 dark:bg-gray-800 my-4"></div>
                      <div className="flex justify-between items-center">
                        <span className="text-base font-bold text-[#181113] dark:text-white">
                          Total
                        </span>
                        <span className="text-2xl font-bold text-primary">
                          ₦{total.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    {/* Promo Code */}
                    <div className="flex gap-2 mb-6">
                      <input
                        className="flex-1 bg-[#f4f0f2] dark:bg-gray-800 border-none rounded-xl px-4 text-sm focus:ring-1 focus:ring-primary dark:text-white placeholder:text-gray-400"
                        placeholder="Promo code"
                        type="text"
                      />
                      <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-xl text-sm font-bold transition-colors">
                        Apply
                      </button>
                    </div>
                    <button className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl py-4 font-bold text-lg shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 group">
                      Checkout Securely
                      <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform text-sm">
                        arrow_forward
                      </span>
                    </button>
                    <div className="mt-6 flex flex-col items-center gap-3">
                      <div className="flex gap-3 text-gray-400">
                        <span className="material-symbols-outlined">lock</span>
                        <span className="text-xs font-medium">
                          Secure Checkout with SSL Encryption
                        </span>
                      </div>
                      <div className="flex gap-2 opacity-60 grayscale hover:grayscale-0 transition-all">
                        <div className="h-6 w-10 bg-gray-200 rounded flex items-center justify-center text-[8px] font-bold text-blue-900">
                          VISA
                        </div>
                        <div className="h-6 w-10 bg-gray-200 rounded flex items-center justify-center text-[8px] font-bold text-red-600">
                          MC
                        </div>
                        <div className="h-6 w-10 bg-gray-200 rounded flex items-center justify-center text-[8px] font-bold text-blue-500">
                          AMEX
                        </div>
                        <div className="h-6 w-10 bg-gray-200 rounded flex items-center justify-center text-[8px] font-bold text-blue-700">
                          PAYPAL
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* You Might Also Like */}
          <div className="mt-16 border-t border-gray-100 dark:border-gray-800 pt-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#181113] dark:text-white">
                You Might Also Like
              </h2>
              <Link
                to="/products"
                className="text-primary font-bold text-sm hover:underline"
              >
                View All
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
              {recommendedProducts.map((p) => (
                <div key={p.id} className="group cursor-pointer">
                  <Link to={`/product/${p.id}`}>
                    <div className="aspect-[4/5] w-full rounded-2xl bg-gray-100 dark:bg-gray-800 overflow-hidden relative mb-3">
                      <div
                        className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                        style={{ backgroundImage: `url("${p.image}")` }}
                      ></div>
                      {/* Ideally we add an addToCart button here too in future, but linking to product is safer/user journey map */}
                    </div>
                    <h3 className="font-bold text-[#181113] dark:text-white group-hover:text-primary transition-colors">
                      {p.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      ₦{p.price.toLocaleString()}
                    </p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default Cart;
```

### src/pages/ProductDetails.jsx

```jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";

const ProductDetails = ({ toggleDarkMode, darkMode }) => {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));
  const [selectedImage, setSelectedImage] = useState(product?.image);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    if (product) {
      setSelectedImage(product.image);
    }
    window.scrollTo(0, 0);
  }, [product]);

  if (!product) {
    return (
      <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
        <div className="flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark text-[#181113] dark:text-white antialiased">
          <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
          <div className="flex-1 flex items-center justify-center">
            <h2 className="text-2xl font-bold">Product not found</h2>
          </div>
          <Footer />
        </div>
      </div>
    );
  }

  // Get similar products (excluding current one)
  const similarProducts = products
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return (
    <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
      <div className="flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark text-[#181113] dark:text-white antialiased font-display">
        <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} />

        {/* Main Content */}
        <main className="flex-1 w-full flex justify-center py-6 px-4 md:px-10 lg:px-40">
          <div className="w-full max-w-[1280px]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Left Column: Image Gallery */}
              <div className="lg:col-span-7 flex flex-col gap-4">
                {/* Main Image */}
                <div className="w-full aspect-[3/4] md:aspect-[4/3] lg:aspect-[3/4] rounded-xl overflow-hidden bg-gray-100 relative group">
                  {product.badge && (
                    <div className="absolute top-4 left-4 z-10 bg-white/90 dark:bg-black/60 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-primary uppercase tracking-wide shadow-sm">
                      {product.badge}
                    </div>
                  )}
                  <div
                    className="w-full h-full bg-center bg-cover transition-transform duration-500 hover:scale-105"
                    style={{ backgroundImage: `url("${selectedImage}")` }}
                  ></div>
                  <button
                    onClick={() => {
                      const currentIndex =
                        product.images.indexOf(selectedImage);
                      const prevIndex =
                        currentIndex === 0
                          ? product.images.length - 1
                          : currentIndex - 1;
                      setSelectedImage(product.images[prevIndex]);
                    }}
                    className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/80 dark:bg-black/50 p-2 rounded-full hover:bg-white dark:hover:bg-black transition-all opacity-0 group-hover:opacity-100"
                  >
                    <span className="material-symbols-outlined">
                      chevron_left
                    </span>
                  </button>
                  <button
                    onClick={() => {
                      const currentIndex =
                        product.images.indexOf(selectedImage);
                      const nextIndex =
                        currentIndex === product.images.length - 1
                          ? 0
                          : currentIndex + 1;
                      setSelectedImage(product.images[nextIndex]);
                    }}
                    className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/80 dark:bg-black/50 p-2 rounded-full hover:bg-white dark:hover:bg-black transition-all opacity-0 group-hover:opacity-100"
                  >
                    <span className="material-symbols-outlined">
                      chevron_right
                    </span>
                  </button>
                </div>

                {/* Thumbnails Grid */}
                <div className="grid grid-cols-4 gap-3">
                  {product.images && product.images.length > 0 ? (
                    product.images.map((img, idx) => (
                      <div
                        key={idx}
                        className={`aspect-square rounded-lg border-2 overflow-hidden cursor-pointer ${
                          selectedImage === img
                            ? "border-primary"
                            : "border-transparent hover:border-gray-300"
                        }`}
                        onClick={() => setSelectedImage(img)}
                      >
                        <div
                          className="w-full h-full bg-center bg-cover"
                          style={{ backgroundImage: `url("${img}")` }}
                        ></div>
                      </div>
                    ))
                  ) : (
                    // Fallback if no images array, just show main image as thumb
                    <div
                      className={`aspect-square rounded-lg border-2 overflow-hidden cursor-pointer border-primary`}
                      onClick={() => setSelectedImage(product.image)}
                    >
                      <div
                        className="w-full h-full bg-center bg-cover"
                        style={{ backgroundImage: `url("${product.image}")` }}
                      ></div>
                    </div>
                  )}

                  {/* Video Thumbnail Placeholder (Keep provided UI) */}
                  <div className="aspect-square rounded-lg border border-transparent hover:border-gray-300 overflow-hidden cursor-pointer opacity-70 hover:opacity-100 transition-all flex items-center justify-center bg-[#f4f0f2] dark:bg-[#3a1d25]">
                    <span className="material-symbols-outlined text-3xl text-[#89616f]">
                      play_circle
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Product Details & Controls */}
              <div className="lg:col-span-5 relative">
                <div className="sticky top-24 flex flex-col gap-6">
                  {/* Header Section */}
                  <div>
                    <div className="flex justify-between items-start">
                      <h1 className="text-[#181113] dark:text-white tracking-tight text-[32px] font-bold leading-tight pb-2">
                        {product.name}
                      </h1>
                      <button className="text-[#89616f] hover:text-primary transition-colors">
                        <span className="material-symbols-outlined">
                          favorite
                        </span>
                      </button>
                    </div>
                    <div className="flex items-center gap-2 pb-4">
                      <div className="flex text-amber-400 text-sm">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`material-symbols-outlined !text-[18px] fill-current ${
                              i < Math.floor(product.rating)
                                ? ""
                                : "text-gray-300"
                            }`}
                          >
                            star
                          </span>
                        ))}
                      </div>
                      <span className="text-[#89616f] text-sm font-medium underline cursor-pointer">
                        {product.rating} ({product.reviews} reviews)
                      </span>
                    </div>
                    <div className="flex items-end gap-3">
                      <span className="text-3xl font-bold text-primary">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.originalPrice && (
                        <>
                          <span className="text-lg text-[#89616f] line-through mb-1">
                            ${product.originalPrice}
                          </span>
                          <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-md mb-2">
                            Save 25%
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  <hr className="border-[#f4f0f2] dark:border-[#3a1d25]" />

                  {/* Color Selector */}
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-[#89616f] mb-3">
                      Color:{" "}
                      <span className="text-[#181113] dark:text-white normal-case font-semibold">
                        Jet Black (1B)
                      </span>
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      <button
                        aria-label="Select Jet Black"
                        className="w-12 h-12 rounded-full border-2 border-primary shadow-sm flex items-center justify-center ring-2 ring-offset-2 ring-primary bg-black"
                      ></button>
                      <button
                        aria-label="Select Dark Brown"
                        className="w-12 h-12 rounded-full border border-gray-200 dark:border-gray-600 shadow-sm flex items-center justify-center bg-[#3B2F2F] hover:scale-105 transition-transform"
                      ></button>
                      <button
                        aria-label="Select Ombre Brown"
                        className="w-12 h-12 rounded-full border border-gray-200 dark:border-gray-600 shadow-sm flex items-center justify-center bg-gradient-to-b from-black to-[#8B4513] hover:scale-105 transition-transform"
                      ></button>
                      <button
                        aria-label="Select Ombre Pink"
                        className="w-12 h-12 rounded-full border border-gray-200 dark:border-gray-600 shadow-sm flex items-center justify-center bg-gradient-to-b from-black to-[#FF69B4] hover:scale-105 transition-transform"
                      ></button>
                    </div>
                  </div>

                  {/* Length Selector */}
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-[#89616f] mb-3">
                      Length
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      <button className="px-6 py-2.5 rounded-lg border bg-white dark:bg-[#2a141b] text-[#181113] dark:text-white border-gray-200 dark:border-[#4d2630] font-medium text-sm hover:border-primary hover:text-primary transition-colors">
                        20 inch
                      </button>
                      <button className="px-6 py-2.5 rounded-lg border-2 border-primary bg-primary/5 text-primary font-bold text-sm shadow-sm">
                        26 inch
                      </button>
                      <button className="px-6 py-2.5 rounded-lg border bg-white dark:bg-[#2a141b] text-[#181113] dark:text-white border-gray-200 dark:border-[#4d2630] font-medium text-sm hover:border-primary hover:text-primary transition-colors">
                        30 inch
                      </button>
                      <button className="px-6 py-2.5 rounded-lg border bg-gray-50 dark:bg-[#1f0f14] text-gray-400 border-gray-100 dark:border-[#2d161d] font-medium text-sm cursor-not-allowed">
                        52 inch
                      </button>
                    </div>
                  </div>

                  {/* Quantity and CTA */}
                  <div className="flex gap-4 pt-2">
                    <div className="flex items-center border border-gray-200 dark:border-[#3a1d25] rounded-xl h-12 bg-[#f4f0f2] dark:bg-[#2a141b]">
                      <button
                        className="w-10 h-full flex items-center justify-center text-[#181113] dark:text-white hover:text-primary"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      >
                        <span className="material-symbols-outlined text-sm">
                          remove
                        </span>
                      </button>
                      <input
                        className="w-10 h-full bg-transparent border-none text-center focus:ring-0 font-bold text-[#181113] dark:text-white p-0"
                        type="text"
                        value={quantity}
                        readOnly
                      />
                      <button
                        className="w-10 h-full flex items-center justify-center text-[#181113] dark:text-white hover:text-primary"
                        onClick={() => setQuantity(quantity + 1)}
                      >
                        <span className="material-symbols-outlined text-sm">
                          add
                        </span>
                      </button>
                    </div>
                    <button
                      onClick={() => addToCart(product, quantity)}
                      className="flex-1 bg-primary hover:bg-rose-600 text-white font-bold rounded-xl h-12 flex items-center justify-center gap-2 shadow-lg shadow-rose-200 dark:shadow-rose-900/20 transition-all transform active:scale-[0.98]"
                    >
                      <span className="material-symbols-outlined">
                        shopping_bag
                      </span>
                      Add to Bag - ₦{(product.price * quantity).toLocaleString()}
                    </button>
                  </div>

                  {/* Trust Badges */}
                  <div className="grid grid-cols-3 gap-2 py-4">
                    <div className="flex flex-col items-center gap-2 p-3 bg-gray-50 dark:bg-[#2a141b] rounded-lg text-center">
                      <span className="material-symbols-outlined text-primary">
                        water_drop
                      </span>
                      <span className="text-xs font-medium text-[#181113] dark:text-white">
                        Hot Water Set
                      </span>
                    </div>
                    <div className="flex flex-col items-center gap-2 p-3 bg-gray-50 dark:bg-[#2a141b] rounded-lg text-center">
                      <span className="material-symbols-outlined text-primary">
                        spa
                      </span>
                      <span className="text-xs font-medium text-[#181113] dark:text-white">
                        Itch Free
                      </span>
                    </div>
                    <div className="flex flex-col items-center gap-2 p-3 bg-gray-50 dark:bg-[#2a141b] rounded-lg text-center">
                      <span className="material-symbols-outlined text-primary">
                        local_shipping
                      </span>
                      <span className="text-xs font-medium text-[#181113] dark:text-white">
                        Fast Ship
                      </span>
                    </div>
                  </div>

                  {/* Accordion Info */}
                  <div className="flex flex-col gap-2">
                    <details
                      className="group border border-[#f4f0f2] dark:border-[#3a1d25] rounded-lg bg-white dark:bg-[#1a0c10] open:bg-gray-50 dark:open:bg-[#2a141b] transition-colors"
                      open
                    >
                      <summary className="flex justify-between items-center p-4 cursor-pointer list-none font-bold text-[#181113] dark:text-white select-none">
                        <span>Description</span>
                        <span className="material-symbols-outlined transform group-open:rotate-180 transition-transform">
                          expand_more
                        </span>
                      </summary>
                      <div className="px-4 pb-4 text-sm text-[#89616f] leading-relaxed">
                        {product.description ||
                          "Our Lux Braid Pre-Stretched Extension is made from premium Kanekalon fiber, offering a soft, human-hair-like texture. It's pre-feathered and pre-stretched to save you prep time. Lightweight and tangle-free for effortless braiding."}
                      </div>
                    </details>
                    <details className="group border border-[#f4f0f2] dark:border-[#3a1d25] rounded-lg bg-white dark:bg-[#1a0c10] open:bg-gray-50 dark:open:bg-[#2a141b] transition-colors">
                      <summary className="flex justify-between items-center p-4 cursor-pointer list-none font-bold text-[#181113] dark:text-white select-none">
                        <span>Specifications</span>
                        <span className="material-symbols-outlined transform group-open:rotate-180 transition-transform">
                          expand_more
                        </span>
                      </summary>
                      <div className="px-4 pb-4 text-sm text-[#89616f] leading-relaxed">
                        <ul className="list-disc pl-5 space-y-1">
                          {product.specs ? (
                            product.specs.map((spec, i) => (
                              <li key={i}>{spec}</li>
                            ))
                          ) : (
                            <>
                              <li>Weight: 90g per pack</li>
                              <li>Material: Synthetic Fiber</li>
                              <li>Texture: Yaki Straight</li>
                            </>
                          )}
                        </ul>
                      </div>
                    </details>
                    <details className="group border border-[#f4f0f2] dark:border-[#3a1d25] rounded-lg bg-white dark:bg-[#1a0c10] open:bg-gray-50 dark:open:bg-[#2a141b] transition-colors">
                      <summary className="flex justify-between items-center p-4 cursor-pointer list-none font-bold text-[#181113] dark:text-white select-none">
                        <span>Shipping & Returns</span>
                        <span className="material-symbols-outlined transform group-open:rotate-180 transition-transform">
                          expand_more
                        </span>
                      </summary>
                      <div className="px-4 pb-4 text-sm text-[#89616f] leading-relaxed">
                        Free shipping on orders over $50. Returns accepted
                        within 30 days if product is unopened and in original
                        packaging.
                      </div>
                    </details>
                  </div>
                </div>
              </div>
            </div>

            {/* Reviews Section - Static as in HTML but using colors variables */}
            <div className="mt-20 border-t border-[#f4f0f2] dark:border-[#3a1d25] pt-10">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-[#181113] dark:text-white">
                  Customer Reviews
                </h2>
                <button className="text-primary font-bold text-sm hover:underline">
                  Write a Review
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Review 1 */}
                <div className="p-6 rounded-xl bg-white dark:bg-[#1a0c10] border border-[#f4f0f2] dark:border-[#3a1d25] shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-10 h-10 rounded-full bg-gray-200 bg-cover bg-center"
                      style={{
                        backgroundImage:
                          'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDoyqpJrti_DjNB3vjF_JplmM_cSkOQJcuHP4kLcppxTHS6SOX2-8G_ALOaLE3HigV5M4WJakqRuLMkEgu6QiUSxr-rwur6-zcZAuBwKZjBJUPdwaUBnBdV5QXpFmJNql5FqDMwhAE_lXw2wEKX2tXgks6vb69DldOBU2Z8ysngZihfttsU-owP6nNGTNBCOViiJ5NiFJrFEoX2H9p2YCQWfrQc7QQhrr2obXWRgaVmW186J5Of2J-IO8S_aizKEXd2Eb47fL0S7mE")',
                      }}
                    ></div>
                    <div>
                      <h4 className="font-bold text-sm text-[#181113] dark:text-white">
                        Sarah M.
                      </h4>
                      <div className="flex text-amber-400 text-xs">
                        <span className="material-symbols-outlined !text-[14px] fill-current">
                          star
                        </span>
                        <span className="material-symbols-outlined !text-[14px] fill-current">
                          star
                        </span>
                        <span className="material-symbols-outlined !text-[14px] fill-current">
                          star
                        </span>
                        <span className="material-symbols-outlined !text-[14px] fill-current">
                          star
                        </span>
                        <span className="material-symbols-outlined !text-[14px] fill-current">
                          star
                        </span>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400 ml-auto">
                      2 days ago
                    </span>
                  </div>
                  <h5 className="font-bold text-sm mb-2 text-[#181113] dark:text-white">
                    Best braiding hair!
                  </h5>
                  <p className="text-sm text-[#89616f] leading-relaxed">
                    The texture is amazing and it didn't hurt my fingers while
                    braiding. The color blend is seamless.
                  </p>
                  <div className="flex gap-2 mt-4">
                    <div
                      className="w-16 h-16 rounded-lg bg-cover bg-center"
                      style={{
                        backgroundImage:
                          'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAXbhqUtLyX537BDKD5w3qHaIenDH-9raq0jl1I4WRtp85TGOTppj0LLU8Yaiy1xPE9RXBEEnioDGbIkONeJIcPKuYHR1ImfRn8M6murrQjbT2juC2I5xDDqlvPLaQ_z2cq0VCa-hmmdEtkwScPcFEfpiSSGHN6PjfdbFKxokOGBTJEZ2qhVSy2PV9iBJ8I7gQFT_zuashRhgRUfXCNSPD-U-529hCy_CHlsN69VlNZxQgCou81WISy3xEgWlHbCcihxSA_5f-k5v8")',
                      }}
                    ></div>
                  </div>
                </div>
                {/* Review 2 */}
                <div className="p-6 rounded-xl bg-white dark:bg-[#1a0c10] border border-[#f4f0f2] dark:border-[#3a1d25] shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-[#89616f] font-bold">
                      JD
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-[#181113] dark:text-white">
                        Jessica D.
                      </h4>
                      <div className="flex text-amber-400 text-xs">
                        <span className="material-symbols-outlined !text-[14px] fill-current">
                          star
                        </span>
                        <span className="material-symbols-outlined !text-[14px] fill-current">
                          star
                        </span>
                        <span className="material-symbols-outlined !text-[14px] fill-current">
                          star
                        </span>
                        <span className="material-symbols-outlined !text-[14px] fill-current">
                          star
                        </span>
                        <span className="material-symbols-outlined !text-[14px] fill-current text-gray-300">
                          star
                        </span>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400 ml-auto">
                      1 week ago
                    </span>
                  </div>
                  <h5 className="font-bold text-sm mb-2 text-[#181113] dark:text-white">
                    Great value
                  </h5>
                  <p className="text-sm text-[#89616f] leading-relaxed">
                    Really good quality for the price. I just wish the shipping
                    was slightly faster, but the product itself is top notch.
                  </p>
                </div>
                {/* Review 3 */}
                <div className="p-6 rounded-xl bg-white dark:bg-[#1a0c10] border border-[#f4f0f2] dark:border-[#3a1d25] shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-10 h-10 rounded-full bg-gray-200 bg-cover bg-center"
                      style={{
                        backgroundImage:
                          'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDhqZOrsSOaLPCQnuwkwQKZAnE1rnJ9QgTj1xY5fo4yc8xPw750apETiq5kni87o3J-bW9kGcMmhoPSkPBmZv2QuANbyx-fHXgXyRXzvboTgglfXjbAnwPO-Q11io1k96h9StGio7AXj8PnfIlptXHMsDTuQIDH1vLxk_GWL8RjqmMw7CI7m6scj2fHJm_AwEr4xeHZa8WL7zmkxXpCOQVzOuXAfbVnJkFNC2G-iui8r0eDzHpv4w9B4EB9H5IXPP6iN9eQI6VLKio")',
                      }}
                    ></div>
                    <div>
                      <h4 className="font-bold text-sm text-[#181113] dark:text-white">
                        Keisha L.
                      </h4>
                      <div className="flex text-amber-400 text-xs">
                        <span className="material-symbols-outlined !text-[14px] fill-current">
                          star
                        </span>
                        <span className="material-symbols-outlined !text-[14px] fill-current">
                          star
                        </span>
                        <span className="material-symbols-outlined !text-[14px] fill-current">
                          star
                        </span>
                        <span className="material-symbols-outlined !text-[14px] fill-current">
                          star
                        </span>
                        <span className="material-symbols-outlined !text-[14px] fill-current">
                          star
                        </span>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400 ml-auto">
                      2 weeks ago
                    </span>
                  </div>
                  <h5 className="font-bold text-sm mb-2 text-[#181113] dark:text-white">
                    Love the Ombre!
                  </h5>
                  <p className="text-sm text-[#89616f] leading-relaxed">
                    The ombre pink transition is perfect. It looks exactly like
                    the pictures. Will definitely buy again.
                  </p>
                </div>
              </div>
            </div>

            {/* You might also like (Dynamic from data) */}
            <div className="mt-20 mb-20">
              <h3 className="text-xl font-bold text-[#181113] dark:text-white mb-6">
                You might also like
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {similarProducts.map((p) => (
                  <Link
                    to={`/product/${p.id}`}
                    key={p.id}
                    className="flex flex-col gap-3 group cursor-pointer"
                  >
                    <div
                      className="w-full bg-center bg-no-repeat aspect-[3/4] bg-cover rounded-xl relative overflow-hidden"
                      style={{ backgroundImage: `url("${p.image}")` }}
                    >
                      <button className="absolute bottom-3 right-3 bg-white p-2 rounded-full shadow-md translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 text-primary">
                        <span className="material-symbols-outlined text-[20px]">
                          add_shopping_cart
                        </span>
                      </button>
                    </div>
                    <div className="flex flex-col">
                      <h4 className="text-[#181113] dark:text-white font-bold text-sm">
                        {p.name}
                      </h4>
                      <p className="text-[#89616f] text-sm">
                        ₦{p.price.toLocaleString()}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default ProductDetails;
```
