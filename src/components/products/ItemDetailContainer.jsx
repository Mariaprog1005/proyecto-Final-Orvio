import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config"; // Asegúrate de que la ruta a tu config de firebase sea correcta
import Item from "./Item";

const ItemDetailContainer = () => {
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    setCargando(true);
    const docRef = doc(db, "productos", id); // Asumiendo que tu colección en Firestore se llama "productos"

    getDoc(docRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          setProducto({ id: snapshot.id, ...snapshot.data() });
        } else {
          setError(true);
        }
      })
      .catch((err) => {
        console.error("Error al obtener el producto:", err);
        setError(true);
      })
      .finally(() => {
        setCargando(false);
      });
  }, [id]);

  if (cargando) {
    return <h2 style={{ textAlign: "center", marginTop: "2rem" }}>Cargando detalle del producto...</h2>;
  }

  if (error || !producto) {
    return <h2 style={{ textAlign: "center", marginTop: "2rem" }}>No se encontró el producto solicitado.</h2>;
  }

  // Renderizamos tu Item pasándole las propiedades del producto y la prop detalle={true}
  return <Item detalle={true} {...producto} />;
};

export default ItemDetailContainer;