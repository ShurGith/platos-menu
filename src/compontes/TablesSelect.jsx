import { useOrderContext } from "../context/OrderContext";
import { useTablesContext } from "../context/TablesContext";

function TablesSelect() {
    const { tables, setTableActual, tableActual, seleccionable, setSeleccionable } = useTablesContext();
    const { setActualOrder, orderCart, actualOrder, addOrUpdateOrder, deleteOrder, setModalOption,setOpenOrderConfirm } = useOrderContext();

    function comumAction(desactivar = false) {
        document.querySelectorAll('[data-type="table"]').forEach((elemento) => {
            if (desactivar) {
                elemento.classList.add('border-2', 'bg-rosado-90', 'border-rosado-30', 'border-2', 'opacity-20', 'cursor-not-allowed')
                elemento.classList.remove('cursor-pointer', "bg-rosado-50")
            }else{
                elemento.classList.remove('border-2', 'bg-rosado-90', 'border-rosado-30', 'border-2', 'opacity-20', 'cursor-not-allowed')
                elemento.classList.add('cursor-pointer', "bg-rosado-50")
            }
        });
    }


    function makeOrder() { //Resetea los botones 
        comumAction();
        addOrUpdateOrder(tableActual, actualOrder)
        setSeleccionable(true)
        setActualOrder([])
        setTableActual(null)
        setOpenOrderConfirm(true)
        setModalOption('confirm')
    }

    function goBack() {
        comumAction();
        setSeleccionable(true)
        setTableActual(null);
    }

    function cancelOrder() {//Resetea los botones y elimina el pedido de la mesa actual
        setActualOrder([]);
        setSeleccionable(true)
        setTableActual(null);
        makeOrder() //Resetea los botones
        deleteOrder(tableActual)
    }

    function handleTable(clickado, table) { //Activacion de la mesa
        if (!seleccionable) return
        comumAction(true);
        if (Number(clickado.id) === table.id) {
            clickado.classList.remove('bg-rosado-50', 'opacity-20')
            clickado.classList.add('border-2', 'bg-rosado-90', 'border-rosado-30', 'border-2')
        }
        setSeleccionable(false)
        setTableActual(table.id);
    }

    function consolea() {
        console.clear()
        console.log("seleccionable:", seleccionable)
        console.log("tableActual: ", tableActual)
        console.log("orderCart: ", orderCart)
        console.log("actualOrder: ", actualOrder)
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
        
            <div id="order-action" className=" flex-col items-center gap-2 mt-2">
                {!seleccionable && 
                <>
                {actualOrder.length > 0 &&
                <h2 className="text-2xl font-bold text-center">Make Action</h2>
                }
                {actualOrder.length <= 0 && <h2 className="text-2xl font-bold text-center">
                    Add some item to your order or GoBack
                </h2>}
                <div className="flex justify-center gap-2 w-full">
                    <button
                        onClick={() => (actualOrder.length <= 0 ? null : makeOrder())}
                        className={`${actualOrder.length === 0 ? 'opacity-20 cursor-not-allowed' : 'cursor-pointer'} bg-verde  px-4 py-2 rounded-md text-rosado-10`}>Make Order</button>
                    <button
                        onClick={() => goBack()}
                        className='bg-blue-400 cursor-pointer px-4 py-2 rounded-md text-rosado-10'>Go Back</button>
                    <button
                        onClick={() => (actualOrder.length <= 0 ? null : cancelOrder())}
                        className={`${actualOrder.length <= 0 ? 'opacity-20 cursor-not-allowed' : 'cursor-pointer'} bg-rojo px-4 py-2 rounded-md text-rosado-10`}>Remove Order</button>
                </div>
                </>}
            </div>
        </div>
    )
}

/*
{
    actualOrder.length <= 0 && <h2 className="text-2xl font-bold text-center ">
        Add some item to your order or GoBack
    </h2>
}*/
export default TablesSelect