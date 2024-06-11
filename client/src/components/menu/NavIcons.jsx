import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import { AiOutlineShopping } from "react-icons/ai";
import { IoIosLogOut } from "react-icons/io";
import { NavLink } from "react-router-dom";
import useNavIcons from "./hooks/useNavIcons";
import useStoreInfo from "../../shared/hooks/useStoreInfo";


const NavIcons = ({ onClickHeart }) => {
  const { token, role, imageUrl, logout } = useNavIcons();
  const {numberArticleInCart,numberArticleInWihslist}=useStoreInfo({productsId:"",material:""})

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
        {role && (
          <li className="info-tooltip" aria-label="Mon compte">
            <NavLink
              to={role === "admin" ? "admin/dashboard" : "account"}
              aria-label="Mon compte"
            >
              <img src={imageUrl} alt="profil" />
            </NavLink>
          </li>
        )}
        <li className="info-tooltip" aria-label="Mes favoris">
          <button onClick={onClickHeart} aria-label="Mes favoris">
            <AiOutlineHeart className="navlink-icon heart" aria-hidden="true" />
          </button>
          <span id="numberWishlist">{numberArticleInWihslist} </span>
        </li>
        <li id="iconCart" className="info-tooltip" aria-label="Panier">
          <NavLink
            to="cart"
            className={({ isActive }) => (isActive ? "active" : "")}
            aria-label="Icône pour accéder au panier"
          >
            <AiOutlineShopping className="navlink-icon" aria-hidden="true" />
          </NavLink>
          <span id="numberCart">{numberArticleInCart} </span>
        </li>
      </ul>
    </nav>
  );
};

export default NavIcons;
