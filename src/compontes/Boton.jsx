import { useEffect, useState } from 'react'
import { useOrderContext } from '../context/OrderContext'; //useOrderContext  from '../context/OrderContext';

function Boton({ name, price }) {

  const [order, setOrder] = useState(false)
  const [cantidad, setCantidad] = useState(0)

  const { counter, setCounter, toOrder, clearCart, removeItem } = useOrderContext();

  const productosGuardados = JSON.parse(localStorage.getItem("cartOrdered"));

  const chequeProduct = (findedProd) => {
    return productosGuardados.find(
      (producto) => producto.name.toLowerCase() === findedProd.toLowerCase()
    );
  }

  useEffect(() => {
    chequeProduct(name) ? setOrder(true) : setOrder(false);
    setCantidad(chequeProduct(name) ? chequeProduct(name).cantidad : 0)
  }, []);

  const getData = (cuantos) => {
    toOrder(name, cuantos, price)
    if (cuantos <= 0) {
      removeItem(name)
      setOrder(false)
    }
  }

  const controlerLess = (numero, objeto) => { //Resta una unidad
    if (cantidad > 0) {
      setCounter(counter - 1)
      setCantidad(cantidad - 1)
    }
    if (numero < 1) {
      setOrder(false)
      objeto.closest('[data-clase="cardata"]').querySelector('img').classList.remove('border')
    }
    getData(cantidad - 1)
  }

  const addOrder = (objeto) => { //Inicial de la orden
    setCantidad(1)
    setCounter(counter + 1)
    setOrder(true)
    objeto.closest('[data-clase="cardata"]').querySelector('img').classList.add('border')
    getData(1)
  }

  const controllerMore = () => { //Suma una unidad
    setCounter(counter + 1)
    setCantidad(cantidad + 1)
    getData(cantidad + 1)
  }


  return (
    <div className="absolute -bottom-5 left-0 w-full flex justify-center">
      {!order && <div
        className='bg-rosado-5 py-2 px-6 rounded-full flex items-center cursor-pointer
    border border-rosado-90 gap-4'
        onClick={(event) => addOrder(event.target)}>
        <img src="/assets/images/icon-add-to-cart.svg" alt="" />
        <h6 className='text-rosado-90 text-sm'>Add to Cart</h6>
      </div>}
      {order && <div
        className='bg-rojo py-2 px-6 rounded-full flex items-center
    border border-rosado-90 gap-4'>
        <img
          className='size-4 border border-rosado-5 rounded-full p-1 cursor-pointer'
          src="/assets/images/icon-decrement-quantity.svg" alt=""
          onClick={() => controlerLess()}
        />
        <h6 className='text-sm text-rosado-5'>{cantidad}</h6>
        <img
          className='size-4 border border-rosado-5 rounded-full p-1 cursor-pointer'
          src="/assets/images/icon-increment-quantity.svg" alt=""
          onClick={() => controllerMore()}
        />
      </div>}


    </div>
  )
}

export default Boton