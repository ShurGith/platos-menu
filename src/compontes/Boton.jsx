import  { useState } from 'react'

function Boton() {
  const [order, setOrder] = useState(false)
  const [cantidad, setCantidad] = useState(0)


  const controlerLess = (numero) => {
    if (cantidad > 0) 
      setCantidad(cantidad - 1)
    if (numero < 1)
      setOrder(false)
  }

  const controlerOrder = () => {
    setCantidad(1)
    setOrder(true)
  }
  
  return (
    
    <div className="absolute -bottom-5 left-0 w-full flex justify-center">
      {!order && <div
        className='bg-rosado-5 py-2 px-6 rounded-full flex items-center cursor-pointer
    border border-rosado-90 gap-4'
    onClick={() => controlerOrder()}>
        <img src="/assets/images/icon-add-to-cart.svg" alt="" />
        <h6 className='text-rosado-90 text-sm'>Add to Cart</h6>
      </div>}
      {order && <div
        className='bg-rojo py-2 px-6 rounded-full flex items-center
    border border-rosado-90 gap-4'>
        <img 
        className='size-4 border border-rosado-5 rounded-full p-1 cursor-pointer'
        src="/assets/images/icon-decrement-quantity.svg" alt="" 
          onClick={() => controlerLess(cantidad-1)}
        />
        <h6 className='text-sm text-rosado-5'>{cantidad}</h6>
        <img 
          className='size-4 border border-rosado-5 rounded-full p-1 cursor-pointer' 
          src="/assets/images/icon-increment-quantity.svg" alt="" 
          onClick={() => setCantidad(cantidad + 1)}
          />
      </div>}


    </div>
  )
}

export default Boton