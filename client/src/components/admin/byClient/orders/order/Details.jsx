import React from "react";
import { formatPrice } from "../../../../../helpers/prices";
import { getOrderInfo } from "../../../../../helpers/selectors/order";

const Details = ({ order, orderId, ordersStore }) => {
  const { outTotalAmount } = getOrderInfo(ordersStore, orderId);
  return (
    <>
      <p>
        Total de la commande :
        <span className="pricing inPricing">
          {" "}
          {order.inTotalAmount ? formatPrice(order.inTotalAmount) : "Total NC"}
        </span>
      </p>
      {outTotalAmount && outTotalAmount > 0 ? (
        <p>
          Total des sorties :{" "}
          <span className="pricing outPricing">
            {formatPrice(outTotalAmount)}{" "}
          </span>
        </p>
      ) : (
        ""
      )}
    </>
  );
};

export default Details;
