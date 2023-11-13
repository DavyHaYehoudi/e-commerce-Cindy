import React from "react";

const Details = ({ order }) => {
  return (
    <>
      <p>Total de la commande : {order.totalAmount}</p>
      <p>
        <small>
          {order.paymentMethod["cardType"]} se terminant par :{" "}
          {order.paymentMethod["last4Digits"]}{" "}
        </small>
      </p>
    </>
  );
};

export default Details;
