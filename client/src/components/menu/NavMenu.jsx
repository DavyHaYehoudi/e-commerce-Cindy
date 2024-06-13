import React from "react";
import { NavLink } from "react-router-dom";
import { MdCollections } from "react-icons/md";
import { IoMdPricetag } from "react-icons/io";
import { IoMail } from "react-icons/io5";
import { FaBook } from "react-icons/fa";
import { PiFoldersFill } from "react-icons/pi";

const NavMenu = () => {
  return (
    <nav id="navMenu" role="navigation">
      <ul>
        <li>
          <NavLink
            to="menu-tab-collections"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <span className="icon">
              {" "}
              <MdCollections />
            </span>
            <span className="navlink-text"> Collections</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="menu-tab-categories"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <span className="icon">
              {" "}
              <PiFoldersFill />
            </span>
            <span className="navlink-text"> Catégories</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="products"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <span className="icon">
              <IoMdPricetag />
            </span>
            <span className="navlink-text">Produits</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="about"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <span className="icon">
              <FaBook />
            </span>
            <span className="navlink-text">A propos</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="contact"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <span className="icon">
              <IoMail />
            </span>
            <span className="navlink-text">Contact</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavMenu;
