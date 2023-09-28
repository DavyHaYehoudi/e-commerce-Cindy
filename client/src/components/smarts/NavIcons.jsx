import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import { IoSearchOutline } from "react-icons/io5";
import { AiOutlineShopping } from "react-icons/ai";
import { Link } from "react-router-dom";

const NavIcons = () => {
  return (
    <nav id="navIcons">
      <ul>
        <li>
          <Link to="login">
            <AiOutlineUser />
          </Link>
        </li>
        <li>
          <Link to="wishlist">
            <AiOutlineHeart />
          </Link>
        </li>
        <li>
          <IoSearchOutline />
        </li>
        <li id="iconCart">
          <Link to="cart">
            <AiOutlineShopping />
          </Link>
          <span id="numberCart">1</span>
        </li>
      </ul>
    </nav>
  );
};

export default NavIcons;
