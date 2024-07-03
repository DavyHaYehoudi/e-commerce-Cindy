import React, { useEffect, useState } from "react";
import PaymentForm from "../../components/payment/PaymentForm";
import Advantages from "../../components/payment/Advantages";
import InventoryAdvantages from "../../components/payment/InventoryAdvantages";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import useUnauthorizedRedirect from "../../services/errors/useUnauthorizedRedirect";
import { Post } from "../../services/httpMethods";
import PaymentFormCard from "../../components/payment/PaymentFormCard";

const stripePromise = loadStripe(
  process.env.REACT_APP_STRIPE_PUBLIC_KEY
);
// const stripePromise = loadStripe(
//   "pk_test_51PWjfB2NPs6D7QFPnH6GXXB8xUMGLMYC7IYXmL7GYQ8dYTf8deyyMbOwmJOcxyMFZ349xmEZRcsaJuqEQ0AURPsx004Q2c9FBz"
// );

const PaymentCheckout = () => {
  const [clientSecret, setClientSecret] = useState("");
  const handleUnauthorized = useUnauthorizedRedirect();

  useEffect(() => {
    const getClientSecret = async () => {
      const response = await Post(
        "orders/create-payment-intent",
        { amount: 987 },
        null,
        handleUnauthorized
      );
      setClientSecret(response?.clientSecret);
    };
    getClientSecret();
  }, [handleUnauthorized]);
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
