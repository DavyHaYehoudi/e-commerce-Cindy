import React from "react";
import { formatPrice } from "../../../../../helpers/utils/prices";
import { getOrderInfo } from "../../../../../selectors/order";
import { useSelector } from "react-redux";

const Details = ({ order, orderId }) => {
  const { outTotalAmount } = useSelector((state) =>
    getOrderInfo(state, orderId)
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
