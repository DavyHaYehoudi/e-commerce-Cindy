import React from "react";
import { getProductProperties } from "../../../../../../helpers/storeDataUtils";
import { FaEllipsisVertical } from "react-icons/fa6";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { formatDate } from "../../../../../../helpers/formatDate";
import {
  formatPrice,
  sumPriceArticle,
} from "../../../../../../helpers/prices";

const Header = ({
  interaction,
  material,
  quantity,
  productId,
  isTagProductExisted,
  productState,
  productStore,
  toggleActions,
}) => {
  const { reference, name, pricing, image } = getProductProperties(
    productId,
    productStore
  );
  const { exchange, refund, credit } = productState ??{} ;
  return (
    <>
     <p className="action-icon" onClick={toggleActions}>
        {" "}
        {interaction.isActionsOpen ? (
          <FaEllipsisVertical />
        ) : (
          <IoEllipsisHorizontal />
        )}
      </p>
    <div className="product-content-details">
      <div>
        <p>
          {name} {material}
        </p>
        <p className="pricing inPricing">
          {quantity} article
          {quantity > 1 ? "s" : ""} -{" "}
          {sumPriceArticle(quantity, pricing.currentPrice)}
        </p>
        <p>Référence : {reference}</p>
      </div>
      <img src={image} alt={name} width="150px" />
      <ul>
        <li className={isTagProductExisted && exchange ? "product-tag" : ""}>
          {exchange && (
            <>
            <span>ECHANGE :</span>{" "}
            <span>({exchange} article{exchange > 1 ? "s" : ""}) </span>
            </>
          )}
        </li>
        <li className={isTagProductExisted && refund ? "product-tag" : ""}>
          {refund && (
            <>
              <span>REMBOURSEMENT :</span>{" "}
              <span className="pricing outPricing">
                {sumPriceArticle(parseInt(refund), pricing.currentPrice)}
              </span>
            </>
          )}
        </li>
        <li
          className={isTagProductExisted && credit?.amount ? "product-tag" : ""}
        >
          {credit?.amount && (
            <ul>
              <li>
                AVOIR :{" "}
                <span className="pricing outPricing">
                {" "}  {formatPrice(credit?.amount)}
                </span>
              </li>
              <li> Nᴼ {credit?.code} </li>
              <li>Valable jusqu'au {formatDate(credit?.dateExpire)}</li>
            </ul>
          )}
        </li>
      </ul>
     
    </div>
    </>
  );
};

export default Header;
