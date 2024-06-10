import React from "react";
import { NavLink } from "react-router-dom";

const NavMenu = () => {
  return (
    <nav id="navMenu" role="navigation">
      <ul>
        <li>
          <NavLink
            to="menu-tab-collections"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Collections
          </NavLink>
        </li>
        <li>
          <NavLink
            to="products"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Produits
          </NavLink>
        </li>
        <li>
          <NavLink
            to="about"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            A propos
          </NavLink>
        </li>
        <li>
          <NavLink
            to="contact"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Contact
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavMenu;
