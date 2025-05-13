/* eslint-disable react-hooks/exhaustive-deps */
import  { createContext, useContext, useEffect, useState } from "react";
import { useTablesContext } from "./TablesContext";
const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
    const [counter, setCounter] = useState(0);
    const [openModal, setOpenModal] = useState(false);
    const [orderCart, setOrderCart] = useState(() => {
        const primerosDatos = localStorage.getItem('cartOrdered');
        return primerosDatos ? JSON.parse(primerosDatos) : [];
    });
    const [actualOrder, setActualOrder] = useState([]);
    const { tables } = useTablesContext();
/*
 function toOrder(table, id, name, quantity, price, image) {
        const total = quantity * price;
        const newItem = { id, name, quantity, price, total, image };
        setOrderCart((prev) => {
            const existingItem = prev.find((item) => item.id === id);
            if (existingItem) {
                return prev.map((item) => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity + quantity, total: item.total + total };
                    }
                    return item;
                });
            } else {
                return [...prev, newItem];
            }
        });
    }
        */

    function removeItem(id) {
        setOrderCart((prev) => prev.filter((item) => item.id !== id));
        document.getElementById(id).querySelector('img').classList.remove('border-2', 'border-rosado-50')
    }
    
    useEffect(() => {
        localStorage.setItem('cartOrdered', JSON.stringify(orderCart));
        setActualOrder(JSON.stringify(orderCart));
    }, [orderCart]);
    
    
    const toOrder = (table, id, name, quantity, price, image) => {
        const total = quantity * price;
        
        setOrderCart((prev) => {
            const existingItem = prev.find((item) => item.id === id);
            if (existingItem) {
                return prev.map((item) => {
                    if (item.id === id) {
                        return { ...item, cantidad: quantity, total: total.toFixed(2) };
                    }
                    return item;
                });
            } else {
                return [...prev, { table: table, id:id, name:name, cantidad:quantity, price:price, total:total.toFixed(2), image:image }];
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
          //  tableActual, setTableActual,
            toOrder, actualOrder, //arrayTable,
            removeItem, //table, setTable,
            openModal, setOpenModal,
            //tablesSelect, setTablesSelect,
             }}>
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