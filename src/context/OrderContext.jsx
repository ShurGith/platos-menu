/* eslint-disable react-hooks/exhaustive-deps */
import  { createContext, useContext, useEffect, useState } from "react";
const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
    const [counter, setCounter] = useState(0);
    const [tablesSelect, setTablesSelect] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [table, setTable] = useState(null);
    const [orderCart, setOrderCart] = useState(() => {
        const primerosDatos = localStorage.getItem('cartOrdered');
        return primerosDatos ? JSON.parse(primerosDatos) : [];
  
    });
    const [actual, setActual] = useState([]);

    //const productosGuardados = JSON.parse(localStorage.getItem("cartOrdered"));

    /** Mesas */

    const arrayTable = (table) => {
        setTablesSelect((prevTablesSelect) => {
            if (prevTablesSelect.includes(table)) {
                // Si el número está, lo quitamos
                return prevTablesSelect.filter(n => n !== table);
                
            } else {
                // Si no está, lo añadimos
               return  [...prevTablesSelect, table];
            }
          });         

        //  console.log(tablesSelect); 
    };




    function removeItem(id) {
        setOrderCart((prev) => prev.filter((item) => item.id !== id));
        document.getElementById(id).querySelector('img').classList.remove('border-2', 'border-rosado-50')
    }
    
    useEffect(() => {
        localStorage.setItem('cartOrdered', JSON.stringify(orderCart));
        setActual(JSON.stringify(orderCart));
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
                return [...prev, {table:table, id:id, name:name, cantidad:quantity, price:price, total:total.toFixed(2), image:image }];
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
            toOrder, actual, arrayTable,
            removeItem, table, setTable,
            openModal, setOpenModal,
            tablesSelect, setTablesSelect,
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