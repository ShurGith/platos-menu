import Card from "./Card";
import Ordered from "./Ordered";
import { useOrderContext } from "../context/OrderContext";
import { useProduct } from "../context/ProductoContext";
function CardsContainer() {
    const { counter } = useOrderContext();

    const { data } = useProduct();

    return (
        <div className="w-full flex flex-col lg:flex-row gap-4 px-18 py-12">
            <div className="">
                <h1 className="text-3xl font-siete pt-8 pb-4 ">Desserts</h1>
                <div className="lg:grid lg:grid-cols-3 lg:gap-4 w-full">
                    {data && data.map((item) => (
                        <Card
                            key={item.name}
                            item={item} />
                    ))}
                </div>
            </div>
            <div className="min-w-1/3 bg-white h-fit mt-4 rounded-xl py-4 text-center">
                <h2 className="text-xl  text-rojo font-cinco mb-4 ">
                    Your Cart <span className="font-siete"> ({counter})</span>
                </h2>
                <Ordered />
            </div>
        </div>
    )
}

export default CardsContainer