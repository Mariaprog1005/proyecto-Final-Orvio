import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import BotonWhatsApp from "../BotonWhatsApp";

const Layout = () => {
  return (
    <div className="layout-mainWrapper">
      <Header />
      <main className="layout-content">
        <Outlet />
      </main>
      <Footer />
      <BotonWhatsApp />
    </div>
  );
};

export default Layout;