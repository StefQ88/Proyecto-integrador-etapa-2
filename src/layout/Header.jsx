import { NavLink } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import logo from "../assets/logo.png";
import Box from "../components/Box";
import Container from "../components/Container";
import Text from "../components/Text";
import Button from "../components/Button";

function Header() {
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [isMobileMenuVisible, setMobileMenuVisible] = useState(false);

  return (
    <>
      <Box as="header" className="header">
        <Container className="header__container">
          {/* Izquierda- Logo + texto */}
          <Box className="header__logo">
            <NavLink to="/" className="header__logo-link">
              <img src={logo} alt="Logo Juguetería Cósmica" />
            </NavLink>
            <Box>
              <Text as="h1">Juguetería Cósmica</Text>
              <Text as="span">Descubrí tu universo de juegos</Text>
            </Box>
          </Box>

          {/* Navegación */}
          <Box>
            <Box as="nav" className="header__navbar">
              <ul>
                <li>
                  <NavLink to="/">Inicio</NavLink>
                </li>
                <li>
                  <NavLink to="/upload">Alta de productos</NavLink>
                </li>
                <li>
                  <NavLink to="/contact-us">Contáctanos</NavLink>
                </li>
                <li>
                  <NavLink to="/about-us">Sobre Nosotros</NavLink>
                </li>
              </ul>
            </Box>

            {/* Íconos */}
            <Box className="header__actions">
              <Button className="header__icon" onClick={() => setSearchVisible((p) => !p)}>
                <FontAwesomeIcon icon={faBars} />
              </Button>
              <Button className="header__icon" onClick={() => setMobileMenuVisible((prev) => !prev)}>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </Button>
            </Box>

            {/* Buscador */}
            {isSearchVisible && (
              <Box as="aside" className="menu">
                <Text as="h2" className="menu__title">
                  Menú
                </Text>
                <Box as="nav" className="menu__navigation">
                  <ul></ul>
                </Box>
              </Box>
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default Header;
