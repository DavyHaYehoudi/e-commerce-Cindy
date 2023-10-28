import React from "react";
import { NavLink } from "react-router-dom";

const NavMenu = ({ handleMenuEnter, handleMenuLeave }) => {
  return (
    <nav id="navMenu" role="navigation" aria-label="navigation principale">
      <ul>
        <li
          onMouseEnter={() => handleMenuEnter("display1")}
          aria-haspopup="true"
        >
          <NavLink
            to="menu-tab/forTheDay"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Pour un jour unique
          </NavLink>
        </li>
        <li
          onMouseEnter={() => handleMenuEnter("display2")}
          aria-haspopup="true"
        >
          <NavLink
            to="menu-tab/forEveryday"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Pour le quotidien
          </NavLink>
        </li>
        <li onMouseEnter={() => handleMenuLeave()}>
          <NavLink
            to="about"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            A propos
          </NavLink>
        </li>
        <li onMouseEnter={() => handleMenuLeave()}>
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
