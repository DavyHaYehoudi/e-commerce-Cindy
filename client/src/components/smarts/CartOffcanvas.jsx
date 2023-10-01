import React, { useCallback, useEffect } from "react";
import { TfiClose } from "react-icons/tfi";
import bo from "../../assets/bo.png";
import bar from "../../assets/bar.png";
import bra from "../../assets/bra.png";
import col from "../../assets/col.png";
import CartItem from "../dumbs/CartItem";

const CartOffcanvas = ({ show, handleClose }) => {
  const carts = [bo, bar, bra, col, bo, bar, bra, col,bo,bra];
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
        <button onClick={handleClose}>
          <TfiClose />
        </button>
      </div>
      <div className="cart-offcanvas-content">
        {carts.map((cart, i) => (
          <CartItem cart={cart} key={i} />
        ))}
      </div>
      <div className="fixed-bottom-content">
        <p>TOTAL DES ARTICLES : <b>€250</b></p>
        <button >REGLEMENT</button>
      </div>
    </div>
  );
};

export default CartOffcanvas;
