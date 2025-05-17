import { useOrderContext } from "../context/OrderContext";
import { useTablesContext } from "../context/TablesContext";
import { Icon } from '@iconify-icon/react';
import isEqual from 'lodash/isEqual';
function TablesSelect() {
    const { tables, setTableActual, tableActual} = useTablesContext();
    const { orderCart, actualOrder } = useOrderContext();

    function comumAction(table) {
        document.querySelectorAll('[data-type="table"]').forEach((elemento) => {
             elemento.classList.remove('border-2', 'bg-rosado-90', 'border-rosado-30', 'border-2')
        });
        document.getElementById('table' + table).classList.add('border-2', 'bg-rosado-90', 'border-rosado-30', 'border-2')
    }

    const clickfather = (mesa) => {
        document.getElementById('table' + mesa).click()
    }

    function handleTable(table) { //Activacion de la mesa
        comumAction(table);
        setTableActual(table);
    }

    function consolea() {
        console.clear()
        console.log("tableActual: ", tableActual)
        console.log("orderCart: ", orderCart)
        console.log("actualOrder: ", actualOrder)
        const mesaActual = orderCart.find(order => order.table === tableActual)?.item;
        console.log("Mesa actual: ", mesaActual);
        console.log("Mesa comparadas: ", isEqual(mesaActual, actualOrder));
    }

    return (
        <div>
            <div className="flex flex-col items-center">
                <h2 className="text-2xl font-bold mb-4"
                    onClick={() => consolea()}>
                    Select a Table</h2>
                <div className=" grid max-w-2xl grid-cols-3 gap-2">
                    {tables.map((table) => (
                        <button key={table.id}
                            id={`table${table.id}`}
                            data-type="table"
                            className={`relative text-lg gap-2 flex items-center px-8 py-4 w-fit rounded-md cursor-pointer bg-rosado-50 text-rosado-10`}
                            onClick={() => handleTable(table.id)}>
                            <Icon icon="ic:sharp-table-restaurant" width="24" height="24"
                                onClick={() => { clickfather(table.id) }}
                            />
                            # {table.id}
                        </button>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default TablesSelect