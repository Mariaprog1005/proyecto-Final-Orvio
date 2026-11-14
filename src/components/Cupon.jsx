import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/config';

const estadoInicial = { codigo: '', descuento: '' };

const Cupon = () => {
  const [cupones, setCupones] = useState([]);
  const [datosForm, setDatosForm] = useState(estadoInicial);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // Traemos los cupones de la colección "cupones" de Firestore
  useEffect(() => {
    getDocs(collection(db, 'cupones'))
      .then((snapshot) => {
        setCupones(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
      })
      .catch(() => setError('No se pudieron cargar los cupones.'))
      .finally(() => setCargando(false));
  }, []);

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setDatosForm((prev) => ({ ...prev, [name]: value }));
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();

    if (!datosForm.codigo.trim() || Number(datosForm.descuento) <= 0 || Number(datosForm.descuento) > 100) {
      alert('Ingresá un código y un descuento entre 1 y 100.');
      return;
    }

    const nuevoCupon = {
      codigo: datosForm.codigo.trim().toUpperCase(),
      descuento: Number(datosForm.descuento),
    };

    try {
      const docRef = await addDoc(collection(db, 'cupones'), nuevoCupon);
      setCupones((prev) => [...prev, { id: docRef.id, ...nuevoCupon }]);
      setDatosForm(estadoInicial);
    } catch (err) {
      console.error('Error al crear el cupón:', err);
      alert('No se pudo crear el cupón.');
    }
  };

  const eliminarCupon = async (id) => {
    if (!window.confirm('¿Eliminar este cupón?')) return;
    try {
      await deleteDoc(doc(db, 'cupones', id));
      setCupones((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error('Error al eliminar el cupón:', err);
      alert('No se pudo eliminar el cupón.');
    }
  };

  return (
    <div>
      <h3>Cupones de descuento</h3>

      <form onSubmit={manejarEnvio} style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', margin: '1rem 0' }}>
        <input
          name="codigo"
          type="text"
          placeholder="Código (ej: BIENVENIDO)"
          value={datosForm.codigo}
          onChange={manejarCambio}
        />
        <input
          name="descuento"
          type="number"
          placeholder="% de descuento"
          value={datosForm.descuento}
          onChange={manejarCambio}
        />
        <button type="submit">Crear cupón</button>
      </form>

      {cargando && <p>Cargando cupones...</p>}
      {error && <p>{error}</p>}
      {!cargando && !error && cupones.length === 0 && <p>No hay cupones creados todavía.</p>}

      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {cupones.map((cupon) => (
          <li key={cupon.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>
              <strong>{cupon.codigo}</strong> — {cupon.descuento}% de descuento
            </span>
            <button onClick={() => eliminarCupon(cupon.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cupon;
