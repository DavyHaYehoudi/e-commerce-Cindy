import React from "react";

const Details = ({ order }) => {
  return (
    <>
      <p>Total de la commande : {order.totalAmount}</p>
      <p>
        {order.paymentMethod["cardType"]} se terminant par :{" "}
        {order.paymentMethod["last4Digits"]}{" "}
      </p>
    </>
  );
};

export default Details;
