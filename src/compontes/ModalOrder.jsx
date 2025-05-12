

function ModalOrder() {
    const data = JSON.parse(localStorage.getItem('cartOrdered'));
    const hayData = data && data.length > 0;
    const totalPay = data.reduce((acc, item) => acc + Number(item.total), 0).toFixed(2);

    return (
        <div className="lg:min-w-1/4  bg-white h-fit mt-4 rounded-xl py-4 " >
            <h2 className="text-xl text-center text-rojo font-siete mb-4 ">
                Your Cart <span className="font-siete"> ({counter})</span>
            </h2>
            <div className="flex flex-col gap-4 w-full text-main lg:px-6">
                {data &&
                    <div className="flex flex-col gap-4 w-full">
                        {data.map((item) => (
                            <div key={item.name} className="flex w-full">
                                <div className="flex flex-col w-full">
                                    <p className="font-cinco ml-6">{item.name}</p>
                                    <div className="flex items-center justify-between text-rosado-40 ">
                                        <div className="flex items-center gap-8">
                                            <p className="text-rojo font-siete">{item.cantidad}x</p>
                                            <p>@${item.price}</p>
                                            <p>${item.total}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="flex items-center justify-between  mt-10 text-rosado-90">
                            <h4 className="ont-cuatro text-sm">Order total</h4>
                            <h4 className="font-siete text-2xl text-center"> ${totalPay}</h4>
                        </div>
                        <button className="cursor-pointer bg-rojo text-rosado-10 py-2 rounded-full">Confirm Order</button>
                    </div>
                }
            </div>
        </div>
    )
}

export default ModalOrder