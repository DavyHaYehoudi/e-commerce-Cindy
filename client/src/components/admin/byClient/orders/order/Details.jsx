import React from "react";
import { formatPrice } from "../../../../../helpers/prices";
import { getOrderInfo } from "../../../../../helpers/storeDataUtils";

const Details = ({ order, clientId, orderId, productsActionsStore }) => {
  const { outTotalAmount } = getOrderInfo(
    productsActionsStore,
    clientId,
    orderId
  );
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
