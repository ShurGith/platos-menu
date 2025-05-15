import { createContext, useContext } from "react";
import { useTablesContext } from "./TablesContext";
import { useOrderContext } from "./OrderContext";

const CalcsContext = createContext();


export const CalcsProvider = ({ children }) => {
    const { table, tables, tableActual, setTableActual, setSeleccionable, seleccionable } = useTablesContext();

    const { orderCart, counter, setCounter, setActualOrder, openModal, setOpenModal, setOrderCart, removeItem, toOrder,
        getOrderByTable,  actualOrder,thisOrder, setThisOrder,
        addOrUpdateOrder, 
        deleteOrder 
     } = useOrderContext();

  
    
    const hayData = actualOrder && actualOrder.length > 0;
    const totalItems=1
    const totalPay = hayData && actualOrder.reduce((acc, item) => acc + Number(item.total), 0).toFixed(2);

    return (
        <CalcsContext.Provider value={{
            table, tables, tableActual, setTableActual, setSeleccionable, seleccionable,
            hayData,  removeItem, totalItems, totalPay, toOrder, counter,
            orderCart, setCounter, actualOrder,setActualOrder, openModal, setOrderCart,
            setOpenModal, getOrderByTable, thisOrder, setThisOrder,
            addOrUpdateOrder,
            deleteOrder,
        }}>
            {children}
        </CalcsContext.Provider>
    );
}

export const useCalcsContext = () => {
    const context = useContext(CalcsContext);
    if (!context) {
        throw new Error("useMyContext debe usarse dentro de un MyProvider");
    }
    return context;
};