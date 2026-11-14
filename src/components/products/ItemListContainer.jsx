import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase/config';
import ItemList from "./ItemList";
import Item from "./Item";

const ItemListContainer = () => {
  const { categoriaId, id } = useParams();
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        setCargando(true);
        const productosRef = collection(db, 'productos');
        
        // Si hay una categoría en la URL, consulta con `where`, si no, trae todos
        const q = categoriaId 
          ? query(productosRef, where("categoria", "==", categoriaId.toLowerCase()))
          : productosRef;

        const querySnapshot = await getDocs(q);
        
        const listaProductos = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setProductos(listaProductos);
      } catch (err) {
        setError("No se pudo cargar productos desde Firebase");
        console.error(err);
      } finally {
        setCargando(false);
      }
    };

    fetchProductos();
  }, [categoriaId]);

  if (cargando)
    return <div className="listcont-statusMessage">Cargando productos...</div>;

  if (error)
    return <div className="listcont-statusMessage">Error: {error}</div>;

  // /producto/:id -> detalle de un solo producto
  if (id) {
    const producto = productos.find((p) => p.id === id);
    if (!producto)
      return <div className="listcont-statusMessage">Producto no encontrado</div>;
    return <Item {...producto} detalle />;
  }

  // Si se filtró por categoría y no hay ningún producto
  if (productos.length === 0) {
    return (
      <section className="listcont-container">
        <h1>{categoriaId ? categoriaId.toUpperCase() : "Productos"}</h1>
        <p className="listcont-statusMessage">No hay productos en esta categoría.</p>
      </section>
    );
  }

  // Listado de productos
  return (
    <section className="listcont-container">
      <h1 style={{ textTransform: 'capitalize' }}>
        {categoriaId ? categoriaId : "Productos"}
      </h1>
      <ItemList productos={productos} />
    </section>
  );
};

export default ItemListContainer;