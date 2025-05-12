import CardsContainer from "./compontes/CardsContainer"
import { OrderProvider }  from "./context/OrderContext"
import { ProductProvider } from "./context/ProductoContext"

function Carta() {
  return (
    <>
      <OrderProvider>
      <ProductProvider>
        <CardsContainer />
        </ProductProvider>
      </OrderProvider>
    </>
  )
}

export default Carta