import { useEffect, useState } from 'react'
import { useOrderContext } from '../context/OrderContext'
import BottonsOrder from './BottonsOrder'

function Card({ item, numberId }) {
  const { actualOrder } = useOrderContext()
  const [quantity, setQuantity] = useState(0)

  useEffect(() => {
    setQuantity(actualOrder.find(item => item.id === numberId)?.cantidad || 0)
  }, [actualOrder])



  return (
    <div id={numberId} clase='cardata' className='w-full gap-4 flex flex-col items-center px-4'>
      {/*** Image Here ***/}
      <div className='relative' data-clase='imagedata'>
        <img className='w-full rounded-2xl' src={item.image.desktop} alt={item.name} />
        <BottonsOrder name={item.name} price={item.price} image={item.image.thumbnail} id={numberId} quantity={quantity} />
      </div>
      <div className='flex flex-col items-start pb-4 pl-2 w-full'>
        <p>{item.category}</p>
        <h1 data-clase='namedata' className='font-cinco text-lg'>{item.name}</h1>
        <p data-clase='pricedata'>${item.price}</p>
      </div>
    </div>
  )
}

export default Card