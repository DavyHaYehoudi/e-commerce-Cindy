import React from "react";
import { Link } from "react-router-dom";

const NavMenu = ({ handleMenuEnter, handleMenuLeave }) => {
  return (
    <nav id="navMenu">
      <ul>
        <li onMouseEnter={() => handleMenuEnter("display1")}>
          <Link to="pour-un-jour-unique">Pour un jour unique</Link>
        </li>
        <li onMouseEnter={() => handleMenuEnter("display2")}>
          <Link to="pour-le-quotidien">Pour le quotidien</Link>
        </li>
        <li onMouseEnter={() => handleMenuLeave()}>
          <Link to="a-propos">A propos</Link>
        </li>
        <li onMouseEnter={() => handleMenuLeave()}>
          <Link to="contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavMenu;
