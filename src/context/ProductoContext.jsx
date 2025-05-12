import  { createContext, useContext, useEffect, useState } from "react";
const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('/data/data.json')
            .then((res) => res.json())
            .then((json) => setData(json))
            .catch((err) => console.error('Error al cargar el JSON:', err));
    }, []);



    return (
        <ProductContext.Provider value={{
            data
        }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProduct = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error("useProduct debe usarse dentro de un ProductProvider ");
    }
    return context;
};