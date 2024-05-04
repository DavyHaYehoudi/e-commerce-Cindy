import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import { IoSearchOutline } from "react-icons/io5";
import { AiOutlineShopping } from "react-icons/ai";
import { IoIosLogOut } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetCustomerStore } from "../../features/accountClient/customerSlice";

const NavIcons = ({ onClickHeart }) => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const logout = () => {
    dispatch(resetCustomerStore());
    localStorage.clear();
  };

  return (
    <nav id="navIcons" role="navigation" aria-label="navigation secondaire">
      <ul>
        <li
          className="info-tooltip"
          aria-label={!token ? "Se connecter" : "Se déconnecter"}
        >
          <NavLink
            to="account/login"
            onClick={!token ? null : logout}
            className={({ isActive }) => (isActive ? "active" : "")}
            aria-label={!token ? "Se connecter à mon compte" : "Se déconnecter"}
          >
            {!token ? (
              <AiOutlineUser className="navlink-icon" aria-hidden="true" />
            ) : (
              <IoIosLogOut className="navlink-icon" aria-hidden="true" />
            )}
          </NavLink>
        </li>
        <li className="info-tooltip" aria-label="Mes favoris">
          <button onClick={onClickHeart} aria-label="Mes favoris">
            <AiOutlineHeart className="navlink-icon heart" aria-hidden="true" />
          </button>
        </li>
        <li className="info-tooltip" aria-label="Recherche">
          <IoSearchOutline className="navlink-icon" aria-hidden="true" />
        </li>
        <li id="iconCart" className="info-tooltip" aria-label="Panier">
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
