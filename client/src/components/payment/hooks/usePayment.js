import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import { Post } from "../../../services/httpMethods";
import { useState } from "react";
import { useSelector } from "react-redux";
import useUnauthorizedRedirect from "../../../services/errors/useUnauthorizedRedirect";

const usePayment = async () => {
  const handleUnauthorized = useUnauthorizedRedirect();
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const cartAmount = useSelector((state) => state?.product?.cartAmount);
  const handlePayment = async () => {
    try {
      setPaymentProcessing(true);

      if (!stripe || !elements) {
        return;
      }

      const cardElement = elements.getElement(CardElement);

      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

      if (error) {
        setError(error.message);
        setPaymentProcessing(false);
      } else {
        const response = await Post(
          "orders/create-payment-intent",
          { amount: cartAmount * 100 },
          null,
          handleUnauthorized
        );

        const { clientSecret } = await response;

        const { error: confirmError } = await stripe.confirmCardPayment(
          clientSecret,
          {
            payment_method: paymentMethod.id,
          }
        );

        if (confirmError) {
          setError(confirmError.message);
          toast.error("Une erreur est survenue lors du payment.");
          setPaymentProcessing(false);
        } else {
          setError(null);
          setPaymentProcessing(false);
          toast.success("Le payment a bien été réalisé.");
        }
      }
      // await Post("orders", formData, null, handleUnauthorized);
    } catch (error) {
      console.log("Erreur lors du paiement :", error);
    }
  };
  return { paymentProcessing, error, stripe, handlePayment };
};
export default usePayment;
