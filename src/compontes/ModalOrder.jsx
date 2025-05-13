

function ModalOrder() {
    const data = JSON.parse(localStorage.getItem('cartOrdered'));
    const hayData = data && data.length > 0;
    const totalPay = data.reduce((acc, item) => acc + Number(item.total), 0).toFixed(2);

    return (
        <div className="w-screen h-screen  bg-black/60 fixed z-1 ">
        <div className="lg:w-2/6 bg-white h-fit mt-4 rounded-xl py-4 " >
        <div className="flex flex-col px-5 py-6 gap-4">
            <img className="size-10" src='/assets/images/icon-order-confirmed.svg' alt="" />
            <h2 className="text-2xl text-rosado-90 font-siete ">
               Order Confirmed
            </h2>
            <p className="text-sm text-rosado-90/50">We hope you enjoy your food</p>
            </div>
            <div className="flex flex-col px-5  py-6 gap-4 w-full text-main">
                {data &&
                    <div className="flex flex-col bg-rosado-10 gap-6 w-full px-6 py-6">
                        {data.map((item) => (
                            <div key={item.name} className="flex w-full">
                            <img src={item.image} alt="" />
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
                    </div>
                }
                        <button className="cursor-pointer bg-rojo text-rosado-10 py-2 rounded-full">Confirm Order</button>
            </div>
            </div>
        </div>
    )
}

export default ModalOrder