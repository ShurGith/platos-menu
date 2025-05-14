import CardsContainer from "./compontes/CardsContainer"
import { CalcsProvider } from "./context/CalcsContext"
import { OrderProvider } from "./context/OrderContext"
import { ProductProvider } from "./context/ProductoContext"
import { TablesProvider } from "./context/TablesContext"

function Carta() {
  return (
    <>
      <TablesProvider>
        <OrderProvider>
            <ProductProvider>
          <CalcsProvider>
              <CardsContainer />
          </CalcsProvider>
            </ProductProvider>
        </OrderProvider>
      </TablesProvider>
    </>
  )
}

export default Carta