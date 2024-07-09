import React, { useEffect, useState } from "react";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import useCreateOrder from "../../components/payment/hooks/useCreateOrder";

const Success = () => {
  const [orderNumber, setOrderNumber] = useState("");
  const { handleOrderConfirm } = useCreateOrder();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const orderNumberParams = urlParams.get("orderNumber");
    if (orderNumberParams) {
      setOrderNumber(orderNumberParams);
      handleOrderConfirm(orderNumberParams);
    }
    return;
  }, [handleOrderConfirm]);

  return (
    <div className="payment-success-page">
      <div className="success-page-container">
        <span>
          {" "}
          <IoShieldCheckmarkSharp size={100} />{" "}
        </span>
        <p>
          Payment bien effectué.
          <br />
          Suivez l'évolution de votre commande dans votre espace client.
          <br />
          Numéro de commande : {orderNumber}
        </p>
      </div>
    </div>
  );
};

export default Success;
