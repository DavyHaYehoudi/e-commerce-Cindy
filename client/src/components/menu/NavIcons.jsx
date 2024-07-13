import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import { AiOutlineShopping } from "react-icons/ai";
import { IoIosLogOut } from "react-icons/io";
import { NavLink } from "react-router-dom";
import useNavIcons from "./hooks/useNavIcons";
import useStoreInfo from "../../shared/hooks/useStoreInfo";
import { useDispatch } from "react-redux";
import { showWishlistAccess } from "../../features/admin/productSlice";

const NavIcons = ({ toggleModalMenuSmart }) => {
  const { token, role, imageUrl, logout } = useNavIcons();
  const { numberArticleInCart, numberArticleInWishlist } = useStoreInfo({
    productsId: "",
    material: "",
  });
  const dispatch = useDispatch();
  const handleOpenWishlistModal = () => {
    dispatch(showWishlistAccess(true));
  };
  return (
    <nav id="navIcons" role="navigation" aria-label="navigation secondaire">
      <ul>
        <li
          id="iconConnexion"
          className="info-tooltip"
          aria-label={!token ? "Se connecter" : "Se déconnecter"}
          onClick={toggleModalMenuSmart}
        >
          <NavLink
            to="account/login"
            onClick={!token ? null : logout}
            className={({ isActive }) => (isActive ? "active" : "")}
            aria-label={!token ? "Se connecter à mon compte" : "Se déconnecter"}
          >
            {!token ? (
              <>
                <AiOutlineUser className="navlink-icon" aria-hidden="true" />
                <span className="navlink-text"> Connection</span>
              </>
            ) : (
              <>
                <IoIosLogOut className="navlink-icon" aria-hidden="true" />
                <span className="navlink-text"> Déconnection</span>
              </>
            )}
          </NavLink>
        </li>
        {role && (
          <li id="iconAccount" className="info-tooltip" aria-label="Mon compte">
            <NavLink
              to={role === "admin" ? "admin/dashboard" : "account"}
              aria-label="Mon compte"
              onClick={toggleModalMenuSmart}
            >
             {imageUrl&& <img src={imageUrl} alt="profil" />}
              <span className="navlink-text"> Compte</span>
            </NavLink>
          </li>
        )}
        <li id="iconHeart" className="info-tooltip" aria-label="Mes favoris">
          <button onClick={handleOpenWishlistModal} aria-label="Mes favoris">
            <AiOutlineHeart className="navlink-icon heart" aria-hidden="true" />
          </button>
          <span id="numberWishlist">{numberArticleInWishlist} </span>
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
