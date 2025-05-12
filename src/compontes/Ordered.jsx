import React, { useEffect, useState } from "react";
function Ordered() {
    const [data, setData] = useState(false || null);
    const storedData = localStorage.getItem("cartOrdered");

   /*useEffect(() => {
        if (storedData) {
            setData(storedData.length > 0 ? true : false)     }
    }, [storedData]);
*/
    if (storedData) {
        //setData(storedData.length > 0 ? true : false)
    }

  return (
      <div className="flex flex-col items-center gap-4">
          {data && <p>{storedData}</p> }
      {!data && 
      <div className="flex flex-col items-center gap-4">
              <img src="/assets/images/illustration-empty-cart.svg" alt="" />
              <h1>Your added items will appear here</h1>
              </div>
      }
      </div>
  )
}

export default Ordered