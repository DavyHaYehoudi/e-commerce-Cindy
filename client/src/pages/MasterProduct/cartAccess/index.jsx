import React from "react";
import { TfiClose } from "react-icons/tfi";
import { BsFillTrash2Fill } from "react-icons/bs";
import { Link } from "react-router-dom";
import CartItem from "../../../shared/CartItem";
import { formatPrice } from "../../../helpers/utils/prices";
import useCartOffcanvas from "../hooks/useCartOffcanvas";

const CartOffcanvas = () => {
  const {
    show,
    cartStore,
    cartTotalAmount,
    isCartContent,
    handleClose,
    handleClearCart,
  } = useCartOffcanvas();

  return (
    <div className={`offcanvas ${show ? "show" : ""}`}>
      <div className="offcanvas-heading">
        <h2>MON PANIER</h2>
        {isCartContent && (
          <div
            className="cart-clear info-tooltip"
            aria-label="Vider le panier"
            onClick={handleClearCart}
          >
            <BsFillTrash2Fill className="cart-clear-trash" />
          </div>
        )}
        <button onClick={handleClose} aria-label="Fermer la fenêtre">
          <TfiClose aria-hidden="true" />
        </button>
      </div>
      <div className="cart-offcanvas-content">
        {cartStore && cartStore.length > 0 ? (
          cartStore.map((product, i) => (
            <CartItem product={product} key={product?.productsId + i} />
          ))
        ) : (
          <p className="empty-cart-message">Le panier est vide</p>
        )}
      </div>
      {cartStore && cartStore.length > 0 && (
        <div className="fixed-bottom-content">
          <p>
            TOTAL DES ARTICLES : <b>{formatPrice(cartTotalAmount)}</b>
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
