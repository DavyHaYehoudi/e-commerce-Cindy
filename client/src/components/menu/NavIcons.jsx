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
          >
            <AiOutlineUser className="navlink-icon" />
          </NavLink>
        </li>
        <li>
          <button onClick={onClickHeart}>
            <AiOutlineHeart className="navlink-icon"/>
          </button>
        </li>
        <li>
          <IoSearchOutline className="navlink-icon"/>
        </li>
        <li id="iconCart">
          <NavLink
            to="cart"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <AiOutlineShopping className="navlink-icon"/>
          </NavLink>
          <span id="numberCart">1</span>
        </li>
      </ul>
    </nav>
  );
};

export default NavIcons;
