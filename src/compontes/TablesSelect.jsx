import { useState } from 'react'
import { useOrderContext } from '../context/OrderContext';

function TablesSelect() {
    const { tablesSelect, setTablesSelect, arrayTable, setTableActual,tableActual } = useOrderContext();
    const [selectedTable, setSelectedTable] = useState(null);
    const [selcionable, setSelcionable] = useState(true);
    const orderAction = document.getElementById('order-action')
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

    function handldleClick(elemento, table) {
        if(!selcionable){
            return
        }
        document.querySelectorAll('[data-type="table"]').forEach((elemento) => {
            elemento.querySelector('img').classList.add('invisible')
            elemento.classList.remove('cursor-pointer')
            elemento.classList.add('opacity-20', 'cursor-not-allowed')
            orderAction.classList.remove('hidden')
            orderAction.classList.add('flex')
            if (Number(elemento.id) === table.id) {
                elemento.classList.remove('bg-rosado-50', 'opacity-20')
                elemento.classList.add('border-2', 'bg-rosado-90' , 'border-rosado-30', 'border-2')
                elemento.querySelector('img').classList.remove('invisible')
            }
            setSelcionable(false)
            setTableActual(table.id);
        });
       // arrayTable(table.id);
        setSelectedTable(table.id);
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
                            className={`text-sm  gap-2 flex items-center px-4 py-2 w-fit rounded-md cursor-pointer bg-rosado-50 text-rosado-10`}
                            onClick={(e) => handldleClick(e.target, table)}
                        >
                            <img src={`/assets/images/icon-order-confirmed.svg`} alt={`Table ${table.id}`} className="size-6 invisible pointer-events-none" />
                            {table.name}
                        </button>
                    ))}
                </div>
            </div>
            <div id="order-action" className=" flex-col items-center gap-2 mt-6 hidden">
            <h2 className="text-2xl font-bold">Make Action</h2>
            <div className="flex justify-center gap-2 w-full">
                <button 
                onClick={()=>makeOrder}
                className='bg-verde cursor-pointer px-4 py-2 rounded-md text-rosado-10'>Make Order</button>
                <button 
                onClick={()=>cancelOrder}
                className='bg-rojo cursor-pointer px-4 py-2 rounded-md text-rosado-10'>Cancel Order</button>
            </div>
            </div>
        </div>
    )
}

export default TablesSelect