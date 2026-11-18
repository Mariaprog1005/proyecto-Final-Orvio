import { useEffect } from 'react';
import styles from './SobreNosotros.module.css';

const SobreNosotros = () => {
  useEffect(() => {
    document.title = 'Sobre Nosotros | Orvio Electronics';
  }, []);

  return (
    <section className={styles.contenedor}>
      <div>
        <h1 className={styles.titulo}>Sobre Orvio Electronics</h1>
        <p className={styles.subtitulo}>
          Tecnología que te acompaña todos los días, con atención cercana y asesoramiento personalizado.
        </p>
        <p className={styles.parrafo}>
          En <strong>Orvio</strong> nacimos con el objetivo de acercar los mejores dispositivos y accesorios tecnológicos a cada hogar y espacio de trabajo. Ubicados en José León Suárez, Provincia de Buenos Aires, combinamos la comodidad de la compra online con la calidez de una atención directa por WhatsApp para ayudarte a elegir exactamente lo que necesitás.
        </p>
      </div>

      <div className={styles.tarjeta}>
        <h2 className={styles.tarjetaTitulo}>¿Por qué elegirnos?</h2>
        <ul className={styles.lista}>
          <li className={styles.itemLista}>
            <strong>Atención personalizada:</strong> Te asesoramos antes y después de tu compra de lunes a viernes de 9 a 18 hs.
          </li>
          <li className={styles.itemLista}>
            <strong>Calidad garantizada:</strong> Seleccionamos productos confiables y probados para el uso diario.
          </li>
          <li className={styles.itemLista}>
            <strong>Compra simple y segura:</strong> Gestioná tu carrito fácilmente y recibí soporte directo en cada paso.
          </li>
        </ul>
      </div>
    </section>
  );
};

export default SobreNosotros;