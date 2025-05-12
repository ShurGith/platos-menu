import Card from "./Card";
import Ordered from "./Ordered";
import { useOrderContext } from "../context/OrderContext";
import { useProduct } from "../context/ProductoContext";
function CardsContainer() {
    const { counter } = useOrderContext();
    const { data } = useProduct();

    return (
        <div className="w-full flex flex-col lg:flex-row gap-4 px-2 lg:px-18 py-6">
            <div className="">
                <h1 className="text-4xl font-siete text-rosado-90 lg:pt-8 pb-4 ">Desserts</h1>
                <div className="lg:grid lg:grid-cols-3 lg:gap-4 w-full">
                    {data && data.map((item, index) => (
                        <Card numberId={index}
                            key={item.name}
                            item={item} />
                    ))}
                </div>
            </div>
            <div className="lg:min-w-1/4  bg-white h-fit mt-4 rounded-xl py-4 ">
                <h2 className="text-xl text-center text-rojo font-siete mb-4 ">
                    Your Cart <span className="font-siete"> ({counter})</span>
                </h2>
                <Ordered />
            </div>
        </div>
    )
}

export default CardsContainer