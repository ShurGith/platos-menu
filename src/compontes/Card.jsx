import Boton from './Boton'

function Card({ item }) {

  return (
    <div data-clase='cardata' className='w-full gap-4 flex flex-col items-center px-4'>
      <div className='relative' data-clase='imagedata'>
        <img 
        className='w-full rounded-2xl'
        src={item.image.mobile} alt={item.name} />
        <Boton name={item.name} price={item.price} />
      </div>
      <div className='flex flex-col items-start p-4 w-full'>
      <p>{item.category}</p>
        <h1 data-clase='namedata' className='weight-siete text-xl'>{item.name}</h1>
      <p data-clase='pricedata'>{item.price}</p>
      </div>
    </div>
  )
}

export default Card