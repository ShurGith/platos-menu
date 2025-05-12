function Ordered() {

    const data = JSON.parse(localStorage.getItem('cartOrdered'));
    const hayData = data && data.length > 0;

    return (
        <div className="flex flex-col items-center gap-4">
            {hayData && <div>
                {data.map((item) => (
                    <div key={item.name} className="flex justify-between items-center w-full">

                        <div className="flex items-center gap-4">
                            <img src="/assets/images/icon-delete.svg" alt="" />
                            <p>{item.name}</p>
                        </div>
                        <p>${item.total}</p>
                        <button className="text-rojo">Remove</button>
                    </div>
                ))}
                <button className="w-full bg-rojo text-rosado-10 py-2 rounded-lg">Checkout</button>
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