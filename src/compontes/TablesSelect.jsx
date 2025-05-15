import { useOrderContext } from "../context/OrderContext";
import { useTablesContext } from "../context/TablesContext";

function TablesSelect() {
    const { tables, setTableActual, tableActual, seleccionable, setSeleccionable, intoNow, setIntoNow } = useTablesContext();
    const{ setActualOrder, orderCart, actualOrder, addOrUpdateOrder } = useOrderContext();

    const orderAction = document.getElementById('order-action')

    function makeOrder() { //Resetea los botones 
        document.querySelectorAll('[data-type="table"]').forEach((elemento) => {
            elemento.classList.remove('border-2', 'bg-rosado-90', 'border-rosado-30', 'border-2', 'opacity-20', 'cursor-not-allowed')
            elemento.classList.add('cursor-pointer', "bg-rosado-50")
            orderAction.classList.toggle('hidden')
        });

        addOrUpdateOrder(tableActual, actualOrder)
        setSeleccionable(true)
        setActualOrder([])
        setTableActual(null);
        setIntoNow(false)        
    }

    function cancelOrder() {//Resetea los botones y elimina el pedido de la mesa actual
        setActualOrder([]);
        setSeleccionable(true)
        setTableActual(null);
        setIntoNow(false)        
        makeOrder() //Resetea los botones
    }

    function consolea() {
        console.clear()
        console.log("seleccionable:", seleccionable)
        console.log("tableActual: ", tableActual)
        console.log("orderCart: ", orderCart)
        console.log("actualOrder: ", actualOrder)
        console.log("intoNow: ", intoNow)
    }

    function handleTable(clickado, table) { //Activacion de la mesa
        if (!seleccionable) return

        document.querySelectorAll('[data-type="table"]').forEach((elemento) => {
            elemento.classList.remove('cursor-pointer')
            elemento.classList.add('opacity-20', 'cursor-not-allowed')
            orderAction.classList.toggle('hidden')
            if (Number(clickado.id) === table.id) {
                clickado.classList.remove('bg-rosado-50', 'opacity-20')
                clickado.classList.add('border-2', 'bg-rosado-90', 'border-rosado-30', 'border-2')
            }
            setSeleccionable(false)
            setTableActual(table.id);
        });
    }

    return (
        <div>
            <div className="flex flex-col items-center">
                <h2 className="text-2xl font-bold mb-4"
                    onClick={() => consolea()}>
                    Select a Table</h2>
                <div className=" grid max-w-2xl grid-cols-3 gap-2">
                    {tables.map((table) => (
                        <button key={table.id} id={table.id} data-type={`table`}
                            className={`relative text-sm gap-2 flex items-center px-8 py-4 w-fit rounded-md cursor-pointer bg-rosado-50 text-rosado-10`}
                            onClick={(e) => handleTable(e.target, table)}>
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