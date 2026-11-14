import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const productosRef = collection(db, "productos");
        const resp = await getDocs(productosRef);

        const listaProductos = resp.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
        }));

        setProductos(listaProductos);
      } catch (error) {
        console.error("Error al obtener productos de Firestore:", error);
      } finally {
        setCargando(false);
      }
    };

    obtenerProductos();
  }, []);

  if (cargando) return <div>Cargando productos...</div>;

  return (
    <div>
      <h2>Nuestros Productos</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
        {productos.map((prod) => (
          <div key={prod.id} style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
            {prod.imagen && <img src={prod.imagen} alt={prod.nombre} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />}
            <h3>{prod.nombre}</h3>
            <p>Precio: ${prod.precio}</p>
            <p>Stock: {prod.stock}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Productos;