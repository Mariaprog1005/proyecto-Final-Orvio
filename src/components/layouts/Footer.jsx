import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css'; // <-- 1. Importamos el módulo

// 1. Importás tus imágenes desde la carpeta assets (comentadas por si no se usan)
/*
import fotoMaria from '../../assets/MariaLopez.jpg';
import fotoRosana from '../../assets/RosanaScorso.jpg';
import fotoLorena from '../../assets/lorenaPaz.jpg';
*/

const empresa = {
  nombre: 'Orvio',
  descripcion: 'Atención personalizada por WhatsApp.',
  direccion: 'Belgrano 6424, José León Suárez, Bs. As.',
  telefono: '+54 11 6250 6608',
  horario: 'Lunes a viernes de 9 a 18 hs',
};



const Footer = () => {
  const anioActual = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [suscripto, setSuscripto] = useState(false);

  const suscribirse = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSuscripto(true);
      setEmail('');
    }
  };

  return (
    <footer className={styles['footer-footer']}>
      <div className={styles['footer-columnas']}>
        <section>
          <h4 className={styles['footer-titulo']}>{empresa.nombre}</h4>
          <p className={styles['footer-texto']}>{empresa.descripcion}</p>
          <ul className={styles['footer-lista']}>
            <li>{empresa.direccion}</li>
            <li>Tel: {empresa.telefono}</li>
            <li>{empresa.horario}</li>
          </ul>
        </section>

        <section>
  <h4 className={styles['footer-titulo']}>Ayuda</h4>
  <ul className={styles['footer-lista']}>
    <li><Link to="/productos" className={styles['footer-footerLink']}>Productos</Link></li>
    <li><Link to="/carrito" className={styles['footer-footerLink']}>Carrito</Link></li>
    <li><Link to="/sobre-nosotros" className={styles['footer-footerLink']}>Sobre nosotros</Link></li>
    <li><Link to="/politica-de-privacidad" className={styles['footer-footerLink']}>Política de privacidad</Link></li>
  </ul>
</section>
        <section>
          <h4 className={styles['footer-titulo']}>Newsletter</h4>
          {suscripto ? (
            <p className={styles['footer-texto']}>¡Gracias por suscribirte!</p>
          ) : (
            <form onSubmit={suscribirse} className={styles['footer-newsletter']}>
              <input
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles['footer-input']}
                required
              />
              <button type="submit" className={styles['footer-boton']}>Suscribirme</button>
            </form>
          )}
        </section>
      </div>

      {/* 
      <div className="footer-equipo">
        <h4 className="footer-titulo">Nuestro equipo</h4>
        <div className="footer-tarjetas">
          {equipo.map((persona) => (
            <article key={persona.id} className="tarjeta-tarjeta">
              <div className="tarjeta-avatar">
                <img src={persona.imagen} alt={persona.nombre} className="tarjeta-img" />
              </div>
              <div>
                <h3 className="tarjeta-nombre">{persona.nombre}</h3>
                <p className="tarjeta-rol">{persona.rol}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
      */}

      <div className={styles['footer-copyrightContainer']}>
        <p className={styles['footer-copyright']}>
          © {anioActual} <span className={styles['footer-brand']}>{empresa.nombre}</span> – Todos los derechos reservados
        </p>
      </div>
    </footer>
  );
};

export default Footer;