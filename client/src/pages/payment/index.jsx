import React from "react";
import PaymentForm from "../../components/payment/PaymentForm";
import Advantages from "../../components/payment/Advantages";
import InventoryAdvantages from "../../components/payment/InventoryAdvantages";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentFormCard from "../../components/payment/PaymentFormCard";
import usePaymentClientSecret from "./hooks/usePaymentClientSecret";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const PaymentCheckout = () => {
  const amount = 2200;
  const clientSecret = usePaymentClientSecret(amount);
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
        <div className="sub-block-1">
          <Advantages />
          <InventoryAdvantages />
        </div>
      </div>
      <div className="block-2">
        {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <PaymentFormCard />
          </Elements>
        )}
      </div>
    </section>
  );
};

export default PaymentCheckout;
