import React from "react";
import { NavLink } from "react-router-dom";
import Cart from "../components/Cart";

export default function Navbar({ links = [], onClickLink, variant = "default" }) {
  return (
    <nav className={`navbar navbar--${variant}`}>
      <ul className="navbar__navigation">
        {links.map((link) => (
          <li key={link.to} className="navbar__item">
            <NavLink
              to={link.to}
              className={({ isActive }) => `navbar__link ${isActive ? "active" : ""}`}
              onClick={onClickLink}>
              {link.label}
            </NavLink>
          </li>
        ))}

        {/* Ícono del carrito */}
        <li className="navbar__item navbar__item--cart">
          <Cart />
        </li>
      </ul>
    </nav>
  );
}
