import Card from "./Card";
import Ordered from "./Ordered";
import ModalOrder from "./modals/ModalOrder";
import TablesSelect from "./TablesSelect";

import { useProduct } from "../context/ProductoContext";
import { useOrderContext } from "../context/OrderContext";
import ModalOrderConfirm from "./modals/ModalOrderConfirm";

function CardsContainer() {
    const {  orderCart, modalOption } = useOrderContext();
    const { data } = useProduct();
    const pendingOrders = orderCart.length;


    const handleMesaClick = (mesa) => {
        document.getElementById('table'+mesa).click()
    };

   const salida = data.sort((a, b) => a.name.localeCompare(b.name, 'en', { sensitivity: 'base' }));
    const mesas = [...new Set(orderCart.map(order => order.table))].sort();

    return (
        
        <div className="w-full flex flex-col-reverse lg:grid lg:grid-cols-6 gap-2 px-2 lg:px-18 py-6 overflow-hidden relative">
               <ModalOrder /> 
             {/*   <ModalDeleteConfirm /> */}
               <ModalOrderConfirm option={modalOption} />
            <div className="lg:col-span-4">
                <h1 className="text-4xl font-siete text-rosado-90 lg:pt-8 pb-4 ">Desserts</h1>
                <div className="flex flex-wrap items-center justify-center  py-2 gap-2 w-full ">
                    <span className="font-siete underline">{pendingOrders}</span>  table{pendingOrders === 1 ? '' : 's'} with pending orders:
                    {mesas.map((mesa, index) => (
                        <button
                            id={`table-${mesa}`}
                            data-table = {mesa}
                            key={index}
                            className="cursor-pointer px-3 py-1 text-sm font-siete border rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onClick={() => handleMesaClick(mesa)}>
                            #{mesa}
                        </button>
                    ))}
                    </div>
                <div className="lg:grid lg:grid-cols-3 w-full">
                    {salida && salida.map((item, index) => (
                        <Card id={item.id} numberId={index + 1} key={index} item={item} />
                    ))}
                </div>
            </div>

            <div className="lg:col-span-2  mt-8 h-fit gap-4 flex flex-col relative">
                <div className="flex flex-col gap-4 lg:px-6 px-2 py-4">
                    <TablesSelect />
                </div>
                    <Ordered />
            </div>
        </div>
    )
}

export default CardsContainer