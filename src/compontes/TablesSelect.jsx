import  { useState } from 'react'
import { useOrderContext } from '../context/OrderContext';

function TablesSelect() {
    const { tablesSelect, setTablesSelect, arrayTable, tableActual } = useOrderContext();
    const [selectedTable, setSelectedTable] = useState(null);

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
 
    function handldleClick(elemento,table) {
        
             // elemento.classList.toggle('border-2', 'border-rosado-50')
             elemento.querySelector('img').classList.toggle('invisible')
               console.log(table.id);
        arrayTable(table.id);
        setSelectedTable(table.id);
/*         console.log(tablesSelect); 
        if (tablesSelect.includes(table.id)) {
            setTablesSelect(tablesSelect.filter((t) => t !== table.id));
        } else {
            setTablesSelect([...tablesSelect, table.id]);
        }
        */
    }

    return (
        <div>
            <div className="flex flex-col items-center">
                <h2 className="text-2xl font-bold mb-4">Select a Table</h2>
                <div className=" grid grid-cols-3 gap-2 w-full">
                {tables.map((table) => (
                    <button
                        key={table.id}
                        id={table.id}
                        data-type={`table`}
                        className={`text-sm  gap-2 flex items-center px-4 py-2 w-fit rounded-md cursor-pointer ${tablesSelect.includes(table.id) ? 'bg-blue-500 text-white' : 'bg-gray-200'
                            }`}
                        onClick={(e) => handldleClick(e.target, table)}
                    >
                    <img src={`/assets/images/icon-order-confirmed.svg`} alt={`Table ${table.id}`} className="size-6 invisible pointer-events-none" />
                        {table.name}
                    </button>
                ))}
                </div>
            </div>
        </div>
    )
}

export default TablesSelect