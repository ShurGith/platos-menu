import Card from "./Card";
import Ordered from "./Ordered";
import ModalOrder from "./ModalOrder";
import TablesSelect from "./TablesSelect";

import { useOrderContext } from "../context/OrderContext";
import { useTablesContext } from "../context/TablesContext";
import { useProduct } from "../context/ProductoContext";
import { useCalcsContext } from "../context/CalcsContext";

function CardsContainer() {
    //const { counter } = useOrderContext();
    //const { tableActual } = useTablesContext(); 
    const {counter, tableActual } = useCalcsContext();
    const { data } = useProduct();

    return (
        <>
            <ModalOrder />
            <div className="w-full flex flex-col lg:flex-row gap-4 px-2 lg:px-18 py-6 relative overflow-hidden">
                <div className="">
                    <h1 className="text-4xl font-siete text-rosado-90 lg:pt-8 pb-4 ">Desserts {counter}</h1>
                    <div className="lg:grid lg:grid-cols-3 lg:gap-4 w-full">
                        {data && data.map((item, index) => (
                            <Card numberId={index}
                                key={item.name}
                                item={item} />
                        ))}
                    </div>
                </div>
                <div className="lg:min-w-1/4 mt-8 h-fit gap-4 flex flex-col">
                    <div className="lg:min-w-1/4  bg-white h-fit rounded-xl py-4 ">
                        <h2 className="text-xl border-b border-rosado-10 ml-6 text-rojo font-siete mb14">
                            Order Summary
                        </h2>
                        {tableActual  &&
                        <>
                            <h2 className="text-xl border-b border-rosado-10 ml-6 text-rojo font-siete mb14 ">
                                Table Number: {tableActual}
                            </h2>
                        <h3 className="ml-18 mt-2 mb-2 text-lg text-rojo text-cinco">
                            Order Summary</h3>


                        <h3 className="ml-18 mt-2 mb-2 text-rojo text-cinco">
                            Total quantity <span className="font-siete">
                                ({counter})</span></h3>
                        </>
                        }
                        <Ordered />
                    </div>
                    <div className="flex flex-col gap-4 lg:px-6 px-2 py-4">
                        <TablesSelect />
                    </div>
                </div>
            </div>
        </>
    )
}

export default CardsContainer