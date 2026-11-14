import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { db } from "../firebase/config";
import { useAuth } from "../context/AuthContext";

const Registro = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  
  // Usamos la función de registro que viene de tu contexto global si la tenés ahí,
  // o bien la lógica directa con Firebase Auth y Firestore:
  const { signup } = useAuth(); // Si usas el signup del contexto, o lo manejamos directo abajo

  const handleSubmit = async (evento) => {
    evento.preventDefault();
    setError(null);

    try {
      // Si tu AuthContext provee una función signup que maneja auth y firestore:
      // await signup(email, password, nombre, apellido);

      // O si preferís hacerlo directo llamando a la autenticación aquí mismo:
      // (Asegurate de importar getAuth y createUserWithEmailAndPassword de 'firebase/auth' si usas esta forma)
      
      navigate("/");
    } catch (error) {
      setError("Ocurrió un error al registrar el usuario. Verifique los datos.");
      console.error("Error en el registro:", error.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Crear una nueva cuenta</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre</label>
          <input
            type="text"
            value={nombre}
            onChange={(evento) => setNombre(evento.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Apellido</label>
          <input
            type="text"
            value={apellido}
            onChange={(evento) => setApellido(evento.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Correo Electrónico</label>
          <input
            type="email"
            value={email}
            onChange={(evento) => setEmail(evento.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(evento) => setPassword(evento.target.value)}
            required
            placeholder="Mínimo 6 caracteres"
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default Registro;