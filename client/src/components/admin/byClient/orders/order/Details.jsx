import React from "react";
import { formatPrice } from "../../../../../helpers/prices";
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
      {outTotalAmount &&  outTotalAmount > 0 ?(
        <p>
          Total des sorties :{" "}
          <span className="pricing outPricing">
            {formatPrice(outTotalAmount)}{" "}
          </span>
        </p>
      ):""}
    </>
  );
};

export default Details;
