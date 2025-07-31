import React from "react";
import { NavLink } from "react-router-dom";

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
      </ul>
    </nav>
  );
}
