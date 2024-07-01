import React from "react";
import { formatPrice } from "../../helpers/utils/prices";
import usePayment from "../../components/payment/hooks/usePayment";
import { CardElement } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import PaymentForm from "../../components/payment/PaymentForm";
import useFormValidation from "../../components/payment/hooks/useFormValidation";
import Advantages from "../../components/payment/Advantages";
import InventoryAdvantages from "../../components/payment/InventoryAdvantages";
import PaymentFormCard from "../../components/payment/PaymentFormCard";

const PaymentCheckout = () => {
  const cartAmount = useSelector((state) => state?.product?.cartAmount);
  const { paymentProcessing } = usePayment();
  const { handleSubmit, validationErrors } = useFormValidation();
  const allowedBtnProcessPayment = Object.keys(validationErrors).length === 0;
  return (
    <section className="payment-page">
      <div className="block-1">
        <PaymentForm cartAmount={cartAmount} />
        <div className="sub-block-1">
          <Advantages />
          <InventoryAdvantages />
        </div>
      </div>
      <div className="block-2">
        <PaymentFormCard />
        <CardElement options={{ hidePostalCode: true }} />
        {paymentProcessing ? (
          "Payment en cours …"
        ) : (
          <button
            className="payment-button"
            type="button"
            onClick={handleSubmit}
            disabled={!allowedBtnProcessPayment}
          >
            Payer : {formatPrice(cartAmount)}
          </button>
        )}
      </div>
    </section>
  );
};

export default PaymentCheckout;
