/* eslint-disable react-hooks/exhaustive-deps */
import  { createContext, useContext, useEffect, useState } from "react";
const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
    const [counter, setCounter] = useState(0);

    const [orderCart, setOrderCart] = useState(() => {
        const datosGuardados = localStorage.getItem('cartOrdered');
        return datosGuardados ? JSON.parse(datosGuardados) : [];
    });
    const [actual, setActual] = useState([]);


    function clearCart() {
        setOrderCart([]);
    }

    function removeItem(id) {
        setOrderCart((prev) => prev.filter((item) => item.id !== id));
        document.getElementById(id).querySelector('img').classList.remove('border-2', 'border-rosado-50')
    }
    
    useEffect(() => {
        localStorage.setItem('cartOrdered', JSON.stringify(orderCart));
        setActual(JSON.stringify(orderCart));
    }, [orderCart]);
    
    
    const toOrder = (id,producto, quantity, price, image) => {
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
                return [...prev, {id:id, name: producto, cantidad: quantity, price: price, total: total.toFixed(2), image: image }];
            }
        });
    }

    useEffect (() => {
        setCounter(orderCart.reduce((acc, item) => acc + item.cantidad, 0));
    }, [orderCart]);       

    
    return (
        <OrderContext.Provider value={{ 
            orderCart, setOrderCart,
            counter, setCounter,
            toOrder, actual,
            removeItem, clearCart }}>
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