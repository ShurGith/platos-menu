import { useEffect, useState } from 'react'
import { useOrderContext } from '../context/OrderContext'; //useOrderContext  from '../context/OrderContext';

function Boton({ name, price, image, id }) {
  const [order, setOrder] = useState(false)

  const [cantidad, setCantidad] = useState(0)

  const { toOrder, removeItem, tableActual, tablesSelect } = useOrderContext();

  const productosGuardados = JSON.parse(localStorage.getItem("cartOrdered"));

  const chequeProduct = (laId) => {
    if (productosGuardados) 
       return productosGuardados.find( (producto) => producto.id === laId );
  }


  const meteClases = (laId,accion) => {
     accion && document.getElementById(laId).querySelector('img').classList.add('border-2', 'border-rosado-50')
     !accion && document.getElementById(laId).querySelector('img').classList.remove('border-2', 'border-rosado-50')
  }

  const addOrder = (laId, pasado=false ) => {
    setCantidad(cantidad + 1)
    setOrder(true)
    toOrder(tableActual, laId, name, cantidad + 1, price, image)
    !pasado && meteClases(laId, true)
  }

  const removeOrder = (laId) => {
    setCantidad(cantidad - 1)
    toOrder(laId, name, cantidad - 1, price, image)
    if (cantidad <= 1) {
      removeItem(laId)
      meteClases(laId, false)
    }
  }

  useEffect(() => { //Para la recarga de la pagina
    if(chequeProduct(id)){
      setCantidad(chequeProduct(id).cantidad) //chequeProduct(id).cantidad 
      setOrder(true)
      meteClases(id, true)
    }else{
      setCantidad(0)
      setOrder(false)
      meteClases(id, false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [removeItem]);


  return (
    <div className="absolute -bottom-5 left-0 w-full flex justify-center">
      {!order && <div
        className='bg-rosado-5 py-2 px-6 rounded-full flex items-center cursor-pointer
    border border-rosado-30 gap-4'
        onClick={() => addOrder(id)}>
        <img src="/assets/images/icon-add-to-cart.svg" alt="" />
        <h6 className='text-rosado-90 text-sm'>Add to Cart</h6>
      </div>}
      {order && <div
        className='bg-rojo py-2 px-6 rounded-full flex items-center
    border border-rosado-40 gap-4'>

        <img
          className='size-4 border border-rosado-5 rounded-full p-1 cursor-pointer'
          src="/assets/images/icon-decrement-quantity.svg" alt=""
          onClick={() => removeOrder(id)} //Restar una unidad
        />
        <h6 className='text-sm text-rosado-5'>{cantidad}</h6>
        <img
          className='size-4 border border-rosado-5 rounded-full p-1 cursor-pointer'
          src="/assets/images/icon-increment-quantity.svg" alt=""
          onClick={() => addOrder(id,true)} //Sumar una unidad
        />
      </div>}


    </div>
  )
}

export default Boton