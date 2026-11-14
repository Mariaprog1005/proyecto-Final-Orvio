import { useState, createContext, useContext } from 'react';

export const CarritoContext = createContext();

// Custom Hook con validación
export const useCarrito = () => {
  const context = useContext(CarritoContext);
  if (!context) {
    throw new Error('useCarrito debe ser usado dentro de un CarritoProvider');
  }
  return context;
};

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  // Agregar al carrito
  const agregarAlCarrito = ({ producto, cantidad = 1 }) => {
    const itemEnCarrito = carrito.find(item => item.id === producto.id);

    if (itemEnCarrito) {
      const carritoActualizado = carrito.map(item =>
        item.id === producto.id
          ? { ...item, cantidad: item.cantidad + cantidad }
          : item
      );
      setCarrito(carritoActualizado);
    } else {
      setCarrito(carritoPrevio => [...carritoPrevio, { ...producto, cantidad }]);
    }
  };

  // 1. Eliminar un producto del carrito por su ID
  const eliminarDelCarrito = (id) => {
    setCarrito(carritoPrevio => carritoPrevio.filter(item => item.id !== id));
  };

  // 2. Incrementar la cantidad en 1
  const incrementarCantidad = (id) => {
    setCarrito(carritoPrevio =>
      carritoPrevio.map(item =>
        item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item
      )
    );
  };

  // 3. Decrementar la cantidad en 1 (si llega a 0, se elimina automáticamente)
  const decrementarCantidad = (id) => {
    setCarrito(carritoPrevio =>
      carritoPrevio
        .map(item =>
          item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item
        )
        .filter(item => item.cantidad > 0)
    );
  };

  // 4. Vaciar el carrito completamente
  const vaciarCarrito = () => {
    setCarrito([]);
  };

  // Numerito del contador al lado del carrito
  const itemsEnCarrito = () => {
    return carrito.reduce((acc, item) => acc + item.cantidad, 0);
  };

  // Suma total a pagar
  const cobroTotal = () => {
    return carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  };

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        eliminarDelCarrito,
        incrementarCantidad,
        decrementarCantidad,
        vaciarCarrito,
        itemsEnCarrito,
        cobroTotal,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};