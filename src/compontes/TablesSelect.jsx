import { useOrderContext } from '../context/OrderContext';
import { useTablesContext } from '../context/TablesContext';

import { useCalcsContext } from "../context/CalcsContext";

function TablesSelect() {
    const { table, tables, setTableActual, tableActual, seleccionable, setSeleccionable } = useCalcsContext();
    const { setActualOrder, setOrderCart, orderCart, actualOrder } = useCalcsContext();


    const orderAction = document.getElementById('order-action')
    function makeOrder() { //Resetea los botones 
        document.querySelectorAll('[data-type="table"]').forEach((elemento) => {
            elemento.querySelector('img').classList.add('invisible')
            elemento.classList.remove('border-2', 'bg-rosado-90', 'border-rosado-30', 'border-2', 'opacity-20', 'cursor-not-allowed')
            elemento.classList.add('cursor-pointer', "bg-rosado-50")
            orderAction.classList.toggle('hidden')
        });
    
        setSeleccionable(true)
        setTableActual(null);
    }

    function cancelOrder() {//Resetea los botones y elimina el pedido de la mesa actual
        setOrderCart((prev) => prev.filter((item) =>  item.table !== tableActual));

        setActualOrder([]);
        setSeleccionable(true) 
        setTableActual(null);
        makeOrder() //Resetea los botones
    }

    function consolea() {
        //console.clear()
        console.log("seleccionable:", seleccionable)
        console.log("tableActual: ", tableActual)
        console.log("orderCart: ", orderCart)
        console.log("actualOrder: ", actualOrder)
    }

    function handleTable(clickado, table) { //Activacion de la mesa
        if (!seleccionable)  return 

        document.querySelectorAll('[data-type="table"]').forEach((elemento) => {
            elemento.querySelector('img').classList.add('invisible')
            elemento.classList.remove('cursor-pointer')
            elemento.classList.add('opacity-20', 'cursor-not-allowed')
            orderAction.classList.toggle('hidden')
            if (Number(clickado.id) === table.id) {
                clickado.classList.remove('bg-rosado-50', 'opacity-20')
                clickado.classList.add('border-2', 'bg-rosado-90', 'border-rosado-30', 'border-2')
                clickado.querySelector('img').classList.remove('invisible')
            }
            setSeleccionable(false)
            setTableActual(table.id);
            setActualOrder(orderCart.filter((item) => item.table === table.id)); //Carga el pedido de la mesa
        });
    }

    return (
        <div>
            <div className="flex flex-col items-center">
                <h2 className="text-2xl font-bold mb-4"
                    onClick={() => consolea()}>
                    Select a Table</h2>
                <div className=" grid grid-cols-3 gap-2 w-full">
                    {tables.map((table) => (
                        <button
                            key={table.id}
                            id={table.id}
                            data-type={`table`}
                            className={`text-sm gap-2 flex items-center px-4 py-2 w-fit rounded-md cursor-pointer bg-rosado-50 text-rosado-10`}
                            onClick={(e) => handleTable(e.target, table)}
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
                        onClick={() => makeOrder()}
                        className='bg-verde cursor-pointer px-4 py-2 rounded-md text-rosado-10'>Make Order</button>
                    <button
                        onClick={() => cancelOrder()}
                        className='bg-rojo cursor-pointer px-4 py-2 rounded-md text-rosado-10'>Cancel Order</button>
                </div>
            </div>
        </div>
    )
}

export default TablesSelect