/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useEffect, useState } from "react";
import { useTablesContext } from "./TablesContext";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
    const [counter, setCounter] = useState(0);
    const [openModal, setOpenModal] = useState(false);
    const [orderCart, setOrderCart] = useState(() => {
        const datosGuardados = localStorage.getItem('cartOrdered');
        return datosGuardados ? JSON.parse(datosGuardados) : [];
    });
    const { tableActual } = useTablesContext();
    const [actualOrder, setActualOrder] = useState([]);

    function removeItem(id) {
        setOrderCart((prev) => prev.filter((item) => !(item.id === id && item.table === tableActual)));
        document.getElementById(id).querySelector('img').classList.remove('border-2', 'border-rosado-50')
    }

    useEffect(() => {
        localStorage.setItem('cartOrdered', JSON.stringify(orderCart));
    }, [orderCart]);

    const toOrder = (table, id, name, quantity, price, image) => {
        const total = quantity * price;
        setOrderCart((prev) => {
            const existingItem = prev.some(item => item.id === id && item.table === table);
            if (existingItem) {
                return prev.map((item) => {
                    if (item.id === id && item.table === table) {
                        return { ...item, cantidad: quantity, total: total.toFixed(2) };
                    }
                    return item;
                });
            } else {
                return [...prev, {
                    table: table, id: id,
                    name: name, cantidad: quantity,
                    price: price, total: total.toFixed(2),
                    image: image
                }];
            }
        });
    }

    useEffect(() => {
        setCounter(
            orderCart.reduce((acc, item) => item.table === tableActual ? acc + item.cantidad : acc, 0)
        );

    }, [orderCart, tableActual]);


    return (
        <OrderContext.Provider value={{
            orderCart, setOrderCart,
            counter, setCounter,
            toOrder,
            actualOrder, setActualOrder,
            removeItem,
            openModal, setOpenModal,
        }}>
            {children}
        </OrderContext.Provider>
    );
};

export const useOrderContext = () => {
    const context = useContext(OrderContext);
    if (!context) {
        throw new Error("useOrderContext debe usarse dentro de un OrderProvider");
    }
    return context;
};