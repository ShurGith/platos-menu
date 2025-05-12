import React from 'react'

function Boton() {
  return (
    <div 
    className='absolute -bottom-5 left-25 bg-rosado-5 py-2 px-6 rounded-full flex items-center cursor-pointer
    border border-rosado-90 gap-4'>
          <img src="/assets/images/icon-add-to-cart.svg" alt="" /> 
          <h6 className='text-rosado-90 text-sm'>Add to Cart</h6>
    </div>
  )
}

export default Boton