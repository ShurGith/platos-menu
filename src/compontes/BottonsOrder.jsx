import { useEffect, useState } from 'react'

import { useCalcsContext } from "../context/CalcsContext";

function BottonsOrder({ name, price, image, id }) {

  const [thisOrder , setThisOrder] = useState(false)
  const [cantidad, setCantidad] = useState(0)

  const { tableActual, toOrder, removeItem } = useCalcsContext();

  
  const chequeProduct = () => {
    const productosGuardados = JSON.parse(localStorage.getItem("cartOrdered"));
    if (productosGuardados)
      return productosGuardados.find((item) => (item.table === tableActual && item.id === id));
  }

  const meteClases = (laId, accion) => {
    accion && document.getElementById(laId).querySelector('img').classList.add('border-2', 'border-rosado-50')
    !accion && document.getElementById(laId).querySelector('img').classList.remove('border-2', 'border-rosado-50')
  }

  const addOrderItem = (laId, pasado = false) => {
    setCantidad(cantidad + 1)
    setThisOrder(true)
    if (tableActual && id)
      toOrder(tableActual, laId, name, cantidad + 1, price, image)
    !pasado && meteClases(laId, true)
  }

  const removeOrderItem = (laId) => {
    setCantidad(cantidad - 1)
    toOrder(tableActual, laId, name, cantidad - 1, price, image) //
    if (cantidad <= 1) {
      removeItem(laId)
      meteClases(laId, false)
    }
  }

  useEffect(() => { //Para la recarga de la pagina
    if (chequeProduct(tableActual)) {
      setCantidad(chequeProduct(tableActual).cantidad) //chequeProduct(id).cantidad 
      setThisOrder(true)
      meteClases(id, true)
    } else {
      setCantidad(0)
      setThisOrder(false)
      meteClases(id, false)
    }
  }, [removeItem]);

  //? ****  ####   Card Bottons  #### *******/
  return (
    <div className="absolute -bottom-5 left-0 w-full flex justify-center">
      {tableActual &&
        !thisOrder && <div
          className='bg-rosado-5 py-2 px-6 rounded-full flex items-center cursor-pointer
    border border-rosado-30 gap-4'
          onClick={() => addOrderItem(id)}>
          <img src="/assets/images/icon-add-to-cart.svg" alt="" />
          <h6 className='text-rosado-90 text-sm'>Add to Cart</h6>
        </div>}

      {thisOrder && <div
        className='bg-rojo py-2 px-6 rounded-full flex items-center
    border border-rosado-40 gap-4'>
        <img
          className='size-4 border border-rosado-5 rounded-full p-1 cursor-pointer'
          src="/assets/images/icon-decrement-quantity.svg" alt=""
          onClick={() => removeOrderItem(id)} //Restar una unidad
        />
        <h6 className='text-sm text-rosado-5'>{cantidad}</h6>
        <img
          className='size-4 border border-rosado-5 rounded-full p-1 cursor-pointer'
          src="/assets/images/icon-increment-quantity.svg" alt=""
          onClick={() => addOrderItem(id, true)} //Sumar una unidad
        />
      </div>}
    </div>
  )
}

export default BottonsOrder