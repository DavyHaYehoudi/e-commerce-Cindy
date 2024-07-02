import React from "react";
import { formatPrice } from "../../helpers/utils/prices";
import usePayment from "../../components/payment/hooks/usePayment";
import { CardElement } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import PaymentForm from "../../components/payment/PaymentForm";
import useFormValidation from "../../components/payment/hooks/useFormValidation";
import Advantages from "../../components/payment/Advantages";
import InventoryAdvantages from "../../components/payment/InventoryAdvantages";
import MoonLoader from "react-spinners/MoonLoader";
// const cardElementStyles = {
//   style: {
//     base: {
//       color: '#32325d',
//       fontFamily: 'Arial, sans-serif',
//       fontSmoothing: 'antialiased',
//       fontSize: '16px',
//       '::placeholder': {
//         color: '#aab7c4',
//       },
//     },
//     invalid: {
//       color: '#fa755a',
//       iconColor: '#fa755a',
//     },
//     hidePostalCode: true
//   },
// };

const PaymentCheckout = () => {
  const cartAmount = useSelector((state) => state?.product?.cartAmount);
  const { paymentProcessing, handlePayment } = usePayment();
  const { validationErrors } = useFormValidation();
  const allowedBtnProcessPayment = Object.keys(validationErrors).length === 0;
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
        {paymentProcessing ? (
          <div className="processing loader">
            <p>Veuillez patienter, payment en cours…</p>
            <MoonLoader />
          </div>
        ) : (
          <>
            <div className="card-element-container">
              <CardElement
              //  options={{ hidePostalCode: true }}
              //  options={cardElementStyles}
              />
            </div>
            <div className="block-2-payment-btn">

            <button
              className="payment-button"
              type="button"
              onClick={handlePayment}
              disabled={!allowedBtnProcessPayment}
            >
              Payer : {formatPrice(cartAmount)}
            </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default PaymentCheckout;
