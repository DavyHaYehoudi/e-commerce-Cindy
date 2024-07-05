import React from "react";
import PaymentForm from "../../components/payment/PaymentForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentFormCard from "../../components/payment/PaymentFormCard";
import usePaymentClientSecret from "./hooks/usePaymentClientSecret";
import { useSelector } from "react-redux";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const PaymentCheckout = () => {
  const cartAmount = useSelector((state) => state?.product?.cartAmount)||100;
  const clientSecret = usePaymentClientSecret(cartAmount);
  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };
  return (
    <section className="payment-page">
      <div className="block-1">
        <PaymentForm />
      </div>
      <div className="block-2">
        {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <PaymentFormCard cartAmount={cartAmount} />
          </Elements>
        )}
      </div>
    </section>
  );
};

export default PaymentCheckout;
