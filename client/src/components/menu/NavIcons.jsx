import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import { IoSearchOutline } from "react-icons/io5";
import { AiOutlineShopping } from "react-icons/ai";
import { NavLink } from "react-router-dom";

const NavIcons = ({ onClickHeart }) => {
  return (
    <nav id="navIcons">
      <ul>
        <li>
          <NavLink
            to="account/login"
            className={({ isActive }) => (isActive ? "active" : "")}
            aria-label="Icône pour accéder au compte client"
          >
            <AiOutlineUser className="navlink-icon" aria-hidden="true" />
          </NavLink>
        </li>
        <li>
          <button
            onClick={onClickHeart}
            aria-label="Icône pour accéder aux favoris"
          >
            <AiOutlineHeart className="navlink-icon" aria-hidden="true" />
          </button>
        </li>
        <li aria-label="Icône pour accéder à la barre de recherche">
          <IoSearchOutline className="navlink-icon" aria-hidden="true" />
        </li>
        <li id="iconCart">
          <NavLink
            to="cart"
            className={({ isActive }) => (isActive ? "active" : "")}
            aria-label="Icône pour accéder au panier"
          >
            <AiOutlineShopping className="navlink-icon" aria-hidden="true" />
          </NavLink>
          <span id="numberCart">1</span>
        </li>
      </ul>
    </nav>
  );
};

export default NavIcons;
