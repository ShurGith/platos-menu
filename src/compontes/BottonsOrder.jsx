/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { useOrderContext } from '../context/OrderContext';
import { useTablesContext } from '../context/TablesContext';

function BottonsOrder({ name, price, image, id }) {
  const { actualOrder, setActualOrder } = useOrderContext();

  const { tableActual } = useTablesContext();
  const [cantidad, setCantidad] = useState(0)

  const meteClases = (laId, accion) => {
    accion && document.getElementById(laId).querySelector('img').classList.add('border-2', 'border-rosado-50')
    !accion && document.getElementById(laId).querySelector('img').classList.remove('border-2', 'border-rosado-50')
  }

  useEffect(() => {
    setCantidad(0)
  }, [actualOrder]);

  const toOrder = (id, name, quantity, price, image) => {
    const total = quantity * price;
    setActualOrder((prev) => {
      const existingItem = actualOrder.some(item => item.id === id);
      if (existingItem) {
        return prev.map((item) => {
          if (item.id === id) {
            return { ...item, cantidad: quantity, total: total.toFixed(2) };
          }
          return item;
        });
      } else {
        return [...prev, {
          id: id,
          name: name, cantidad: quantity,
          price: price, total: total.toFixed(2),
          image: image
        }];
      }
    });
  }

  const removeThis = (id) => {
    setActualOrder(prev => prev.filter(item => item.id !== id))
  }

  const addOrderItem = (laId, pasado = false) => {
    setCantidad(cantidad + 1)
    toOrder(laId, name, cantidad + 1, price, image)
    !pasado && meteClases(laId, true)
  }

  const removeOrderItem = (laId) => {
    setCantidad(cantidad - 1)
    toOrder(laId, name, cantidad - 1, price, image) //
    if (cantidad <= 1) {
      removeThis(laId)
      meteClases(laId, false)
    }
  }

  useEffect(() => {
    if (actualOrder.some(item => item.id === id)) {
      setCantidad(actualOrder.find(item => item.id === id).cantidad)
      meteClases(id, true)
    }
    else {
      setCantidad(0)
      meteClases(id, false)
    }
  }, [actualOrder]);

  //? ****  ####   Card Bottons  #### *******/
  return (
    <div className="absolute -bottom-5 left-0 w-full flex justify-center">

      {!actualOrder.some(item => item.id === id) && tableActual && <div
        className='bg-rosado-5 py-2 px-6 rounded-full flex items-center cursor-pointer
    border border-rosado-30 gap-4'
        onClick={() => addOrderItem(id)}>
        <img src="/assets/images/icon-add-to-cart.svg" alt="" />
        <h6 className='text-rosado-90 text-sm'>Add to Cart</h6>
      </div>}

      {actualOrder.some(item => item.id === id) && <div
        className='bg-rojo py-2 px-2 rounded-full flex items-center
    border border-rosado-40 gap-12'>
        <img
          className='size-7 border border-rosado-5 rounded-full p-1 cursor-pointer'
          src="/assets/images/icon-decrement-quantity.svg" alt=""
          onClick={() => removeOrderItem(id)} //Restar una unidad
        />
        <h6 className='text-xl text-rosado-5'>{cantidad}</h6>
        <img
          className='size-7 border border-rosado-5 rounded-full p-1 cursor-pointer'
          src="/assets/images/icon-increment-quantity.svg" alt=""
          onClick={() => addOrderItem(id, true)} //Sumar una unidad
        />
      </div>}
    </div>
  )
}

export default BottonsOrder