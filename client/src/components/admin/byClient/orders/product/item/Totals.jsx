import React from "react";
import { getProductProperties } from "../../../../../../helpers/storeDataUtils";
import { useSelector } from "react-redux";
import {
  formatPrice,
} from "../../../../../../helpers/prices";

const Totals = ({ productState, productId }) => {
  const productsState = useSelector((state) => state.products);
  const productPrice = getProductProperties(productId, productsState).pricing
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
