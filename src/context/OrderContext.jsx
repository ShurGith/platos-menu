import  { createContext, useContext, useState } from "react";
const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
    const [name, setName] = useState("Valor inicial");
    const [counter, setCounter] = useState(0);

    const [orderCart, setOrderCart] = useState(() => {
        // Cargar carrito desde localStorage al inicio
        const datosGuardados = localStorage.getItem('cartOrdered');
        return datosGuardados ? JSON.parse(datosGuardados) : [];

    });


    const toOrder = (producto, quantity = 1, operacion = false) => {
        setOrder((prev) => {
            const intoCart = prev.find((item) => item.id === producto.id);
            if (intoCart) {
                operacion ? quantity = -quantity : quantity;
                return prev.map((item) =>
                    item.id === producto.id
                        ? { ...item, cantidad: item.cantidad + quantity }
                        : item
                );
            } else {
                return [...prev, { ...producto, cantidad: quantity }];
            }
        });
    }


    const intoCart = (product) => {
        return toOrder.find(item => item.id === product.id);
    };


    const clearCart = () => {
        setOrderCart([]);
    }

    return (
        <OrderContext.Provider value={{ 
            name, setName,
            orderCart, setOrderCart,
            counter, setCounter,
            toOrder,clearCart }}>
            {children}
        </OrderContext.Provider>
    );
};

export const useOrderContext = () => {
    const context = useContext(OrderContext);
    if (!context) {
        throw new Error("useMyContext debe usarse dentro de un MyProvider");
    }
    return context;
};