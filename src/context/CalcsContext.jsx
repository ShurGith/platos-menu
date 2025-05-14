import { createContext, useContext } from "react";
import { useTablesContext } from "./TablesContext";
import { useOrderContext } from "./OrderContext";

const CalcsContext = createContext();


export const CalcsProvider = ({ children }) => {
    const { table, tables, tableActual, setTableActual, setSeleccionable, seleccionable } = useTablesContext();
    const { orderCart, counter, setCounter, setActualOrder, openModal, setOpenModal, setOrderCart, removeItem, toOrder } = useOrderContext();

    const data = orderCart && orderCart.filter((item) => item.table === tableActual);
    const hayData = data && data.length > 0;
    const totalItems = hayData && data.reduce((acc, item) => acc + item.cantidad, 0);
    const totalPay = hayData && data.reduce((acc, item) => acc + Number(item.total), 0).toFixed(2);


    function makeOrder() { //Resetea los botones 
        const orderAction = document.getElementById('order-action')
        document.querySelectorAll('[data-type="table"]').forEach((elemento) => {
            elemento.querySelector('img').classList.add('invisible')
            elemento.classList.remove('border-2', 'bg-rosado-90', 'border-rosado-30', 'border-2', 'opacity-20', 'cursor-not-allowed')
            elemento.classList.add('cursor-pointer', "bg-rosado-50")
            orderAction.classList.toggle('hidden')
        });
    }

    return (
        <CalcsContext.Provider value={{
            table, tables, tableActual, setTableActual, setSeleccionable, seleccionable,
            hayData, data, removeItem, totalItems, totalPay, toOrder, counter,
            orderCart, setCounter, setActualOrder, openModal, setOrderCart,
            setOpenModal, makeOrder
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