import React from "react";
import { getProductProperties } from "../../../../../helpers/storeDataUtils";
import { useSelector } from "react-redux";
import { FaEllipsisVertical } from "react-icons/fa6";
import { IoEllipsisHorizontal } from "react-icons/io5";

const ItemHeader = ({
  toggleActions,
  isActionsOpen,
  isTagProductExisted,
  productState,
  material,
  quantity,
  productId,
}) => {
  const productsState = useSelector((state) => state.products);
  const { reference, name, pricing, image } = getProductProperties(
    productId,
    productsState
  );
  return (
    <div className="product-content-details">
      <span>
        Référence : {reference} - {name} - {material} - {quantity} unité
        {quantity > 1 ? "s" : ""} - {pricing.currentPrice} {"€"}{" "}
      </span>
      <img src={image} alt={name} width="50px" />
      <span className={isTagProductExisted ? "product-tag" : ""}>
        <small>
          {productState.exchange && "ECHANGE"}
          {productState.refund && "REMBOURSEMENT"}
          {productState.generateCredit &&
            `AVOIR N ${productState.generateCredit}`}
        </small>
        <small>{productState.refund && "REMBOURSEMENT"}</small>
        <small>
          {productState.generateCredit &&
            `AVOIR N ${productState.generateCredit}`}
        </small>
      </span>
      <span className="action-icon" onClick={toggleActions}>
        {" "}
        {isActionsOpen ? <FaEllipsisVertical /> : <IoEllipsisHorizontal />}
      </span>
    </div>
  );
};

export default ItemHeader;
