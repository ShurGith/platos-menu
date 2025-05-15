/* eslint-disable react-hooks/exhaustive-deps */
import { createContext,  useContext, useEffect, useState } from "react";
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
  //  const [thisOrder, setThisOrder] = useState(false)
   /* function removeItem(id) {
        setOrderCart((prev) => prev.filter((item) => !(item.id === id && item.table === tableActual)));
        document.getElementById(id).querySelector('img').classList.remove('border-2', 'border-rosado-50')
    }
 */

    const hayData = actualOrder && actualOrder.length > 0;
    const totalItems = 1
    const totalPay = hayData && actualOrder.reduce((acc, item) => acc + Number(item.total), 0).toFixed(2);


    // Guardar los pedidos actualizados en localStorage
    useEffect(() => {
        localStorage.setItem("cartOrdered", JSON.stringify(orderCart));
    }, [orderCart]);


    // Obtener un pedido específico por mesa
    function getOrderByTable(tableNumber) {
        return orderCart.find(order => order.table === tableNumber) || [];
    }

    useEffect(() => {
        setActualOrder(getOrderByTable(tableActual).item || []);
    }, [ tableActual]);


    // Agregar o actualizar un pedido por mesa
    const addOrUpdateOrder = (tableNumber, item) => {
        setOrderCart(prevOrders => {
            const existingIndex = prevOrders.findIndex(order => order.table === tableNumber);
            if (existingIndex !== -1) {
                const updated = [...prevOrders];
                updated[existingIndex].item = item;
                return updated;
            }
            return [...prevOrders, { table: tableNumber, item }];
        });
        };

    // Eliminar un pedido por mesa
    function deleteOrder(tableNumber) {
        setOrderCart(prevOrders => prevOrders.filter(order => order.table !== tableNumber));
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
            actualOrder, setActualOrder,
        //    removeItem,
            openModal, setOpenModal,hayData, totalItems, totalPay,
            getOrderByTable,
            addOrUpdateOrder, 
            deleteOrder, 
            //thisOrder, setThisOrder,
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