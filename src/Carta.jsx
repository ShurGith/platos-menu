import CardsContainer from "./compontes/CardsContainer"
import { OrderProvider } from "./context/OrderContext"
import { ProductProvider } from "./context/ProductoContext"
import { TablesProvider } from "./context/TablesContext"

function Carta() {
  return (
    <>
      <TablesProvider>
        <OrderProvider>
          <ProductProvider>
            <CardsContainer />
          </ProductProvider>
        </OrderProvider>
      </TablesProvider>
    </>
  )
}

export default Carta