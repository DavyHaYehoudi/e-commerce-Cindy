import React from "react";
import { PaymentElement } from "@stripe/react-stripe-js";
import usePaymentForm from "./hooks/usePaymentForm";
import MoonLoader from "react-spinners/MoonLoader";

const PaymentFormCard = () => {
  const {
    handleSubmit,
    paymentElementOptions,
    isLoading,
    stripe,
    elements,
    message,
  } = usePaymentForm();

  return (
    <div className="form-card">
      <form id="payment-form" onSubmit={handleSubmit}>
        <PaymentElement id="payment-element" options={paymentElementOptions} />
        <button
          className="pay_button"
          disabled={isLoading || !stripe || !elements}
          id="submit"
        >
          <div id="button-text">
            {isLoading ? (
                  <div className="loader">
                  <MoonLoader color="whitesmoke" />
                  <p>Veuillez patienter, paiement en cours...</p>
                </div>
            ) : (
              "Payer maintenant"
            )}
          </div>
        </button>
        {message && <div id="payment-message">{message}</div>}
      </form>
    </div>
  );
};

export default PaymentFormCard;
