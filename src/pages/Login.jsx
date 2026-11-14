import { useState } from "react";
import { useAuth } from "../context/AuthContext"; // Ajustá la ruta según tu estructura
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth(); // Traemos el login del contexto
  const navigate = useNavigate();

  const manejarLogin = async (evento) => {
    evento.preventDefault();

    try {
      await login(email, password);
      alert("¡Inicio de sesión exitoso!");
      navigate("/panel");
    } catch (error) {
      console.error("Error en el login:", error.code, error.message);
      alert("Error: " + error.message);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h2 className={styles.loginTitle}>Iniciar Sesión</h2>
      
      <form onSubmit={manejarLogin} className={styles.loginForm}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(evento) => setEmail(evento.target.value)}
          className={styles.loginInput}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(evento) => setPassword(evento.target.value)}
          className={styles.loginInput}
        />

        <button type="submit" className={styles.loginButton}>
          Ingresar
        </button>
      </form>
    </div>
  );
};

export default Login;