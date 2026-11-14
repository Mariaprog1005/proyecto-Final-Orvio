import { Link } from 'react-router-dom';
import { useCarrito } from '../../context/CarritoContext';

const Nav = () => {
  const { carrito } = useCarrito();

  // Sumamos la cantidad total de ítems en el carrito
  const cantidadTotal = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <nav className="nav-navContainer">
      <ul className="nav-navList">
        <li>
          <Link to="/" className="nav-navLink">
            Inicio
          </Link>
        </li>
        <li>
          <Link to="/productos" className="nav-navLink">
            Productos
          </Link>
        </li>
        <li>
          <Link 
            to="/carrito" 
            className="nav-navLink" 
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
          >
            {/* Ícono de Carrito */}
           <svg 
  width="22" 
  height="22" 
  viewBox="0 0 24 24" 
  fill="none" 
  xmlns="http://www.w3.org/2000/svg"
>
  <path d="M6.29977 5H21L19 12H7.37671M20 16H8L5 3H2" stroke="#111111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  <path d="M10 10H17" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round"/>
  <path d="M12 7V13" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round"/>
  <circle cx="9" cy="20" r="2" stroke="#8b5cf6" strokeWidth="2"/>
  <circle cx="17" cy="20" r="2" stroke="#8b5cf6" strokeWidth="2"/>
</svg>
            
            {/* Burbuja Verde con la Cantidad */}
            {cantidadTotal > 0 && (
              <span style={{ 
                backgroundColor: 'var(--clr-success)', 
                color: '#ffffff', 
                borderRadius: '50%', 
                padding: '0.1rem 0.45rem', 
                fontSize: '0.75rem',
                fontWeight: '700',
                lineHeight: '1'
              }}>
                {cantidadTotal}
              </span>
            )}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;