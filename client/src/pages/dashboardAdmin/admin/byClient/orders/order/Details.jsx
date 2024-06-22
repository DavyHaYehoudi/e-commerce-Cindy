import React from "react";
import { formatPrice } from "../../../../../../helpers/utils/prices";
import { getOrderInfo } from "../../../../../../selectors/order";
import { useSelector } from "react-redux";

const Details = ({ order, orderId }) => {
  const { outTotalAmount, amountPromoCode } =
    useSelector((state) => getOrderInfo(state, orderId)) || "";

  return (
    <>
      <p data-testid="in-total">
        <span className="dotted">Total de la commande</span> :
        <span className="pricing inPricing">
          {" "}
          {order.inTotalAmount ? formatPrice(order.inTotalAmount) : "Total NC"}
        </span>
        {amountPromoCode && `( code Promotion ${amountPromoCode}% inclus)`}
      </p>
      {outTotalAmount > 0 && (
        <p data-testid="out-total">
          <span className="dotted">Total des sorties</span> :{" "}
          <span className="pricing outPricing">
            {formatPrice(outTotalAmount)}{" "}
          </span>
        </p>
      )}
    </>
  );
};

export default Details;
