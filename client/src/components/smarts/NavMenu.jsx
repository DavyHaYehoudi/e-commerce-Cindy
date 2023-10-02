import React from "react";
import {  NavLink } from "react-router-dom";

const NavMenu = ({ handleMenuEnter, handleMenuLeave }) => {
  return (
    <nav id="navMenu">
      <ul>
        <li onMouseEnter={() => handleMenuEnter("display1")}>
          <NavLink to="menu-tab/forTheDay" activeClassName="active">Pour un jour unique</NavLink>
        </li>
        <li onMouseEnter={() => handleMenuEnter("display2")}>
          <NavLink to="menu-tab/forEveryday" activeClassName="active">Pour le quotidien</NavLink>
        </li>
        <li onMouseEnter={() => handleMenuLeave()}>
          <NavLink to="about" activeClassName="active">A propos</NavLink>
        </li>
        <li onMouseEnter={() => handleMenuLeave()}>
          <NavLink to="contact" activeClassName="active">Contact</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavMenu;
