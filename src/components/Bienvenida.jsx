import { Link } from "react-router-dom";
import Titulos from "./Titulos";

const Bienvenida = () => {
  return (
    <div className="bienvenida-hero">
      {/* 🎥 Video de fondo que abarca toda la tarjeta */}
      <video 
        src="/video2.mp4" 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="video-fondo"
      />

      {/* Capa oscura opcional para que las letras se lean perfecto (si el video es muy claro) */}
      <div className="bienvenida-overlay"></div>

      {/* Contenido de texto y botón que flotan arriba del video */}
      <div className="bienvenida-contenido">
        <Titulos>
          <h2>Bienvenidos a Orvio</h2>
          <h3>Tecnología que te acompaña todos los días</h3>
        </Titulos>

        <Link to="/productos" className="bienvenida-boton">
          Ver productos
        </Link>
      </div>
    </div>
  );
};

export default Bienvenida;