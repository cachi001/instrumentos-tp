import { createContext, useContext } from "react";
import { useState, useEffect } from "react";

const ProductosContext = createContext();

export const useProductos = () => useContext(ProductosContext);

export const ProductosProvider = ({ children}) =>{
    const productosGuardados = localStorage.getItem("productos")

    const [productos, setProductos] = useState(productosGuardados ? JSON.parse(productosGuardados) : null)

    useEffect(() => {
        const fetchProductos = async () =>{

            try {
                const response = await fetch(`http://localhost:8080/instrumento/todos`)

                if (!response.ok) throw new Error("Error al cargar Empresa");
    
                const data = await response.json();
                if (data) {
                    localStorage.setItem("productos", JSON.stringify(data));
                    setProductos(data);
                }
            } catch (error) {
                console.log("Error en fetchProductos", error)
            }
        }
        
        fetchProductos();
    }, [])
    
    return(
        <ProductosContext.Provider value={{productos}}>
            {children}
        </ProductosContext.Provider>
    )
}