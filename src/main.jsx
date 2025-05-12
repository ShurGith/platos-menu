import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Carta from './Carta.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Carta />
  </StrictMode>,
)
