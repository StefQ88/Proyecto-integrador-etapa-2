import { useState } from "react";
import Box from "../components/Box";
import Header from "./Header";
import Footer from "./Footer";
import Cart from "../components/Cart";
import { Outlet } from "react-router-dom";

export default function Layout() {
  const [showCartModal, setShowCartModal] = useState(false);

  return (
    <Box className="site-wrapper">
      <Header openCartModal={() => setShowCartModal(true)} />
      <Cart showModal={showCartModal} setShowModal={setShowCartModal} />
      <Box as="main" className="main">
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
}
