import React from "react";
import { useSelector } from "react-redux";
import { formatPrice } from "../../../../../../helpers/utils/prices";
import { getProductProperties } from "../../../../../../selectors/product";
import { getCreditsInfo } from "../../../../../../selectors/credit";

const Totals = ({ orderProductsInfo, productsId, orderProducts }) => {

  const productStore = useSelector((state) => state?.product?.data);
  const creditTotal =
  useSelector((state) => getCreditsInfo(state, { productsId: orderProducts._id }))
  .amount || 0;
  const productPrice = getProductProperties(productsId, productStore).pricing
    ?.currentPrice;
  const refundTotal = orderProductsInfo?.refund || 0;
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
