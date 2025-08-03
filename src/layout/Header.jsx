import { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import Box from "../components/Box";
import Text from "../components/Text";
import Button from "../components/Button";
import Container from "../components/Container";
import DrawerMenu from "../components/DrawerMenu";
import Navbar from "./Navbar";
import logo from "../assets/logo.png";
import { CartContext } from "../context/CartContext";

function Header({ openCartModal }) {
  const [openDrawer, setOpenDrawer] = useState(false);
  const { totalQuantity } = useContext(CartContext);

  const links = [
    { to: "/", label: "Inicio" },
    { to: "/upload", label: "Alta" },
    { to: "/contact-us", label: "Contacto" },
    { to: "/about-us", label: "Nosotros" },
  ];

  return (
    <>
      <Box as="header" className="header">
        <Box className="header__background">
          <Container className="header__container">
            <Box className="header__left">
              <NavLink to="/" className="header__brand">
                <img src={logo} alt="Logo Juguetería Cósmica" />
              </NavLink>
              <Box>
                <Text as="h1">Juguetería Cósmica</Text>
                <Text as="span">Descubrí tu universo de juegos</Text>
              </Box>
            </Box>

            <Box className="header__right">
              <Navbar links={links} />
              <Box className="cart__container header__cart" onClick={openCartModal}>
                <span className="cart__iconbox">
                  <FontAwesomeIcon icon={faShoppingCart} className="cart__icon" />
                  <span className="cart__badge">{totalQuantity}</span>
                </span>
              </Box>
              <Box className="header__actions mobile-only">
                <Button className="header__actions-btn" onClick={() => setOpenDrawer(true)}>
                  <FontAwesomeIcon icon={faBars} />
                </Button>
              </Box>
            </Box>
          </Container>
        </Box>
      </Box>

      <DrawerMenu show={openDrawer} closeMenu={() => setOpenDrawer(false)} openCartModal={openCartModal}>
        <Navbar links={links} variant="drawer" onClickLink={() => setOpenDrawer(false)} />
      </DrawerMenu>
    </>
  );
}

export default Header;
