import React from "react";
import { getProductProperties } from "../../../../../../helpers/storeDataUtils";
import { useSelector } from "react-redux";
import { FaEllipsisVertical } from "react-icons/fa6";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { formatDate } from "../../../../../../helpers/formatDate";

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
  const { exchange, refund, credit } = productState;
  return (
    <div className="product-content-details">
      <span>
        Référence : {reference} - {name} - {material} - {quantity} unité
        {quantity > 1 ? "s" : ""} - {pricing.currentPrice} {"€"}{" "}
      </span>
      <img src={image} alt={name} width="50px" />
      <ul>
        <li className={isTagProductExisted && exchange ? "product-tag" : ""}>
          {exchange && `ECHANGE  (${exchange})`}
        </li>
        <li className={isTagProductExisted && refund ? "product-tag" : ""}>
          {refund && `REMBOURSEMENT (${refund})`}
        </li>
        <li
          className={isTagProductExisted && credit.amount ? "product-tag" : ""}
        >
          {credit.amount && (
            <ul>
              <li>AVOIR ({credit.amount}) </li>
              <li> Nᴼ {credit.code} </li>
              <li>Valable jusqu'au {formatDate(credit.dateExpire)}</li>
            </ul>
          )}
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
