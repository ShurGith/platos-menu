
import React, { useState, useEffect } from "react";

function App() {
    const [name, setName] = useState("");

    // Cargar datos del localStorage al iniciar
    useEffect(() => {
        const savedName = localStorage.getItem("cartOrdered");
        if (savedName) {
            setName(savedName);
        }
    }, []);

    // Guardar datos en el localStorage
    const handleSave = () => {
        localStorage.setItem("cartOrdered", name);
        alert("Nombre guardado en localStorage!");
    };

    return (
        <div>
            <h1>Guardar datos en localStorage</h1>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Escribe tu nombre"
            />
            <button onClick={handleSave}>Guardar</button>
            <p>Nombre guardado: {name}</p>
        </div>
    );
}

export default App;
