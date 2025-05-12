import { useEffect, useState } from "react";
import Card from "./Card";
function CardsContainer() {

    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('/data/data.json')
            .then((res) => res.json())
            .then((json) => setData(json))
            .catch((err) => console.error('Error al cargar el JSON:', err));
    }, []);


    return (
        <div className="lg:w-5/6 mx-auto">
            <div className="lg:grid lg:grid-cols-3 lg:gap-8 w-full">
            {data &&data.map((item) => (
                <Card
                     key={item.name}
                     item={item} />
            ))}
            </div>
            <div>Pedidos</div>
        </div>
    )
}

export default CardsContainer