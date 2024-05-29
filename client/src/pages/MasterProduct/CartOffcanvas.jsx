import React, { useCallback, useEffect } from "react";
import { TfiClose } from "react-icons/tfi";
import CartItem from "../../pages/MasterProduct/CartItem";
import { Link } from "react-router-dom";
import { formatPrice } from "../../helpers/utils/prices";
import { useSelector } from "react-redux";

const CartOffcanvas = ({ show, handleClose }) => {
  const carts = useSelector((state) => state?.customer?.data?.client?.cart);
  const handleOutsideClick = useCallback(
    (e) => {
      if (
        !e.target.closest(".offcanvas") &&
        e.target.tagName.toLowerCase() !== "button"
      ) {
        handleClose();
      }
    },
    [handleClose]
  );
  useEffect(() => {
    window.addEventListener("click", handleOutsideClick);
    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [handleOutsideClick]);

  return (
    <div className={`offcanvas ${show ? "show" : ""}`}>
      <div className="offcanvas-heading">
        <h2>VOTRE PANIER</h2>
        <button onClick={handleClose} aria-label="Fermer la fenêtre">
          <TfiClose aria-hidden="true" />
        </button>
      </div>
      <div className="cart-offcanvas-content">
        {carts && carts.length > 0 ? (
          carts.map((cart) => <CartItem cart={cart} key={cart.productsId} />)
        ) : (
          <p className="empty-cart-message">VOTRE PANIER EST VIDE</p>
        )}
      </div>
      {carts && carts.length > 0 && (
        <div className="fixed-bottom-content">
          <p>
            TOTAL DES ARTICLES :{" "}
            <b>{formatPrice(250)} A CALCULER PAR LE BACK</b>
          </p>
          <div>
            <Link to="/cart">
              <button className="btn">REGLEMENT</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartOffcanvas;
