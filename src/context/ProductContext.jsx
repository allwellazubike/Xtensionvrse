import axios from "axios";
import { createContext, useState, useContext, useEffect } from "react";

const ProductContext = createContext();

export const useProducts = () => {
    return useContext(ProductContext);
};

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:3000/api/products")
            .then((res) => {
                setProducts(res.data); // products data in res
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
            });
    }, []);

    const value = {
        products,
    };

    return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};
