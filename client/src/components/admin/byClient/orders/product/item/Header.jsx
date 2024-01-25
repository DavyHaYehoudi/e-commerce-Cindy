import React from "react";
import { getProductProperties } from "../../../../../../selectors/product";
import { FaEllipsisVertical } from "react-icons/fa6";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { formatDate } from "../../../../../../helpers/utils/formatDate";
import {
  formatPrice,
  sumPriceArticle,
} from "../../../../../../helpers/utils/prices";
import { getMaterialProperty } from "../../../../../../helpers/constants/materials";
import { getCreditsInfo } from "../../../../../../selectors/credit";
import { useSelector } from "react-redux";

const Header = ({
  interaction,
  material,
  quantity,
  productId,
  productsByOrder,
  isTagProductExisted,
  productsByOrderInfo,
  productStore,
  toggleActions,
}) => {
  const { amount, code, dateExpire } = useSelector((state) =>
    getCreditsInfo(state, { productId: productsByOrder.id })
  );
  const { reference, name, pricing, image } = getProductProperties(
    productId,
    productStore
  );
  const { exchange, refund, credit } = productsByOrderInfo ?? {};
  return (
    <>
      <p
        className="action-icon"
        onClick={toggleActions}
        data-testid="header-component"
      >
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
            {name} {getMaterialProperty(material)?.name}
          </p>
          <p className="pricing inPricing">
            {quantity} article
            {quantity > 1 ? "s" : ""} -{" "}
            {sumPriceArticle(quantity, pricing?.currentPrice)}
          </p>
          <p>Référence : {reference}</p>
        </div>
        <img src={`/photos/${image}`} alt={name} width="150px" />
        <ul>
          <li className={isTagProductExisted && exchange ? "product-tag" : ""}>
            {exchange && (
              <>
                <span>ECHANGE :</span>{" "}
                <span>
                  ({exchange} article{exchange > 1 ? "s" : ""}){" "}
                </span>
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
          <li className={isTagProductExisted && credit ? "product-tag" : ""}>
            {credit && (
              <ul>
                <li>
                  AVOIR :{" "}
                  <span className="pricing outPricing">
                    {" "}
                    {formatPrice(amount)}
                  </span>
                </li>
                <li> Nᴼ {code} </li>
                <li>Valable jusqu'au {formatDate(dateExpire)}</li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </>
  );
};

export default Header;
