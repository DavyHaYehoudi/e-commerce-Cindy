import React from "react";
import { getProductProperties } from "../../../../../../helpers/storeDataUtils";
import { useSelector } from "react-redux";
import {
  formatPrice,
} from "../../../../../../helpers/prices";

const Totals = ({ productState, productId }) => {
  const productStore = useSelector((state) => state.product);
  const productPrice = getProductProperties(productId, productStore).pricing
    .currentPrice;
  const refundTotal = productState?.refund || 0;
  const creditTotal = productState?.credit?.amount || 0;
  const isOut = (refundTotal + creditTotal) > 0
  return (isOut &&
    <div className="outBloc">
      Sortie :
      <span className="pricing outPricing">
        {formatPrice(refundTotal * productPrice + creditTotal)}
      </span>{" "}
    </div>
  );
};

export default Totals;
