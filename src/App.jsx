import { Routes, Route } from "react-router-dom";
import Layout from "./components/layouts/Layout";
import Bienvenida from "./components/Bienvenida";
import ItemListContainer from "./components/products/ItemListContainer";
import ItemDetailContainer from "./components/products/ItemDetailContainer";
import Carrito from "./pages/Carrito";
import { CarritoProvider } from "./context/CarritoContext";
import PoliticaPrivacidad from "./pages/PoliticaPrivacidad";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import RutaProtegida from "./components/products/RutaProtegida";
import Panel from "./pages/Panel";
import SobreNosotros from './pages/SobreNosotros';


const App = () => {
  return (
    <CarritoProvider>
      <Routes>
        {/* Rutas públicas que usan el Layout general de la tienda */}
        <Route element={<Layout />}>
          <Route path="/" element={<Bienvenida />} />
          <Route path="/productos" element={<ItemListContainer />} />
          <Route path="/productos/:categoriaId" element={<ItemListContainer />} />
          <Route path="/:categoriaId" element={<ItemListContainer />} />
          <Route path="/producto/:id" element={<ItemDetailContainer />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/politica-de-privacidad" element={<PoliticaPrivacidad />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/sobre-nosotros" element={<SobreNosotros />} />
        </Route>

        {/* Ruta protegida del panel (independiente del Layout de clientes) */}
        <Route 
          path="/panel" 
          element={
            <RutaProtegida rolesPermitidos={['admin']}>
              <Panel />
            </RutaProtegida>
          } 
        />
      </Routes>
    </CarritoProvider>
  );
};

export default App;