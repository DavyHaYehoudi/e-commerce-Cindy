import React from "react";
import { TfiClose } from "react-icons/tfi";
import CartItem from "./CartItem";
import { Link } from "react-router-dom";
import { formatPrice } from "../../../helpers/utils/prices";
import useStoreInfo from "../../../shared/hooks/useStoreInfo";
import { useDispatch, useSelector } from "react-redux";
import { showCartAccess } from "../../../features/admin/productSlice";
import { BsFillTrash2Fill } from "react-icons/bs";
import { Patch } from "../../../services/httpMethods";
import useUnauthorizedRedirect from "../../../services/errors/useUnauthorizedRedirect";
import { clearCart } from "../../../features/accountClient/customerSlice";
import { clearCartVisitor } from "../../../features/visitUser/visitUserSlice";

const CartOffcanvas = () => {
  const { clientId, cartStore, cartTotalAmount } =
  useStoreInfo({
    productsId: "",
    material: "",
  });
  const isCartContent = cartStore.length>0
  const dispatch = useDispatch();
  const handleUnauthorized = useUnauthorizedRedirect();
  const handleClose = () => {
    dispatch(showCartAccess(false));
  };
  const show = useSelector((state) => state?.product?.cartAccess);
  const handleClearCart = async () => {
    if (clientId) {
      let cart = [];
      const formatData = { cart };
      try {
        await Patch(
          `clients/${clientId}`,
          formatData,
          null,
          handleUnauthorized
        );
        dispatch(clearCart());
      } catch (error) {
        console.log("Erreur dans handleClearCart CartOffcanvas :", error);
      }
    } else {
      dispatch(clearCartVisitor());
      localStorage.removeItem("cartProducts");
    }
  };

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
