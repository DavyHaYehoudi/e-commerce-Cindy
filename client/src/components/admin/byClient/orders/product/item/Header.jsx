import React from "react";
import { getProductProperties } from "../../../../../../helpers/storeDataUtils";
import { useSelector } from "react-redux";
import { FaEllipsisVertical } from "react-icons/fa6";
import { IoEllipsisHorizontal } from "react-icons/io5";

const Header = ({
  toggleActions,
  interaction,
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
      <ul>
        <li
          className={
            isTagProductExisted && productState.exchange ? "product-tag" : ""
          }
        >
          {productState.exchange && `ECHANGE  (${productState.exchange})`}
        </li>
        <li
          className={
            isTagProductExisted && productState.refund ? "product-tag" : ""
          }
        >
          {productState.refund && `REMBOURSEMENT (${productState.refund})`}
        </li>
        <li
          className={
            isTagProductExisted && productState.credit ? "product-tag" : ""
          }
        >
          {productState.credit && `AVOIR (${productState.credit}) Nᴼ
`}
        </li>
      </ul>
      <span className="action-icon" onClick={toggleActions}>

        {" "}
        {interaction.isActionsOpen ? (
          <FaEllipsisVertical />
        ) : (
          <IoEllipsisHorizontal />
        )}
      </span>
    </div>
  );
};

export default Header;
