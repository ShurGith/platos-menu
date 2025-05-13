import { createContext, useContext, useEffect, useState } from "react";
const TablesContext = createContext();

export const TablesProvider = ({ children }) => {
    const [tablesSelect, setTablesSelect] = useState([]);
    const [table, setTable] = useState(null);
    const [tableActual, setTableActual] = useState(null);

    const tables = [
        { id: 1, name: 'Table 1' },
        { id: 2, name: 'Table 2' },
        { id: 3, name: 'Table 3' },
        { id: 4, name: 'Table 4' },
        { id: 5, name: 'Table 5' },
        { id: 6, name: 'Table 6' },
        { id: 7, name: 'Table 7' },
        { id: 8, name: 'Table 8' },
        { id: 9, name: 'Table 9' },
    ]



    return (
        <TablesContext.Provider value={{
            tables,
            tablesSelect,setTablesSelect,
            table,setTable,
            tableActual, setTableActual

        }}>
            {children}
        </TablesContext.Provider>
    );
};


export const useTablesContext = () => {
    const context = useContext(TablesContext);
    if (!context) {
        throw new Error("TablesContext debe usarse dentro de un Provider de TablesContext");
    }
    return context;
};