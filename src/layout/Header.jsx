import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import Box from "../components/Box";
import Text from "../components/Text";
import Button from "../components/Button";
import Container from "../components/Container";

import DrawerMenu from "../components/DrawerMenu";

import Navbar from "./Navbar";
import logo from "../assets/logo.png";

function Header() {
  const [openDrawer, setOpenDrawer] = useState(false);

  const links = [
    { to: "/", label: "Inicio" },
    { to: "/upload", label: "Alta" },
    { to: "/contact-us", label: "Contacto" },
    { to: "/about-us", label: "Sobre Nosotros" },
  ];

  return (
    <>
      {/* Header principal */}
      <Box as="header" className="header">
        <Box className="header__background">
          <Container className="header__container">
            {/* Logo + título */}

            <Box className="header__left">
              <NavLink to="/" className="header__brand">
                <img src={logo} alt="Logo Juguetería Cósmica" />
              </NavLink>
              <Box>
                <Text as="h1">Juguetería Cósmica</Text>
                <Text as="span">Descubrí tu universo de juegos</Text>
              </Box>
            </Box>

            <Navbar links={links} />

            {/* ícono menu */}
            <Box className="header__actions mobile-only">
              <Button className="header__actions-btn" onClick={() => setOpenDrawer(true)}>
                <FontAwesomeIcon icon={faBars} />
              </Button>
              {/* <Cart /> */}
            </Box>
          </Container>
        </Box>
      </Box>

      {/* Menú lateral Drawer (mobile) */}
      <DrawerMenu show={openDrawer} closeMenu={() => setOpenDrawer(false)}>
        <Navbar links={links} variant="drawer" onClickLink={() => setOpenDrawer(false)} />
      </DrawerMenu>
    </>
  );
}

export default Header;
