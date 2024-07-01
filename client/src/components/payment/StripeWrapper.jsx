import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
const stripePromise = loadStripe(
  "pk_test_51PWjfB2NPs6D7QFPnH6GXXB8xUMGLMYC7IYXmL7GYQ8dYTf8deyyMbOwmJOcxyMFZ349xmEZRcsaJuqEQ0AURPsx004Q2c9FBz"
);

const StripeWrapper = ({ children }) => {
  return <Elements stripe={stripePromise}>{children}</Elements>;
};

export default StripeWrapper;
