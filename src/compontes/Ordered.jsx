import { useOrderContext } from "../context/OrderContext";

function Ordered() {

    const data = JSON.parse(localStorage.getItem('cartOrdered'));
    const hayData = data && data.length > 0;
    const totalPay = hayData &&data.reduce((acc, item) => acc + Number(item.total), 0).toFixed(2);

    const {removeItem} = useOrderContext();

    return (
        <div className="flex flex-col gap-4 w-full text-main lg:px-6">
            {hayData &&
                <div className="flex flex-col gap-4 w-full">
                    {data.map((item) => (
                        <div key={item.name} className="flex w-full flex-col font-cuatro border-b text-sm border-rosado-10 py-2">
                                <p className="font-siete">{item.name}</p>
                                <div className="flex items-center justify-between text-rosado-40 ">
                                    <div className="flex items-center gap-6">
                                        <p className="text-rojo font-cinco">{item.cantidad}x</p>
                                        <p>@${item.price}</p>
                                        <p className="font-cinco">${item.total}</p>
                                    </div>
                                    <button className="size-4 rounded-full border flex items-center justify-center cursor-pointer"
                                    onClick={() => removeItem(item.id)}
                                    >
                                        <img src="/assets/images/icon-remove-item.svg" alt="" />
                                    </button>
                            </div>
                        </div>
                    ))}
                    <div className="flex items-center justify-between  mt-10 text-rosado-90">
                        <h4 className="ont-cuatro text-sm">Order total</h4>
                        <h4 className= "font-siete text-2xl text-center"> ${totalPay}</h4>
                    </div>
                    <div className="flex items-center justify-center gap-2 mt-10 text-rosado-50 bg-rosado-10 p-2 rounded">
                        <img src="/assets/images/icon-carbon-neutral.svg" alt="" />
                        <h4 className= "font-cuatro text-sm text-center"> This is a <span className="font-siete text-xs">carbon-neutral</span> delivery</h4>
                        </div>
                    <button className="cursor-pointer bg-rojo text-rosado-10 py-2 rounded-full">Confirm Order</button>
                </div>
            }

            {!hayData &&
                <div className="flex flex-col items-center gap-4">
                    <img src="/assets/images/illustration-empty-cart.svg" alt="" />
                    <h1>Your added items will appear here</h1>
                </div>
            }
        </div>
    )
}

export default Ordered 