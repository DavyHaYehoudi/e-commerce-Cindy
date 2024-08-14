import React, { useEffect, useState } from "react";
import { PaymentElement } from "@stripe/react-stripe-js";
import usePaymentForm from "./hooks/usePaymentForm";
import MoonLoader from "react-spinners/MoonLoader";
import { formatPrice } from "../../helpers/utils/prices";
import useFormValidation from "./hooks/useFormValidation";
import { useSelector } from "react-redux";
import useAuthWrappers from "../../config/useAuthWrappers";
import { Get } from "../../services/httpMethods";
import useUnauthorizedRedirect from "../../services/errors/useUnauthorizedRedirect";

const PaymentFormCard = () => {
  const [cartAmount, setCartAmount] = useState(0);
  const advantages = useSelector((state) => state?.product?.advantages);
  const { clientId: getClientId } = useAuthWrappers();
  const clientId = getClientId();
  const handleUnauthorized = useUnauthorizedRedirect();

  useEffect(() => {
    const fetchTotalAmount = async () => {
      // Vérification des données avant de faire l'appel API
      if (!advantages || Object.keys(advantages).length === 0) {
        console.warn("Advantages non disponible");
        return;
      }

      const queryString = new URLSearchParams({
        clientId,
        advantages: JSON.stringify(advantages),
      }).toString();

      try {
        const { totalAmount } = await Get(
          `orders/order-amount?${queryString}`,
          null,
          handleUnauthorized
        );
        setCartAmount(totalAmount);
      } catch (error) {
        console.error("Erreur lors de la récupération du montant total :", error);
      }
    };

    if (clientId) {
      fetchTotalAmount();
    }
  }, [advantages, clientId, handleUnauthorized]);

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
              <p>
                Payer : {formatPrice(cartAmount)} <br />
                Livraison comprise{" "}
              </p>
            )}
          </div>
        </button>
        {message && <div id="payment-message">{message}</div>}
      </form>
    </div>
  );
};

export default PaymentFormCard;
