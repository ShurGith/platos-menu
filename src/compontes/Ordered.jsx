import isEqual from 'lodash/isEqual';
import { useOrderContext } from "../context/OrderContext";
import { useTablesContext } from "../context/TablesContext";
import { useState } from 'react';

function Ordered() {
    const { actualOrder, hayData, totalPay, setOpenModal, removeThisItem, counter,
        setActualOrder, addOrUpdateOrder, deleteOrder, setModalOption, setOpenOrderConfirm, orderCart } = useOrderContext();
    const { setTableActual, tableActual } = useTablesContext();

    //Ordenar los items pedidos por nombre 
    const data = actualOrder.sort((a, b) => a.name.localeCompare(b.name, 'es', { sensitivity: 'base' }))

    const [newOrder, setNewOrder] = useState(false);



    function makeOrder() { //Resetea los botones 
        addOrUpdateOrder(tableActual, actualOrder)
        setActualOrder([])
        setTableActual(null)
        setOpenOrderConfirm(true)
        setModalOption('confirm')
    }

    function goBack() {
        document.querySelectorAll('[data-type="table"]').forEach((elemento) => {
            elemento.classList.remove('border-2', 'bg-rosado-90', 'border-rosado-30', 'border-2')
        })
        setTableActual(null);
    }

    function cancelOrder() {
        setActualOrder([]);
        setTableActual(null);
        deleteOrder(tableActual)
    }

    const isNewOrder = () => {
        return orderCart.find(order => order.table === tableActual) ? false : true;
    }

    const isOrder = () => {
        const findTable = orderCart.find(order => order.table === tableActual)?.item;
        return isEqual(findTable, actualOrder);
    }


    function consolea() {
        console.clear()
        //console.log("seleccionable:", seleccionable)
        console.log("tableActual: ", tableActual)
        console.log("orderCart: ", orderCart)
        console.log("actualOrder: ", actualOrder)
        console.log("Buscamos mesa actual: ", orderCart.find(order => order.table === tableActual));
        console.log("actualOrder: ", actualOrder)
        console.log("Finding mesa actual: ", orderCart.find(order => order.table === tableActual)?.item);
    }

    return (
        <>      
        <div className={`${hayData ? 'lg:absolute lg:top-2 lg:right-0' : ''} w-full bg-white h-fit rounded-xl py-4 relative`}>
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
            {hayData &&
                <div className="flex flex-col gap-4 w-full px-6 lg:p-2">
                    <div id="order-action" className=" flex-col items-center gap-2 mt-2">
                            <>
                                {actualOrder.length > 0 &&
                                    <h2 className="text-2xl font-bold text-center"
                                        onClick={() => consolea()}>Make Action</h2>
                                }
                                <div className="grid grid-cols-3 justify-center gap-2 w-full">
                                    <button
                                        onClick={() => makeOrder()}
                                    className={`${isOrder() ? 'opacity-20 cursor-not-allowed' : 'cursor-pointer'} bg-verde px-4 py-2 rounded-md text-rosado-10`}>
                                        {isNewOrder() ? 'Make Order' : 'Update Order'}
                                    </button>
                                    <button
                                        onClick={() => goBack()}
                                        className='bg-blue-400 cursor-pointer px-4 py-2 rounded-md text-rosado-10'>Go Back</button>
                                    <button
                                        onClick={() => (actualOrder.length <= 0 ? null : cancelOrder())}
                                        className={`${actualOrder.length <= 0 ? 'opacity-20 cursor-not-allowed' : 'cursor-pointer'} bg-rojo px-4 py-2 rounded-md text-rosado-10`}>Remove Order</button>
                                </div>
                            </>
                    </div>

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
                                    onClick={() => removeThisItem(item.id)}>
                                    <img src="/assets/images/icon-remove-item.svg" alt="" />
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className="flex items-center justify-between  mt-10 text-rosado-90">
                        <h4 className="ont-cuatro text-sm">Order total</h4>
                        <h4 className="font-siete text-2xl text-center"> ${totalPay}</h4>
                    </div>
                    <div className="flex items-center justify-center gap-2 mt-10 text-rosado-50 bg-rosado-10 p-2 rounded">
                        <img src="/assets/images/icon-carbon-neutral.svg" alt="" />
                        <h4 className="font-cuatro text-sm text-center"> This is a <span className="font-siete text-xs">carbon-neutral</span> delivery</h4>
                    </div>
                    <button
                        onClick={() => setOpenModal(true)}
                        className={`${isNewOrder() ? 'opacity-20 cursor-not-allowed' : 'cursor-pointer'} bg-rojo text-rosado-10 py-2 rounded-full`}>CheckOut Order</button>
                </div>
            }

            {!hayData &&
                <div className="flex flex-col items-center gap-4">
                    <h6>Add some item to your order</h6>
                    <img src="/assets/images/illustration-empty-cart.svg" alt="" />
                    <h6>Your added items will appear here</h6>
                </div>}
       
        </div>
        </>
    )
}

export default Ordered


