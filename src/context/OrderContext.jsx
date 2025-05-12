import  { createContext, useContext, useEffect, useState } from "react";
const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
    const [counter, setCounter] = useState(0);

    const [orderCart, setOrderCart] = useState(() => {
        const datosGuardados = localStorage.getItem('cartOrdered');
        return datosGuardados ? JSON.parse(datosGuardados) : [];
    });

    useEffect(() => {
        localStorage.setItem('cartOrdered', JSON.stringify(orderCart));
    }, [orderCart]);
    

    const toOrder = (producto, quantity, price) => {
        const total = quantity * price;
        
        setOrderCart((prev) => {
            const existingItem = prev.find((item) => item.name === producto);
            if (existingItem) {
                return prev.map((item) => {
                    if (item.name === producto) {
                        return { ...item, cantidad: quantity, total: total.toFixed(2) };
                    }
                    return item;
                });
            } else {
                return [...prev, { name: producto, cantidad: quantity, price: price, total: total.toFixed(2) }];
            }
        });
    }

    const totalPay = orderCart.reduce( (acc, item) => acc + item.total,0);
    useEffect (() => {
        setCounter(orderCart.reduce((acc, item) => acc + item.cantidad, 0));
    }, [orderCart]);       

    const clearCart = () => {
        setOrderCart([]);
    }

    return (
        <OrderContext.Provider value={{ 
            orderCart, setOrderCart,
            counter, setCounter,
            toOrder,clearCart, totalPay }}>
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