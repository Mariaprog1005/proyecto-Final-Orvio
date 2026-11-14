import Nav from "./Nav";
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import logoOrvio from "../../assets/logo_transparent.png"; // Ajustado al nombre de tu archivo

const Header = () => {
  const { user, logout } = useAuth();
  return (
    <div className="header-headerWrapper">
      <header className="header-headerContainer">
        <div className="header-brandSection">
          <Link to="/" className="header-brandLogo">
            <img src={logoOrvio} alt="Logo de Orvio" className="h-8 w-auto" />
          </Link>
        </div>
        <div className="header-centerSection">
          <Nav />
        </div>
        <div>
          {/* 
            <ul>
              {user ? (
                <>
                  {user.rol === "admin" && (
                    <li>
                      <Link to="/panel" style={{ color: "black" }}>
                        Panel
                      </Link>
                    </li>
                  )}
                  <span>¡Hola, {user.email}!</span>
                  <button onClick={logout}>Cerrar Sesión</button>
                </>
              ) : (
                <li>
                  <Link to="/login">Login</Link>
                </li>
              )}
            </ul>
          */}
        </div>
      </header>
    </div>
  );
};

export default Header;