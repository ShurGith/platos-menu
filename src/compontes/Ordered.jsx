import React, { useEffect, useState } from "react";
function Ordered() {
    const [data, setData] = useState(null);
    useEffect(() => {
        // Leer datos del localStorage
        const storedData = localStorage.getItem("cartOrdered");
        if (storedData) {
            setData(JSON.parse(storedData)); // Convertir de string a objeto/array si es necesario
        }
    }, []);
  return (
      <div className="flex flex-col items-center gap-4">
      {data && <p>{JSON.stringify(data)}</p> }
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