import { createPortal } from "react-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import Navbar from "../layout/Navbar";
import Box from "./Box";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faClose } from "@fortawesome/free-solid-svg-icons";

function DrawerMenu({ show, closeMenu, openCartModal }) {
  const { totalQuantity } = useContext(CartContext);

  const links = [
    { to: "/", label: "Inicio" },
    { to: "/upload", label: "Alta" },
    { to: "/contact-us", label: "Contacto" },
    { to: "/about-us", label: "Sobre Nosotros" },
  ];

  return show
    ? createPortal(
        <Box className="drawer__overlay" role="button" onClick={closeMenu}>
          <Box className="drawer__content" onClick={(e) => e.stopPropagation()}>
            {/* Botón cerrar */}
            <Box className="d-flex justify-end w-100">
              <Button className="drawer__close">
                <FontAwesomeIcon icon={faClose} onClick={closeMenu} size="xl" />
              </Button>
            </Box>

            {/* Menú de navegación*/}

            <Navbar links={links} variant="drawer" onClickLink={closeMenu} />

            <hr className="my-4" />

            {/* Carrito*/}
            <Box
              className="cart__container drawer__cart"
              onClick={() => {
                closeMenu();
                openCartModal();
              }}>
              <span className="cart__iconbox">
                <FontAwesomeIcon icon={faShoppingCart} className="cart__icon" />
                <span className="cart__badge">{totalQuantity}</span>
              </span>
            </Box>
          </Box>
        </Box>,
        document.body
      )
    : null;
}
export default DrawerMenu;
