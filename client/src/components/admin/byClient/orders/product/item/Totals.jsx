import React from "react";
import { useSelector } from "react-redux";
import { formatPrice } from "../../../../../../helpers/prices";
import { getProductProperties } from "../../../../../../selectors/product";
import { getCreditsInfo } from "../../../../../../selectors/credits";

const Totals = ({ productsInfo, productId, products }) => {
  const productStore = useSelector((state) => state.product);
  const creditsStore = useSelector((state) => state.credits);
  const productPrice = getProductProperties(productId, productStore).pricing
    .currentPrice;
  const creditTotal = getCreditsInfo(creditsStore, products.id).amount || 0;
  const refundTotal = productsInfo?.refund || 0;
  const isOut = refundTotal + creditTotal > 0;
  return (
    isOut && (
      <div className="outBloc">
        Sortie :
        <span className="pricing outPricing">
          {formatPrice(refundTotal * productPrice + creditTotal)}
        </span>{" "}
      </div>
    )
  );
};

export default Totals;
