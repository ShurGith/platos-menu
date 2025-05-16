import Card from "./Card";
import Ordered from "./Ordered";
import ModalOrder from "./ModalOrder";
import TablesSelect from "./TablesSelect";

import { useProduct } from "../context/ProductoContext";
import { useOrderContext } from "../context/OrderContext";
import { useTablesContext } from "../context/TablesContext";

function CardsContainer() {
    const { counter , totalPay, orderCart} = useOrderContext();
    const { tableActual } = useTablesContext();
    const { data } = useProduct();
    const pendingOrders = orderCart.length;
    console.log("totalPay: ", totalPay);
    

    
    console.log("pendingOrders: ", pendingOrders);
    
   const salida = data.sort((a, b) => a.name.localeCompare(b.name, 'en', { sensitivity: 'base' }));

    return (
        <div className="w-full  flex flex-col-reverse  lg:grid lg:grid-cols-6 gap-2 px-2 lg:px-18 py-6 relative overflow-hidden">
            {/*   <ModalOrder /> */}
            <div className="lg:col-span-4">
                <h1 className="text-4xl font-siete text-rosado-90 lg:pt-8 pb-4 ">Desserts</h1>
                <h3 className="text-base font-cinco text-rosado-90"> Pending {pendingOrders} Orders</h3>


                <div className="lg:grid lg:grid-cols-3 w-full">
                    {salida && salida.map((item, index) => (
                        <Card id={item.id} numberId={index + 1} key={index} item={item} />
                    ))}
                </div>
            </div>

            <div className="lg:col-span-2 mt-8 h-fit gap-4 flex flex-col">
                <div className="flex flex-col gap-4 lg:px-6 px-2 py-4">
                    <TablesSelect />
                </div>
                <div className="lg:min-w-1/4  bg-white h-fit rounded-xl py-4 ">
                    {tableActual && counter > 0 &&
                        <>
                            <h2 className="text-xl border-b border-rosado-10 ml-6 text-rojo font-siete mb14 ">
                                Table #: {tableActual}
                                <span className="text-base font-cinco ml-2">Order Summary</span>
                            </h2>

                            <h3 className="ml-18 mt-2 mb-2 text-rojo text-cinco">
                                Total quantity <span className="font-siete">
                                    ({counter})</span></h3>
                        </>
                    }

                    <Ordered />
                </div>
            </div>
        </div>
    )
}

export default CardsContainer