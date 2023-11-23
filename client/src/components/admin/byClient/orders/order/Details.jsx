import React from "react";
import { formatPrice } from "../../../../../helpers/formatPrice";
import { getOrderInfo } from "../../../../../helpers/storeDataUtils";
import { useSelector } from "react-redux";

const Details = ({ order, clientId, orderId }) => {
  const state = useSelector((state) => state.productActions);
  const { outTotalAmount } = getOrderInfo(state, clientId, orderId);
  return (
    <>
      <p>
        Total de la commande :
        <span className="pricing inPricing">
          {" "}
          {formatPrice(order.inTotalAmount)}
        </span>
      </p>
      {outTotalAmount && (
        <p>
          Total des sorties :{" "}
          <span className="pricing outPricing">
            {formatPrice(outTotalAmount)}{" "}
          </span>
        </p>
      )}

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
