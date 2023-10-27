import React, { useCallback, useEffect, useState } from "react";
import { TfiClose } from "react-icons/tfi";
import bo from "../../assets/bo.png";
import bar from "../../assets/bar.png";
import bra from "../../assets/bra.png";
import col from "../../assets/col.png";
import CartItem from "./CartItem";
import { Link } from "react-router-dom";

const CartOffcanvas = ({ show, handleClose }) => {
  const cartsMock = [bo, bar, bra, col, bo, bar, bra, col, bo, bra];
  // const cartsMockEmpty=[]
  const [carts]=useState(cartsMock)
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
          <TfiClose />
        </button>
      </div>
      <div className="cart-offcanvas-content">
        {carts.length>0 ? carts.map((cart, i) => (
          <CartItem cart={cart} key={i} />
        )):<p className="empty-cart-message" >VOTRE PANIER EST VIDE</p>}
      </div>
      {carts.length>0 &&
      
      <div className="fixed-bottom-content">
        <p>
          TOTAL DES ARTICLES : <b>€250</b>
        </p>
        <div>
          <Link to="/cart">
            <button className="btn" >REGLEMENT</button>
          </Link>
        </div>
      </div>
      }
    </div>
  );
};

export default CartOffcanvas;
