import React from "react";
import { useSelector } from "react-redux";
import {
  formatPrice,
} from "../../../../../../helpers/prices";
import { getProductProperties } from "../../../../../../helpers/selectors/product";

const Totals = ({ productsInfo, productId }) => {
  const productStore = useSelector((state) => state.product);
  const productPrice = getProductProperties(productId, productStore).pricing
    .currentPrice;
  const refundTotal = productsInfo?.refund || 0;
  const creditTotal = productsInfo?.credit?.amount || 0;
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
