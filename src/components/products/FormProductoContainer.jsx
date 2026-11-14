import { useState, useEffect } from "react";
import FormProducto from "./FormProducto";
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from "../../firebase/config";
import styles from "./FormProductoContainer.module.css";

const estadoInicial = {
  nombre: "",
  precio: "",
  stock: "",
  categoria: "",
  descripcion: ""
};

const FormProductoContainer = ({ productoAEditar, onProductoAgregado }) => {
  const [datosForm, setDatosForm] = useState(estadoInicial);
  const [imagen, setImagen] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [errores, setErrores] = useState({});

  useEffect(() => {
    if (productoAEditar) {
      setDatosForm(productoAEditar);
    } else {
      setDatosForm(estadoInicial);
    }
    setErrores({});
  }, [productoAEditar]);

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setDatosForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Limpia el error del campo que se está modificando
    if (errores[name]) {
      setErrores((prev) => ({ ...prev, [name]: null }));
    }
  };

  const manejarCambioImagen = (e) => {
    const archivo = e.target.files[0];
    setImagen(archivo);
    if (archivo && errores.imagen) {
      setErrores((prev) => ({ ...prev, imagen: null }));
    }
  };

  const validarFormulario = () => {
    const nuevosErrores = {};

    if (!datosForm.nombre || !datosForm.nombre.trim()) {
      nuevosErrores.nombre = "El nombre no puede quedar vacío.";
    }

    if (!datosForm.precio) {
      nuevosErrores.precio = "El precio no puede quedar vacío.";
    } else if (Number(datosForm.precio) <= 0) {
      nuevosErrores.precio = "El precio debe ser mayor a 0.";
    }

    if (datosForm.stock === "" || datosForm.stock === undefined) {
      nuevosErrores.stock = "El stock no puede quedar vacío.";
    } else if (Number(datosForm.stock) < 0) {
      nuevosErrores.stock = "El stock no puede ser un número negativo.";
    }

    if (!datosForm.categoria) {
      nuevosErrores.categoria = "Por favor selecciona una categoría.";
    }

    if (!datosForm.descripcion || !datosForm.descripcion.trim()) {
      nuevosErrores.descripcion = "La descripción es requerida.";
    }

    // La imagen es requerida solo al crear un nuevo producto
    if (!productoAEditar && !imagen) {
      nuevosErrores.imagen = "Debes seleccionar una imagen para el nuevo producto.";
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const subirImagenImgbb = async (archivo) => {
    const apiKey = "4bc89d90e5ba2ca799b0f1339650ce18";
    const formData = new FormData();
    formData.append("image", archivo);

    const respuesta = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: "POST",
      body: formData,
    });

    const datos = await respuesta.json();
    if (!datos.success) throw new Error("Error al subir la imagen");
    return datos.data.url;
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();

    if (!validarFormulario()) return;

    setCargando(true);

    try {
      let urlImagen = datosForm.imagen || "";

      if (imagen) {
        urlImagen = await subirImagenImgbb(imagen);
      }

      // Normalizar datos
      const datosAEnviar = {
        ...datosForm,
        precio: Number(datosForm.precio),
        stock: Number(datosForm.stock),
        categoria: datosForm.categoria.trim().toLowerCase(),
        imagen: urlImagen
      };

      if (productoAEditar) {
        // Actualizamos en Firestore
        const docRef = doc(db, "productos", productoAEditar.id);
        await updateDoc(docRef, datosAEnviar);
        alert("¡Producto actualizado con éxito!");

        if (onProductoAgregado) {
          onProductoAgregado({ id: productoAEditar.id, ...datosAEnviar }, true);
        }
      } else {
        // Agregamos nuevo documento a Firestore
        const docRef = await addDoc(collection(db, "productos"), datosAEnviar);
        alert("¡Producto guardado con éxito!");

        if (onProductoAgregado) {
          onProductoAgregado({ id: docRef.id, ...datosAEnviar }, false);
        }
      }

      setDatosForm(estadoInicial);
      setImagen(null);
    } catch (error) {
      console.error("Error en el envío:", error);
      alert("Hubo un error al procesar la operación.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className={styles.container}>
      <FormProducto
        manejarCambio={manejarCambio}
        manejarEnvio={manejarEnvio}
        manejarCambioImagen={manejarCambioImagen}
        datosForm={datosForm}
        cargando={cargando}
        esEdicion={!!productoAEditar}
        errores={errores}
      />
    </div>
  );
};

export default FormProductoContainer;