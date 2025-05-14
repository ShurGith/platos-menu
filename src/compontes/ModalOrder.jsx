import { useOrderContext } from "../context/OrderContext";
import { useTablesContext } from "../context/TablesContext";

function ModalOrder() {

    //! COMUNES PARA CalcsContext  ***/
    const { tableActual, setTableActual, setSeleccionable, setSelectedTable } = useTablesContext();
    const { orderCart, setCounter, setActualOrder, openModal, setOpenModal, setOrderCart } = useOrderContext();
  //  const firstData = orderCart;
    const data = orderCart && orderCart.filter((item) => item.table === tableActual);
    const totalPay = data && data.reduce((acc, item) => acc + Number(item.total), 0).toFixed(2);

    function makeOrder() { //Resetea los botones 
        const orderAction = document.getElementById('order-action')
        document.querySelectorAll('[data-type="table"]').forEach((elemento) => {
            elemento.querySelector('img').classList.add('invisible')
            elemento.classList.remove('border-2', 'bg-rosado-90', 'border-rosado-30', 'border-2', 'opacity-20', 'cursor-not-allowed')
            elemento.classList.add('cursor-pointer', "bg-rosado-50")
            orderAction.classList.toggle('hidden')
        });
    }
    //! COMUNES PARA CalcsContext  ***/
    
    const actionModal = () => {
        const datosFiltrados = orderCart.filter(item => item.table !== tableActual);
        localStorage.setItem('cartOrdered', JSON.stringify(datosFiltrados));
        setOrderCart(datosFiltrados);
        setActualOrder([]);
        setSeleccionable(true)
        setSelectedTable(null);
        setTableActual(null);
        setOpenModal(false);
        makeOrder();
        setCounter(0);
    }


    return (
        <div className={`${openModal ? 'block' : 'hidden'} w-screen h-screen px-2  bg-black/60 fixed z-1 flex justify-center items-center`}>
            <div className="lg:w-1/2 w-full bg-white h-fit mt-4 rounded-xl py-4 lg:px-12" >
                <div className="flex flex-col lg:px-5 px-1 py-3 ">
                    <img className="size-10 mb-6" src='/assets/images/icon-order-confirmed.svg' alt="" />
                    <h2 className="text-5xl text-rosado-90 font-siete mb-2 ">
                        Order Confirmed
                    </h2>
                    <p className="text-rosado-90/50">We hope you enjoy your food!</p>
                </div>
                <div className="flex flex-col px-1  lg:py-6 gap-4 w-full text-main">
                    {data &&
                        <div className="flex flex-col bg-rosado-5 gap-2 w-full lg:p-6 py-2 rounded-xl ">
                            {data.map((item) => (
                                <div key={item.name} className="flex w-full border-b border-rosado-10 pl-1 pb-2 ">
                                    <img src={item.image} className="size-18 rounded-md" alt="" />
                                    <div className="flex flex-col px-3 justify-center gap-y-1 w-full">
                                        <p className="font-cinco text-rosado-90">{item.name}</p>
                                        <div className="flex items-center justify-between text-rosado-40 ">
                                            <div className="flex items-center justify-between w-full gap-4">
                                                <p className="text-rojo font-siete text-sm">{item.cantidad}x</p>
                                                <p>@${item.price}</p>
                                                <p className="font-cinco text-rosado-90 w-full text-end">${item.total}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="flex items-center justify-between  mt-10 text-rosado-90 px-4">
                                <h4 className="font-cuatro ">Order total</h4>
                                <h4 className="font-siete text-2xl text-center"> ${totalPay}</h4>
                            </div>
                        </div>
                    }
                    <button
                        onClick={() => actionModal()}
                        className="cursor-pointer bg-rojo text-rosado-10 py-4 rounded-full">Start New Order</button>
                </div>
            </div>
        </div>
    )
}

export default ModalOrder