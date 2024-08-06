import React from "react";
import ShoppingCartContent from "../../components/shoppingCart/ShoppingCartContent";
import { BsFillTrash2Fill } from "react-icons/bs";
import useCartOffcanvas from "../MasterProduct/hooks/useCartOffcanvas";
import { useNavigate } from "react-router-dom";
import Advantages from "../../components/payment/Advantages";
import InventoryAdvantages from "../../components/payment/InventoryAdvantages";
import { useSelector } from "react-redux";
import { formatPrice } from "../../helpers/utils/prices";
import useAccessPayment from "./hooks/useAccessPayment";
import { ToastContainer } from "react-toastify";

const ShoppingCart = () => {
  const { isCartContent, handleClearCart } = useCartOffcanvas();
  const { clientId } = useAccessPayment();
  const cartAmount = useSelector((state) => state?.product?.cartAmount) || 0;
  const navigate = useNavigate();
  const handlePaymentProcess = () => {
    navigate("/cart/payment");
  };
  return (
    <div id="shoppingCart-page">
      <h1>MON PANIER</h1>
      <div className="shoppingCart-container">
        <section id="shoppingCart-items">
          <ShoppingCartContent />
        </section>
        {isCartContent && (
          <section className="advantages-section">
            <Advantages />
            <InventoryAdvantages />
          </section>
        )}
      </div>
      {isCartContent && clientId && (
        <>
          <button
            className="btn payment-button"
            type="button"
            onClick={handlePaymentProcess}
            disabled={cartAmount < 1}
          >
            Procéder au paiement de : {formatPrice(cartAmount)}
          </button>
          {cartAmount < 1 && (
            <p className="error-message" style={{ textAlign: "center" }}>
              Montant insuffisant
            </p>
          )}
        </>
      )}
      <ToastContainer autoClose={10000} />
    </div>
  );
};

export default ShoppingCart;
