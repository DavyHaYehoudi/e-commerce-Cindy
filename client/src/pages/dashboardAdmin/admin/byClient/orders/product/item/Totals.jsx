import React from "react";
import { useSelector } from "react-redux";
import { formatPrice } from "../../../../../../../helpers/utils/prices";
import { getCreditsInfo } from "../../../../../../../selectors/credit";

const Totals = ({ orderProductsInfo, orderProducts }) => {
  const creditTotal =
    useSelector((state) =>
      getCreditsInfo(state, { productsId: orderProducts._id })
    ).amount || 0;
  const { finalPrice } = orderProducts || "";
  const refundTotal = orderProductsInfo?.refund || 0;
  const isOut = refundTotal + creditTotal > 0;

  return (
    isOut && (
      <div className="outBloc">
        Sortie :
        <span className="pricing outPricing">
          {formatPrice(refundTotal * finalPrice + creditTotal)}
        </span>{" "}
      </div>
    )
  );
};

export default Totals;
