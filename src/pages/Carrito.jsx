import { useCarrito } from '../context/CarritoContext';
import { Link } from 'react-router-dom';

const Carrito = () => {
  const { carrito, vaciarCarrito, cobroTotal } = useCarrito();

  if (carrito.length === 0) {
    return (
      <div className="carrito-container" style={{ textAlign: "center", padding: "4rem 1rem" }}>
        <h1>Carrito</h1>
        <p style={{ color: "var(--clr-muted)", marginBottom: "1.5rem" }}>
          Tu carrito está vacío. Muy pronto vas a poder sumar productos acá.
        </p>
        <Link to="/productos" className="btn-carrito-vacio">
          Ir a productos
        </Link>
      </div>
    );
  }

  return (
    <div className="carrito-container">
      <h1>Carrito de Compras</h1>
      
      {carrito.map(item => (
        <div key={item.id} className="carrito-item">
          {item.image && <img src={item.image} alt={item.nombre} />}
          <div>
            <h4>{item.nombre}</h4>
            <p>Cantidad: {item.cantidad}</p>
            <p>Precio unitario: ${item.precio.toLocaleString("es-AR")}</p>
            <p><strong>Subtotal: ${(item.precio * item.cantidad).toLocaleString("es-AR")}</strong></p>
          </div>
        </div>
      ))}
      
      <hr />

      <div className="carrito-total">
        Total a pagar: ${cobroTotal().toLocaleString("es-AR")}
      </div>
      
      <button onClick={vaciarCarrito} className="carrito-btn-vaciar">
        Vaciar Carrito
      </button>
    </div>
  );
};

export default Carrito;
