import Boton from './Boton'

function Card({ item }) {
  return (
    <div className='w-full gap-4 flex flex-col items-center px-4'>
      <div className='relative'>
        <img 
        className='w-full rounded-2xl'
        src={item.image.mobile} alt={item.name} />
        <Boton />
      </div>
      <div className='flex flex-col items-start p-4 w-full'>
      <p>{item.category}</p>
        <h1 className='weight-siete text-xl'>{item.name}</h1>
      <p>{item.price}</p>
      </div>
    </div>
  )
}

export default Card