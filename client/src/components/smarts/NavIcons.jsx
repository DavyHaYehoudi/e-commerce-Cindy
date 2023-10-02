import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import { IoSearchOutline } from "react-icons/io5";
import { AiOutlineShopping } from "react-icons/ai";
import { NavLink } from "react-router-dom";

const NavIcons = () => {
  return (
    <nav id="navIcons">
      <ul>
        <li>
          <NavLink to="login" activeClassName="active">
            <AiOutlineUser />
          </NavLink>
        </li>
        <li>
          <NavLink to="wishlist" activeClassName="active">
            <AiOutlineHeart />
          </NavLink>
        </li>
        <li>
          <IoSearchOutline />
        </li>
        <li id="iconCart">
          <NavLink to="cart" activeClassName="active">
            <AiOutlineShopping />
          </NavLink>
          <span id="numberCart">1</span>
        </li>
      </ul>
    </nav>
  );
};

export default NavIcons;
