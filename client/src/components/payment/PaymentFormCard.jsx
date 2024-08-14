import React from "react";
import { PaymentElement } from "@stripe/react-stripe-js";
import usePaymentForm from "./hooks/usePaymentForm";
import MoonLoader from "react-spinners/MoonLoader";
import { formatPrice } from "../../helpers/utils/prices";
import useFormValidation from "./hooks/useFormValidation";
import useAmountCart from "../../pages/shoppingCart/hooks/useAmountCart";

const PaymentFormCard = () => {
  const { cartAmount } = useAmountCart();
  const {
    handleSubmit,
    paymentElementOptions,
    isLoading,
    stripe,
    elements,
    message,
  } = usePaymentForm();
  const { validationErrors } = useFormValidation();

  return (
    <div className="form-card">
      <form id="payment-form" onSubmit={handleSubmit}>
        <PaymentElement id="payment-element" options={paymentElementOptions} />
        <button
          className="pay_button"
          disabled={
            isLoading ||
            !stripe ||
            !elements ||
            Object.keys(validationErrors).length > 0
          }
          id="submit"
        >
          <div id="button-text">
            {isLoading ? (
              <div className="loader">
                <MoonLoader color="whitesmoke" />
                <p>Veuillez patienter, paiement en cours...</p>
              </div>
            ) : (
              <p>Payer : {formatPrice(cartAmount)} <br/>Livraison comprise </p>
            )}
          </div>
        </button>
        {message && <div id="payment-message">{message}</div>}
      </form>
    </div>
  );
};

export default PaymentFormCard;
