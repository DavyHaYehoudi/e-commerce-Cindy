import React from "react";
import { CgProfile } from "react-icons/cg";
import { AiOutlineHeart } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { RiShoppingBasketLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const NavIcons = () => {
  return (
    <nav className="navIcons">
      <ul>
        <li>
          <Link to="login">
            <CgProfile />
          </Link>
        </li>
        <li>
          <Link to="wishlist">
            <AiOutlineHeart />
          </Link>
        </li>
        <li>
          <BiSearch />
        </li>
        <li>
          <Link to="cart">
            <RiShoppingBasketLine />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavIcons;
