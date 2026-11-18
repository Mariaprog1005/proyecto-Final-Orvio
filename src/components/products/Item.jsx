import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCarrito } from "../../context/CarritoContext"; //  Importamos el contexto del carrito
import BotonFavorito from "../BotonFavorito";

const formatearPrecio = (precio) => `AR$ ${precio.toLocaleString("es-AR")}`;

const Item = ({ id, nombre, precio, imagen, categoria, descripcion, stock, detalle }) => {
  const [contador, setContador] = useState(1); // Iniciamos en 1 para que tenga cantidad por defecto
  const navigate = useNavigate();
  const { agregarAlCarrito } = useCarrito(); // 👈 2. Extraemos la función del context

  const incrementar = () => setContador(contador + 1);
  const decrementar = () => { if (contador > 1) setContador(contador - 1); };

  // Función para manejar la acción del botón de compra
  const handleAgregarAlCarrito = () => {
    // 3. Armamos el objeto producto que espera tu Carrito.jsx (usando 'image' en vez de 'imagen')
    const productoAAgregar = {
      id,
      nombre,
      precio,
      image: imagen,
    };

    // 4. Mandamos el producto y la cantidad seleccionada al context
    agregarAlCarrito({ producto: productoAAgregar, cantidad: contador });

    // 5. Redirigimos a la vista del carrito
    navigate("/carrito");
  };

  // Vista de detalle (ruta /producto/:id)
  if (detalle) {
    return (
      <div className="detalle-container">
        <Link to="/productos" className="detalle-backLink">
          ← Volver a productos
        </Link>

        <div className="detalle-grid">
          <div className="detalle-imageWrapper">
            <img src={imagen} alt={nombre} className="detalle-image" />
          </div>

          <div className="detalle-infoSection">
            <span className="detalle-categoryTag">{categoria}</span>
            <h1 className="detalle-title">{nombre}</h1>
            <p className="detalle-price">{formatearPrecio(precio)}</p>

            <h3 className="detalle-descriptionTitle">Descripción</h3>
            <p className="detalle-description">{descripcion}</p>
            <p className="detalle-description">Stock disponible: {stock} unidades</p>

            <button className="detalle-buyButton" onClick={handleAgregarAlCarrito}>
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>
    );
  }

 // Vista de tarjeta (listado /productos)
  return (
    <article className="item-card" style={{ border: '2px solid #9b87f5', borderRadius: '12px', padding: '1rem', background: '#fff' }}>
      <Link to={`/producto/${id}`} className="item-imageLink">
        <img src={imagen} alt={nombre} className="item-image" />
      </Link>

      <Link to={`/producto/${id}`} className="item-titleLink">
        <h2 className="item-title">{nombre}</h2>
      </Link>
      <p className="item-price">{formatearPrecio(precio)}</p>

      <div className="item-actions">
        <BotonFavorito />

        <div className="item-counter" style={{ border: '1px solid #9b87f5', borderRadius: '8px', display: 'flex', overflow: 'hidden' }}>
          <button onClick={decrementar} className="item-counterBtn" style={{ border: 'none', background: 'transparent', padding: '0.4rem 0.8rem', cursor: 'pointer', color: '#333', fontWeight: 'bold' }}>-</button>
          <span className="item-countText" style={{ padding: '0.4rem 0.6rem', display: 'flex', alignItems: 'center' }}>{contador}</span>
          <button onClick={incrementar} className="item-counterBtn" style={{ border: 'none', background: 'transparent', padding: '0.4rem 0.8rem', cursor: 'pointer', color: '#333', fontWeight: 'bold' }}>+</button>
        </div>
      </div>
    </article>
  );
};
export default Item;